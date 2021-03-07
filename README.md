# MusicStreamingBot

## How to run docker
```
docker build -t music_streaming_bot .
docker-compose up
```

## Project Structure
├── docker-compose.yaml  
├── Dockerfile  
├── package.json  
├── package-lock.json  
├── README.md  
├── server.js  
└── src  
....├── app.js  
....├── **[config.json](#configjson)**  
....└── MusicStreamingBot  
........├── CompleteMusicRelayer  
........│...├── **CompleteMusicRelayer.js**(Control all platform transformer to process bot need info)  
........│...└── Transformer  
........│.......├── impl  
........│.......│...├── SpotifyTransFormerImpl.js  
........│.......│...├── StreetVoiceTransFormerImpl.js  
........│.......│...└── YoutubeTransFormerImpl.js  
........│.......└── **TransFormer.js**(Superclass:CompleteMusicRelayer will use this class)  
........└── **MusicStreamingBot.js**(Discord Bot command processor)  

## config.json
```
{
   "token": "your bot token",
   "webPort": " "
}
```
