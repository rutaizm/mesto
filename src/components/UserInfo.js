export class UserInfo {
    constructor(userName, userJob, userAvatar) {
        this._userName = userName;
        this._userJob = userJob;
        this._userAvatar = userAvatar;
    }

    getUserInfo() {        
        const userData = {
            name : this._userName.textContent,
            about : this._userJob.textContent,
        }
        return userData;
    }

    setUserInfo(userInputs) {
        this._userName.textContent = userInputs.name;
        this._userJob.textContent = userInputs.about;
    }

    setUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}