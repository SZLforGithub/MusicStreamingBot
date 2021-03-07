const Discord = require('discord.js');
const logger = require('winston');
const CompleteMusicRelayer = require('./CompleteMusicRelayer/CompleteMusicRelayer.js');

class MusicStreamingBot {
  constructor(token) {
    logger.level = 'debug';
    let client = new Discord.Client({ autoReconnect: true });
    client.login(token);
    logger.info('Connected');
    client.on('ready', function () {
      logger.info('Connected');
      logger.info('Logged in as: ');
      logger.info(client.user.username + ' - (' + client.user.id + ')');
    });

    this.completeMusicRelayer = new CompleteMusicRelayer();

    client.on('message', (message) => {
      let user = message.member;
      let channel = message.channel;
      let userName = (user.nickname == null) ? message.author.username : user.nickname;
      logger.info(`${userName}在${channel.id}說${message.content}`);
      if (message.content.substring(0, 2) == '%%') {
        let cmd = message.content.substring(2).split(' '); //%%之後的文字以空白分開
        if (cmd[0] == 'url') {
          channel.send('```JSON\n' + JSON.stringify(this.completeMusicRelayer.processUrl(cmd[1]), null, '  ') + '\n```');
        }
        else if (cmd[0] == 'keyword') {
          channel.send('```JSON\n' + JSON.stringify(this.completeMusicRelayer.keywordToUrl(message.content.substring('%%keyword'.length)), null, '  ') + '\n```');
        }
      }
      this.client = client;
    });
  }
}

module.exports = MusicStreamingBot;