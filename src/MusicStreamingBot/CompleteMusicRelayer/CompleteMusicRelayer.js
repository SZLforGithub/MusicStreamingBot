const StreetVoiceTransFormerImpl = require('./Transformer/impl/StreetVoiceTransFormerImpl.js').StreetVoiceTransFormerImpl;
const YoutubeTransFormerImpl = require('./Transformer/impl/YoutubeTransFormerImpl.js').YoutubeTransFormerImpl;
const SpotifyTransFormerImpl = require('./Transformer/impl/SpotifyTransFormerImpl.js').SpotifyTransFormerImpl;

class RelayInfo {
    constructor() {
        this.info = {};
        this.keyword = '';
        this.outputMessage = '';
    }
}

class CompleteMusicRelayer {
    constructor() {
        this.transFormerList = [];
        this.transFormerList.push(new StreetVoiceTransFormerImpl());
        this.transFormerList.push(new YoutubeTransFormerImpl());
        this.transFormerList.push(new SpotifyTransFormerImpl());
    }

    keywordToUrl(keyword) {
        let relayInfo = new RelayInfo();
        relayInfo.keyword = keyword;
        relayInfo.outputMessage = keyword;

        relayInfo = this.fillUrlInfo(relayInfo, null);

        return relayInfo;
    }

    processUrl(url) {
        let relayInfo = new RelayInfo();
        this.transFormerList.forEach(transFormer => {
            if (transFormer.canHandleUrl(url)) {
                relayInfo.keyword = transFormer.urlToKeyword(url);
            }
        });

        relayInfo = this.fillUrlInfo(relayInfo, url);

        return relayInfo;
    }

    fillUrlInfo(relayInfo, url) {
        this.transFormerList.forEach(transFormer => {
            let streamUrl = '';
            if (url != null && transFormer.canHandleUrl(url)) {
                streamUrl = url;
            } else {
                streamUrl = transFormer.keywordToUrl(relayInfo.keyword);
            }

            let streamTitle = null;
            if (null == streamUrl || streamUrl.match(/^http/) == null) {
                streamTitle = '';
                streamUrl = '';
            } else {
                streamTitle = transFormer.urlToKeyword(streamUrl);
            }

            relayInfo.outputMessage += '\n' + streamUrl;
            relayInfo.info[transFormer.label] = {
                'url': streamUrl,
                'title': streamTitle
            };
        });

        return relayInfo;
    }
}

module.exports = CompleteMusicRelayer;
