var apiKey = require('./../.env').apiKey;

export class Ref {
  constructor(name,specialties){
    this.name = name;
    this.specialties = specialties;
  }
}

export class DoctorLookup{

  constructor(){
  }

  // getSpecialties(showSpecialties){
  //   let url = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=${apiKey}`
  //   return
  // }

  getSpecialties() {
    let url = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=${apiKey}`;
    return $.get(url);
  }

}
