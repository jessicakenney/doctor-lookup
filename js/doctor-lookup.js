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


  getSpecialtiesByCategory(specialties){
    let categoryArray = [];
    let categories = [];
    let init = 0;

    specialties.data.forEach(function(specialty){

    let found = 0;
    if (categories.includes(specialty.category)){
        console.log("****Category Exists  "+specialty.category);
        //need to find where in the array
        for (let i = 0; i < categoryArray.length; i++) {
          if (categoryArray[i].name === specialty.category) {
            categoryArray[i].specialties.push(specialty.name);
            found = 1;
          }
        }
      } else {
        found = 0;
      }
    //if not found create a new one
    if (!found){
    console.log("New category  "+specialty.category);
    //create a new ref and push into category Arr
      let newRef = new Ref(`${specialty.category}`,[`${specialty.name}`]);
    //and push in specialty
      categoryArray.push(newRef);
      console.log("Push into testarray "+newRef.name);
      categories.push(newRef.name);
    }

    });
    return categoryArray;
  }

  getSpecialties(displaySpecialties) {
    let data;
    let url = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=${apiKey}`;
    $.get(url)
      .then( (data) => {
        displaySpecialties(this.getSpecialtiesByCategory(data));
      })
      .fail ( () =>{
        console.log("something went wrong");
      });
  }

}
