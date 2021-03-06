const TransFormer = require('../TransFormer.js');

class StreetVoiceTransFormerImpl extends TransFormer {
    constructor() {
        super();
    }

    urlToKeyword(url) {
        return super.getResponse('GET', url, null)
            .match(/<title>(.+)<\/title>/)[1]
            .match(/^(.+) \| StreetVoice 街聲/)[1];
    }

    keywordToUrl(keyword) {
        let matchLink = super.getResponse('GET', encodeURI(`https://streetvoice.com/search/?q=${keyword}&type=song`), null)
            .match(/href="(\/.+\/songs\/[0-9]+\/)"/);
        return matchLink == null ? '' : `https://streetvoice.com${matchLink[1]}`;
    }

    canHandleUrl(url) {
        return url.match(/streetvoice\.com/) !== null;
    }
}

module.exports = {
    StreetVoiceTransFormerImpl : StreetVoiceTransFormerImpl, //export this class
    TransFormer: TransFormer // and export parent class too!
};
