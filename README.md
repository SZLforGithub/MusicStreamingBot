# MusicStreamingBot

## Start / Stop docker
```
./builds/run-tasks.sh run # start
./builds/run-tasks.sh down # stop
```

## Project Structure

📦 builds  
 ┣ 📂 docker  
 ┃ ┣ 📜 **Dockerfile**(Build docker image)  
 ┃ ┗ 📜 **docker-compose.yaml**(Run docker containers) 
 ┣ 📂 tasks  
 ┃ ┣ 📂 down  
 ┃ ┃ ┗ 📜 docker-down.sh  
 ┃ ┗ 📂 run  
 ┃ ┃ ┗ 📜 docker_up.sh  
 ┣ 📂 tools  
 ┃ ┗ 📜 get_config.sh  
 ┗ 📜 **run-tasks.sh**(Builds script entry point)  
📦 database  
 ┣ 📂 conf  
 ┃ ┣ 📂 initdb.d  
 ┃ ┃ ┗ 📜 init.sql  
 ┃ ┗ 📂 postgres.conf  
 ┗ 📂 data  
 📦 src  
 ┣ 📂 MusicStreamingBot  
 ┃ ┣ 📂 CompleteMusicRelayer  
 ┃ ┃ ┣ 📂 Transformer  
 ┃ ┃ ┃ ┣ 📂 impl  
 ┃ ┃ ┃ ┃ ┣ 📜 SpotifyTransFormerImpl.js  
 ┃ ┃ ┃ ┃ ┣ 📜 StreetVoiceTransFormerImpl.js  
 ┃ ┃ ┃ ┃ ┗ 📜 YoutubeTransFormerImpl.js  
 ┃ ┃ ┃ ┗ 📜 **TransFormer.js**(Superclass:CompleteMusicRelayer will use this class)  
 ┃ ┃ ┗ 📜 **CompleteMusicRelayer.js**(Control all platform transformer to process bot need info)  
 ┃ ┗ 📜 **MusicStreamingBot.js**(Discord Bot command processor)  
 ┣ 📜 app.js  
 ┗ 📜 **[config.json](#configjson)**  

## config.json
```
{
   "token": "your bot token",
   "webPort": " "
}
```
