//--------//
// Классы //
//--------//

class UserInfo {
    
	constructor(profileData) {
    this._profileName = profileData.profileName;
    this._profileDescription = profileData.profileDescription;
    this._profileAvatar = profileData.profileAvatar;
    this.profileName = document.querySelector(this._profileName);
    this.profileDescription = document.querySelector(this._profileDescription);
    this.profileAvatar = document.querySelector(this._profileAvatar);
	}

  getUserInfo() {
    return {
      name: this.profileName.textContent, 
      description: this.profileDescription.textContent,
      avatar: this.profileAvatar.src}
  }

  getUserDOM(userData) { // получение данных с сервера
    this.profileName.textContent = userData.name;
    this.profileDescription.textContent = userData.about;
    this.profileAvatar.src = userData.avatar;
  }

  setUserInfo(inputName, inputDescription) { // получение данных из инпутов
    this.profileName.textContent = inputName;
    this.profileDescription.textContent = inputDescription;
  }

}

//---------//
// Экспорт //
//---------//

export {UserInfo}; 
