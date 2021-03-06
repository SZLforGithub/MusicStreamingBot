-- 建立DB
CREATE DATABASE dc;
-- 主要表
CREATE TABLE TB_SONG_MSG_INFO (
    CHANNEL_ID INTEGER
  , MESSAGE_ID INTEGER
  , KEY_WORD VARCHAR(200)
  , URL_INFO JSONB
);

COMMENT ON TABLE TB_SONG_MSG_INFO IS '歌曲訊息資訊';
COMMENT ON COLUMN TB_SONG_MSG_INFO.CHANNEL_ID IS 'Discord 頻道ID';
COMMENT ON COLUMN TB_SONG_MSG_INFO.MESSAGE_ID IS 'Discord 訊息ID';
COMMENT ON COLUMN TB_SONG_MSG_INFO.KEY_WORD  IS '歌曲關鍵字';
COMMENT ON COLUMN TB_SONG_MSG_INFO.URL_INFO IS '網址資訊(JSON)';