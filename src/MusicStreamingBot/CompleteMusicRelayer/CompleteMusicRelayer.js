const StreetVoiceTransFormerImpl = require('./Transformer/impl/StreetVoiceTransFormerImpl.js').StreetVoiceTransFormerImpl;
const YoutubeTransFormerImpl = require('./Transformer/impl/YoutubeTransFormerImpl.js').YoutubeTransFormerImpl;
const SpotifyTransFormerImpl = require('./Transformer/impl/SpotifyTransFormerImpl.js').SpotifyTransFormerImpl;

class RelayInfo {
    constructor() {
        this.info = {};
        this.keyword = '';
        this.outputMessage = '';
    }

    generateOutputMessage() {
        this.outputMessage = this.keyword
            + Object.values(this.info)
                .map(value => '\n' + value.url)
                .join('');
    }
}

class CompleteMusicRelayer {
    constructor() {
        this.transFormerList = [];
        this.transFormerList.push(new StreetVoiceTransFormerImpl());
        this.transFormerList.push(new YoutubeTransFormerImpl());
        this.transFormerList.push(new SpotifyTransFormerImpl());
    }

    async keywordToUrl(keyword) {
        let relayInfo = new RelayInfo();
        relayInfo.keyword = keyword;

        relayInfo = await this.fillUrlInfo(relayInfo, null);
        relayInfo.generateOutputMessage();

        return relayInfo;
    }

    async processUrl(url) {
        let relayInfo = new RelayInfo();
        this.transFormerList.forEach(transFormer => {
            if (transFormer.canHandleUrl(url)) {
                relayInfo.keyword = transFormer.urlToKeyword(url);
            }
        });

        relayInfo = await this.fillUrlInfo(relayInfo, null);
        relayInfo.generateOutputMessage();

        return relayInfo;
    }

    async fillUrlInfo(relayInfo, url) {
        let promiseList = this.transFormerList.map(transFormer => {
            const processMethod = new Promise((resolve, reject) => {
                setTimeout(() => {
                    let streamUrl = this.getStreamUrl(url, transFormer, relayInfo);
                    let streamTitle = null;

                    if (null == streamUrl || streamUrl.match(/^http/) == null) {
                        streamTitle = '';
                        streamUrl = '';
                    } else {
                        streamTitle = transFormer.urlToKeyword(streamUrl);
                    }

                    relayInfo.info[transFormer.label] = {
                        'url': streamUrl,
                        'title': streamTitle
                    };
                    resolve(relayInfo.info[transFormer.label]);
                });
            });

            return processMethod;
        });
        await Promise.all(promiseList);

        return relayInfo;
    }

    getStreamUrl(url, transFormer, relayInfo) {
        let streamUrl = '';
        if (url != null && transFormer.canHandleUrl(url)) {
            streamUrl = url;
        } else {
            streamUrl = transFormer.keywordToUrl(relayInfo.keyword);
        }
        return streamUrl;
    }
}

module.exports = CompleteMusicRelayer;
