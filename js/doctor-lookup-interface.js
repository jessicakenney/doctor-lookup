var apiKey = require('./../.env').apiKey;
import { DoctorLookup } from './../js/doctor-lookup.js';
import { Ref } from './../js/doctor-lookup.js';

$(document).ready(function() {

  let displaySpecialties = function(categories){
    $("#show-categories").show();
    categories.forEach(function(category){
      category.specialties.sort();
      console.log("CATEGORY : "+category.name+" SPECIALTIES :  "+category.specialties);

      // Category List
      $('ul#category-list').append(`<li class="specialty-categories" id="${category.name}"> ${category.name}</li>`);

      // Specialty Lists by Category
      $('ul#specialty-list').prepend(`<h3 class="show-title" id="show-${category.name}-title">[${category.name}]</h3>`);
      category.specialties.forEach(function(specialty){
        $('ul#specialty-list').append(`<li class="show-${category.name}-specialties" id="${specialty}">${specialty}</li>`);
      });

    });
 };

 //--------------- Specialty - Option --------------------//
 $('#specialty-option').submit(function(event) {
    event.preventDefault();
    //alert("You are in specialtyoption");
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

  $("ul#category-list").on('click', 'li',function(){
    let category = $(this).attr("id");
    // let re=/\d+/;
    // let category = re.exec(id);

        console.log("THIS  "+$(this));
        console.log("ID   "+category);

     //alert("Show specialties in a category "+category);
     //get id of category clicked
     //hide everything ..then show what was clicked
     $("#show-specialties").show();
     $("#specialty-list li").hide();
     $(`.show-title`).hide();
     $(`.show-${category}-specialties`).show();
     $(`#show-${category}-title`).show();
  });

  $("ul#specialty-list").on('click', 'li',function(){
    let specialty = $(this).attr("id");
        console.log("THIS  "+$(this));
        console.log("ID   "+specialty);
      //when we click on a speciality, do a API request for dr's
      //in that specialty
    //doctorLookup.getDoctorBySpecialty(specialty,displayDoctors);

  });


  });


});
