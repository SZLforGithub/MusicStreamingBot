const Discord = require('discord.js');
const express = require('express');
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
          channel.send(this.completeMusicRelayer.processUrl(cmd[1]).outputMessage);
        }
        else if (cmd[0] == 'keyword') {
          channel.send(this.completeMusicRelayer.keywordToUrl(message.content.substring('%%keyword'.length)));
        } else if (cmd[0] == 'editInfo') {
          if (message.reference != null) {
            this.editMessage(message.reference.channelID, message.reference.messageID, message.content.substring('%%editInfo'.length));
          } else {
            let matchStr = message.content.match(/%%editInfo (.+?) (.+?) ([[\u0000-\uFFFF]+)/); // $1:channelId, $2:messageId, $3:newMessage
            logger.info(message.referenceMessage);
            logger.info(message);
            if (null == matchStr || matchStr.length != 4) {
              channel.send('please key:%%editInfo channelId messageId newMessage\nor please reply the message with key:%%editInfo newMessage')
                .then(msg => setTimeout(() => {
                  msg.delete();
                }, 3000));
            } else {
              if (matchStr[1].toLowerCase() == 'here') {
                matchStr[1] = message.channel.id;
              }
              this.editMessage(matchStr[1], matchStr[2], matchStr[3]);
            }
          }
        }
        setTimeout(() => {
          message.delete()
            .then(msg => console.log(`Deleted message from ${msg.author.username}`))
            .catch(console.error);
        }, 3000);
      }
    });

    this.client = client;
  }

  editMessage(channelId, messageId, newMessage) {
    logger.info(`edit message(${messageId}) at channel(${channelId}) to:${newMessage}`)
    this.client.channels
      .fetch(channelId)
      .then(channel => {
        channel.messages.fetch({ around: messageId, limit: 1 })
          .then(msg => {
            const fetchedMsg = msg.first();
            fetchedMsg.edit(newMessage);
          });
      })
  }
}

module.exports = MusicStreamingBot;