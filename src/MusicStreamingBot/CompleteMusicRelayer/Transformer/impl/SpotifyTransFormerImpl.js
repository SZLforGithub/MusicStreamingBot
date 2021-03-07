const TransFormer = require('../TransFormer.js');

class SpotifyTransFormerImpl extends TransFormer {
    constructor() {
        super();
        this.label = 'spotify';
    }

    urlToKeyword(url) {
        return super.getResponse('GET', url, null)
            .match(/<title>(.+)<\/title>/)[1]
            .match(/^(.+) \| Spotify/)[1];
    }

    keywordToUrl(keyword) {
        let accessToken = JSON.parse(super.getResponse('GET', encodeURI(`https://open.spotify.com/get_access_token?reason=transport&productType=web_player`), null))["accessToken"];

        let dataFromSpotifyAPI = JSON.parse(super.getResponse('GET', encodeURI(`https://api.spotify.com/v1/search?type=album&q=${keyword}&decorate_restrictions=false&best_match=true&include_external=audio&limit=10&market=TW`), null, `Bearer ${accessToken}`));

        let bestMatchLink = dataFromSpotifyAPI["best_match"]["items"][0]["tracks"]["items"][0]["external_urls"]["spotify"];

        return bestMatchLink;
    }

    canHandleUrl(url) {
        return url.match(/spotify\.com/) !== null;
    }
}

module.exports = {
    SpotifyTransFormerImpl: SpotifyTransFormerImpl,
    TransFormer: TransFormer
};