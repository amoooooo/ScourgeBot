class Scourge {

  constructor(name, userID, weaknesses, strengths, personality, description){
    this._name = name;
    this._userID = userID;
    this._weaknesses = weaknesses;
    this._strengths = strengths;
    this._personality = personality;
    this._description = description;
  }

  get name() { return this._name; }

  get userID() { return this._userID; }

  get weaknesses() { return this._weaknesses; }

  get strengths() { return this._strengths; }

  get personality() { return this._personality; }

  get description() { return this._description; }

  getRandomInt(min, max) {
  	return Math.floor(Math.random() * (max - min)) + min;
  }

  generateName(firstName, secondName){
    this._name = firstName[this.getRandomInt(0,firstName.length+1)] + ' ' + secondName[this.getRandomInt(0,secondName.length+1)];
  }

  generateWeakness() {
    let weaknessArr = ["poison","fire","cold","electricity","acid"];
    this._weaknesses = [weaknessArr[this.getRandomInt(0,weaknessArr.length+1)]];
  }
}
