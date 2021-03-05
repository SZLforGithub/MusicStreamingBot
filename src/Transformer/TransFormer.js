import { Request } from 'httprequest';

class TransFormer {
  constructor() {
  }

  urlToKeyword(url) {
	  return '';
  }

  keywordToUrl(keyword) {
	  return '';
  }

  getHeaderTitle(url) {
    new Request('POST', '/api/reservations').sendData({ venue_id: 100 }, (err, response) => {
      if (err) throw err;
      console.log('got response', res);
    });
  }
}

module.exports = TransFormer;
