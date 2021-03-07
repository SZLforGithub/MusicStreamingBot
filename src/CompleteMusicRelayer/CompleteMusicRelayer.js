const StreetVoiceTransFormerImpl = require('../Transformer/impl/StreetVoiceTransFormerImpl.js').StreetVoiceTransFormerImpl;
const YoutubeTransFormerImpl = require('../Transformer/impl/YoutubeTransFormerImpl.js').YoutubeTransFormerImpl;

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
    }

    processUrl(url) {
        let relayInfo = new RelayInfo();
        this.transFormerList.forEach(transFormer => {
            if (transFormer.canHandleUrl(url)) {
                relayInfo.keyword = transFormer.urlToKeyword(url);
            }
        });

        relayInfo.outputMessage = relayInfo.keyword;
        this.transFormerList.forEach(transFormer => {
            let streamUrl = '';
            if (transFormer.canHandleUrl(url)) {
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
                'url': streamUrl
                , 'title': streamTitle
            };
        });

        return '```\n' + JSON.stringify(relayInfo) + '\n```';
    }
}

module.exports = CompleteMusicRelayer;
