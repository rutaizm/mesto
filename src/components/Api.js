export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    getInitialCards() {
      return fetch(this._url, {
            headers: this._headers
        })
        .then((res) =>{
            return res.json();
        });
    }
}