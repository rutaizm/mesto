export class Api {
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }

    _handleError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Алярма ${res.status}`);
    }

    getInitialCards() {
      return fetch(`${this._url}/cards`, {
            headers: this._headers
        })
        .then(this._handleError);
    }

    addCard(name, link, _id) {
        return fetch(`${this._url}/cards`, {
            method:"POST",
            headers: this._headers,
            body:JSON.stringify({name:name, link:link, _id:_id}),
        })
        .then(this._handleError); 
    }

    deleteCard(_id) {
        return fetch(`${this._url}/cards/${_id}`, {
            method:"DELETE",
            headers: this._headers,
        })
        .then(this._handleError); 
    }

    getProfileInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
        })
        .then(this._handleError); 
    }

    editProfileInfo(name, about) {
        return fetch(`${this._url}/users/me`, {
            method:"PATCH",
            headers: this._headers,
            body:JSON.stringify({name:name, about:about}),
        })
        .then(this._handleError); 
    }
}