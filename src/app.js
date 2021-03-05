const Discord = require('discord.js');
const auth = require('./auth.json');
const logger = require('winston');


const PORT = 7777;


const client = new Discord.Client({ autoReconnect: true });

logger.level = 'debug';

logger.info('Connected');
logger.info(auth.token);
client.login(auth.token);
client.on('ready', function(evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(client.user.username + ' - (' + client.user.id + ')');
});

client.on('message', (message) => {
    let userName = (message.member.nickname == null) ? message.author.username : message.member.nickname;
    logger.info(`${userName}在${message.channel}說${message.content}`);
});
