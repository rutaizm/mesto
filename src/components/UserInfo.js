export class UserInfo {
    constructor(userName, userJob) {
        this._userName = userName;
        this._userJob = userJob;
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
}