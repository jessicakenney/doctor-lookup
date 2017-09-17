var apiKey = require('./../.env').apiKey;
import { DoctorLookup } from './../js/doctor-lookup.js';
import { Ref } from './../js/doctor-lookup.js';

$(document).ready(function() {


 //--------------- Display Functions --------------------//
  let displaySpecialties = function(categories){
    $("#show-categories").show();
    categories.forEach(function(category){
      //console.log("CATEGORY : "+category.name+" SPECIALTIES :  "+category.specialties.name);

      // Category List
      $('ul#category-list').append(`<li class="specialty-categories" id="${category.name}"> ${category.name}</li>`);

      // Specialty Lists (by Category)
      $('ul#specialty-list').prepend(`<h3 class="show-title-cat" id="show-${category.name}-title">[${category.name}]</h3>`);

      category.specialties.forEach(function(specialty){
        console.log("Sort---> "+specialty.name);
        $('ul#specialty-list').append(`<li class="show-${category.name}-specialties" id="${specialty.uid}"data-toggle="tooltip" data-placement="bottom" title="${specialty.description}">${specialty.name}</li>`);
      });
    });
 };


 let displayDoctors = function(doctors,specialty){

    $('ul#doctor-list').prepend(`<h3 class="show-title-doc" id="show-${specialty}-title">[${specialty}]</h3>`);

    doctors.forEach(function(doctor){
      //console.log("DOCTOR"+doctor.first+" "+doctor.last+" Specialty"+specialty);
      $('ul#doctor-list').append(`<li class="${doctors-specialty}" id="${doctor.last}"> ${doctor.first} ${doctor.last} ${doctor.title}</li>`);

      //---------------Doctor Detail -----------------------------//
       $('ul#doctor-detail').append(`<h3 class="show-${doctor.last}-doctor-detail"> ${doctor.first} ${doctor.last} ${doctor.title}</h3> <hr class="show-${doctor.last}-doctor-detail"> <td class="show-${doctor.last}-doctor-detail" ><img src=${doctor.image_url} class="show-${doctor.last}-doctor-detail"> </img></td> <h4 class="show-${doctor.last}-doctor-detail"> ${doctor.practice_name}</h4> <h5 class="show-${doctor.last}-doctor-detail"> ${doctor.street} ${doctor.city} ${doctor.zip}</h5>`);
       doctor.phones.forEach(function(phone){
         $('ul#doctor-detail').append(`<p class="show-${doctor.last}-doctor-detail"> ${phone.type} ${phone.number} </p>`);
       })
      $('ul#doctor-detail').append(`<p class="show-${doctor.last}-doctor-detail"><em>Accepting New Patients: ${doctor.accepts}</em></p>`);

     });
 };

 //--------------- Find By Specialty Option --------------------//
 $('#specialty-option').submit(function(event) {
    event.preventDefault();
    $("#category-list li").remove();
    let doctorLookup = new DoctorLookup();

     $(".show-title-cat").remove();
     $("ul#specialty-list > li").remove();
     $("#show-specialties").hide();

     $("ul#doctor-list > h3").remove();
     $("ul#doctor-list > li").remove();
     $("#show-doctors").hide();

     $("h3.show-title-doc").remove();
     $("ul#doctor-detail > li").remove();
     $("#show-doctor-detail").hide();

    doctorLookup.getSpecialties(displaySpecialties);


 //--------------- Category- click --------------------//
  $("ul#category-list").on('click', 'li',function(){
    let category = $(this).attr("id");
    // let re=/\d+/;
    // let category = re.exec(id);

        console.log("THIS  "+$(this));
        console.log("ID   "+category);

     //alert("Show specialties in a category "+category);
     //get id of category clicked
     //hide everything ..then show what was clicked
     $("#specialty-list li").hide();
     $(`.show-title-cat`).hide();
     $("#show-doctors").hide();
     $("#show-doctor-detail").hide();


     $("#show-specialties").show();
     $(`.show-${category}-specialties`).show();
     $(`#show-${category}-title`).show();

     //---Initialize
     $(function () {
       $('[data-toggle="tooltip"]').tooltip();
     })
  });

 //--------------- Specialty- click --------------------//
  $("ul#specialty-list").on('click', 'li',function(){
    let specialty = $(this).attr("id");

      //when we click on a speciality, do a API request for dr's
      //in that specialty
    doctorLookup.getDoctorsBySpecialty(specialty,displayDoctors);
     $("#show-doctors").show();

     $("#doctor-list li").hide();
     $("#show-doctor-detail").hide();
     $("h3.show-title-doc").remove();
     //$("ul#doctor-detail > li").remove();


     $(`.show-${specialty}-doctors`).show();
     $(`#show-${specialty}-title`).show();

  });
 //--------------- Doctor Name Click- click --------------------//

  $("ul#doctor-list").on('click', 'li',function(){
     let doctorId = $(this).attr("id");
         console.log("THIS  "+$(this));
         console.log("ID   "+doctorId);

         //We want to see doctor details by some id "lastname"
         //will need to pass the id to a displayDoctorDetail(id)
         //how will displayDoctorDetail know about doctors from
         //API call?
         //when doctor is clicked just "show detail based on ID"

         //hide prev details
        //show new dr details
     $("#show-doctor-detail").show();
     $("#doctor-detail > *").hide();
     $(`.show-${doctorId}-doctor-detail`).show();


  });


  });
});
