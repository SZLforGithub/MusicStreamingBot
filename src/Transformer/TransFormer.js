const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

class TransFormer {
    constructor() {
    }

    urlToKeyword(url) {
        return '';
    }

    keywordToUrl(keyword) {
        return '';
    }

    getResonse(method, url, data) {
        let resp = null;
        let xhr = new XMLHttpRequest;
        xhr.open (method, url, false);
        xhr.send(data);
        return xhr.responseText;
    }
  
    canHandleUrl(url) {
        return false;
    }
}

module.exports = TransFormer;
