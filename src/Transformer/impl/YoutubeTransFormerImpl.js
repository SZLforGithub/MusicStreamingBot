const TransFormer = require('../TransFormer.js');

class YoutubeTransFormerImpl extends TransFormer {
    constructor() {
        super();
    }

    urlToKeyword(url) {
        return super.getResponse('GET', url, null)
            .match(/<title>(.+)<\/title>/)[1]
            .match(/^(.+) - YouTube/)[1];
    }

    keywordToUrl(keyword) {
        let matchLink = super.getResponse('GET', encodeURI(`https://www.youtube.com/results?search_query=${keyword}`), null)
            .match(/"url":"(\/watch\?v=[^"]+)/);

        return matchLink == null ? '' : `https://www.youtube.com${matchLink[1]}`;
    }

    canHandleUrl(url) {
        return url.match(/youtube\.com/) !== null;
    }
}

module.exports = {
    YoutubeTransFormerImpl: YoutubeTransFormerImpl,
    TransFormer: TransFormer
};