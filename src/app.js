const auth = require('./config.json');
const MusicStreamingBot = require('./MusicStreamingBot/MusicStreamingBot');

const musicStreamingBot = new MusicStreamingBot(auth.token);