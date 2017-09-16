var apiKey = require('./../.env').apiKey;

export class DoctorRef{
  constructor(first,last,title,accepts,street,city,zip,number){
    this.first = first;
    this.last = last;
    this.title = title;
    this.accepts = accepts;
    this.street = street;
    this.city = city;
    this.zip = zip;
    this.number = number;
  }
}

export class SpecialtyRef{
  constructor(name, uid, description){
    this.name = name;
    this.uid = uid;
    this.description = description;
  }
}
export class CategoryRef {
  constructor(name,specialties){
    this.name = name;
    this.specialties = specialties;
  }
}

function specialtyNameCompare (a,b) {
   if (a.name < b.name)
     return -1;
   if (a.name > b.name)
     return 1;
   return 0;
  }


export class DoctorLookup{

  getSpecialtiesByCategory(specialties){
    let categoryArray = [];
    let categories = [];
    let init = 0;

    specialties.data.forEach(function(specialty){
        let newSpecialty = new SpecialtyRef(specialty.name, specialty.uid, specialty.description);
        let found = 0;
        if (categories.includes(specialty.category)){
            for (let i = 0; i < categoryArray.length; i++) {
              if (categoryArray[i].name === specialty.category) {
                categoryArray[i].specialties.push(newSpecialty);
                found = 1;
              }
            }
          } else {
            found = 0;
          }
        //If not found create a new one
        if (!found){
          console.log("New category  "+specialty.category);
          //Create a new CategoryRef and push into category Arr
          let newRef = new CategoryRef(specialty.category,[newSpecialty]);
          categoryArray.push(newRef);
          categories.push(newRef.name);
        }
    });
    // Sort the Specialties alphabetically in Each Category
    categoryArray.forEach(function(category){
        category.specialties.sort(specialtyNameCompare);
    });
    return categoryArray;
  }

  getDoctorData(doctors){
    let newDoctors = [];
      for (let key in doctors ){
        console.log("Doctors KEY : "+key);
      }
    doctors.data.forEach(function(doctor){
        let newDoctor = new DoctorRef(doctor.profile.first_name, doctor.profile.last_name, doctor.profile.title, doctor.practices[0].accepts_new_patients, doctor.practices[0].visit_address.street, doctor.practices[0].visit_address.city, doctor.practices[0].visit_address.zip, doctor.practices[0].phones.number);
        newDoctors.push(newDoctor);
      });
    return newDoctors;
  }

  getSpecialties(displaySpecialties) {
    let data;
    let url = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=${apiKey}`;
    $.get(url)
      .then( (data) => {
        displaySpecialties(this.getSpecialtiesByCategory(data));
      })
      .fail ( () =>{
        console.log("getSpecialties: something went wrong");
      });
  }

  getDoctorsBySpecialty(specialty, displayDoctors) {
    let data;
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${specialty}&location=45.55%2C-122.63%2C10&user_location=45.55%2C-122.63&sort=last-name-asc&skip=0&limit=25&user_key=${apiKey}`;

    $.get(url)
      .then( (data) => {
        displayDoctors(this.getDoctorData(data),specialty);
      })
      .fail ( () =>{
        console.log("getDoctorsBySpecialty: something went wrong");
      });
  }

}
