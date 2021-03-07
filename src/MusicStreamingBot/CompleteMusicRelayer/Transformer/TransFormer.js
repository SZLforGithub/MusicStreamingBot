const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class TransFormer {
    constructor() {
        this.label = 'TransFormer';
    }

    urlToKeyword(url) {
        return '';
    }

    keywordToUrl(keyword) {
        return '';
    }

    getResponse(method, url, data, accessToken) {
        let xhr = new XMLHttpRequest;
        xhr.open(method, url, false);
        xhr.withCredentials = true;

        if (accessToken) {
            xhr.setRequestHeader("authorization", accessToken);
        }

        xhr.send(data);
        return xhr.responseText;
    }

    canHandleUrl(url) {
        return false;
    }
}

module.exports = TransFormer;
