var apiKey = require('./../.env').apiKey;
import { DoctorLookup } from './../js/doctor-lookup.js';
import { Ref } from './../js/doctor-lookup.js';

$(document).ready(function() {

  let displaySpecialties = function(categories){
  // let categoryArray = [];
  // let categories = [];
  // let init = 0;
  //
  // specialties.data.forEach(function(specialty){
  // //specialties are unique
  // //initialize
  // if (!init){
  //     console.log("Init new catArray"+specialty.name+" "+specialty.category);
  //       let newRef = new Ref(`${specialty.category}`,[`${specialty.name}`]);
  //       categoryArray.push(newRef)
  //       init = 1;
  // }
  // //loop thru all existing categories to determine if exists
  // // categoryArray.forEach(function (name){
  // //  testName.push(categoryArray.name);
  // // });
  // let found = 0;
  // if (categories.includes(specialty.category)){
  //         console.log("****Category Exists  "+specialty.category);
  //         //need to find where in the array
  //         for (let i = 0; i < categoryArray.length; i++) {
  //           if (categoryArray[i].name === specialty.category) {
  //             categoryArray[i].specialties.push(specialty.name);
  //             found = 1;
  //           }
  //         }
  //       } else {
  //         found = 0;
  //       }
  //     //if not found create a new one
  //     if (!found){
  //     console.log("New category  "+specialty.category);
  //     //create a new ref and push into category Arr
  //       let newRef = new Ref(`${specialty.category}`,[`${specialty.name}`]);
  //     //and push in specialty
  //       categoryArray.push(newRef);
  //       console.log("Push into testarray "+newRef.name);
  //       categories.push(newRef.name);
  //     }
  //
  // });
    $("#show-categories").show();
    categories.forEach(function(category){
      category.specialties.sort();
      console.log("CATEGORY : "+category.name+" SPECIALTIES :  "+category.specialties);
      $('ul#category-list').append(`<li> <span class="specialty-categories"> ${category.name} </span> </li>`);
    });

    // specialties.data.forEach(function(specialty){
    //   // console.log("SHOWspecialties"+specialty.name);
    //   $('ul#specialty-list').append(`<li> <span class="specialties"> ${specialty.name}  ${specialty.category} </span> </li>`);
    // });
 };

 //--------------- Specialty - Option --------------------//
 $('#specialty-option').submit(function(event) {
    event.preventDefault();
    alert("You are in specialtyoption");
    $("#category-list li").remove();
    let doctorLookup = new DoctorLookup();

    //doctorLookup.getSpecialties(displaySpecialties);

    // API call to get data
    // doctorLookup.getSpecialties(displaySpecialties).then(function(data){
    //     showSpecialties(data);
    // }).catch(function(err){
    //     console.log("Oops, something went wrong", err);
    // });

    doctorLookup.getSpecialties(displaySpecialties);



  });
  $("#category-list").on('click', '.speciality-categories',function(){
     alert("Ready to see all the specialties in a category");
     $("#show-specialties").show();
  });

});
