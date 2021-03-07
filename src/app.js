const Discord = require('discord.js');
const auth = require('./config.json');
const logger = require('winston');
const CompleteMusicRelayer = require('./MusicStreamingBot/CompleteMusicRelayer/CompleteMusicRelayer.js');

const client = new Discord.Client({ autoReconnect: true });

logger.level = 'debug';

logger.info('Connected');
logger.info(auth.token);
client.login(auth.token);
client.on('ready', function () {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(client.user.username + ' - (' + client.user.id + ')');
});

let completeMusicRelayer = new CompleteMusicRelayer();

client.on('message', (message) => {
    let user = message.member;
    let channel = message.channel;
    let userName = (user.nickname == null) ? message.author.username : user.nickname;
    logger.info(`${userName}在${channel.id}說${message.content}`);
    if (message.content.substring(0, 2) == '%%') {
        let cmd = message.content.substring(2).split(' '); //%%之後的文字以空白分開
        if (cmd[0] == 'url') {
            channel.send(completeMusicRelayer.processUrl(cmd[1]));
        }
        else if (cmd[0] == 'keyword') {
            let transformer = new CompleteMusicRelayer();
            channel.send(transformer.keywordToUrl(message.content.substring('%%keyword'.length)));
        }
    }
});
