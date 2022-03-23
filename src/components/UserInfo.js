//--------//
// Классы //
//--------//

class UserInfo {
    
	constructor(profileData) {
    this._profileName = profileData.profileName;
    this._profileDescription = profileData.profileDescription;
    this.profileName = document.querySelector(this._profileName);
    this.profileDescription = document.querySelector(this._profileDescription); 
	}

  getUserInfo() {
  
    /*const inputName = document.querySelector('#name');
    const inputDescription = document.querySelector('#description');
*/
   /* inputName.value = this.profileName.textContent;
    inputDescription.value = this.profileDescription.textContent;
    this.profileValues = [inputName.value, inputDescription.value];*/
    
    //return this.profileValues;
    return {
      name: this.profileName.textContent, 
      description: this.profileDescription.textContent}
  }

  setUserInfo(inputName, inputDescription) {
    this.profileName.textContent = inputName;
    this.profileDescription.textContent = inputDescription;
  }
	
}

//---------//
// Экспорт //
//---------//

export {UserInfo}; 
