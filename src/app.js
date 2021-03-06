const Discord = require('discord.js');
const auth = require('./auth.json');
const logger = require('winston');
const Transformer = require('../src/Transformer/TransFormer.js');

const client = new Discord.Client({ autoReconnect: true });

logger.level = 'debug';

logger.info('Connected');
logger.info(auth.token);
client.login(auth.token);
client.on('ready', function() {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(client.user.username + ' - (' + client.user.id + ')');
});

client.on('message', (message) => {
    let user = message.member;
    let channel = message.channel;
    let userName = (user.nickname == null) ? message.author.username : user.nickname;
    logger.info(`${userName}在${channel.id}說${message.content}`);
    if (message.content.substring(0, 2) == '%%') {
        let cmd = message.content.substring(2).split(' '); //%%之後的文字以空白分開
        if (cmd[0] == 'test') {
            let transformer = new Transformer();
            channel.send(transformer.getResonse('GET', cmd[1], null).match(/<title>(.+)<\/title>/)[1]);
        }
    }
});
