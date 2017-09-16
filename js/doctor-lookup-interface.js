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

      //sort the specialties.name alphabetically
      //make an array of names to sort
      // category.specialties.sort(specialtyCompare);
      // sortedNames.forEach(function(name){
      //   console.log("Sort---> "+name);
      // })
      //now go through specialties by sortedName
      category.specialties.forEach(function(specialty){
        console.log("Sort---> "+specialty.name);
        $('ul#specialty-list').append(`<li class="show-${category.name}-specialties" id="${specialty.uid}"data-toggle="tooltip" data-placement="bottom" title="${specialty.description}">${specialty.name}</li>`);
      });
    });
 };

//  function specialtyCompare(a,b) {
//   if (a.name < b.name)
//     return -1;
//   if (a.name > b.name)
//     return 1;
//   return 0;
// }


 let displayDoctors = function(doctors,specialty){
    $('ul#doctor-list').prepend(`<h3 class="show-title-doc" id="show-${specialty}-title">[${specialty}]</h3>`);
    doctors.forEach(function(doctor){
      //console.log("DOCTOR"+doctor.first+" "+doctor.last+" Specialty"+specialty);
      $('ul#doctor-list').append(`<li class="${doctors-specialty}" id="${doctor.last}"> ${doctor.first} ${doctor.last} ${doctor.title}</li>`);

      // //-----------Modal for remaining doctorinfor?
      // <!-- Button trigger modal -->
      // <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
      //   Launch demo modal
      // </button>
      //
      // <!-- Modal -->
      // <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      //   <div class="modal-dialog" role="document">
      //     <div class="modal-content">
      //       <div class="modal-header">
      //         <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      //         <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      //       </div>
      //       <div class="modal-body">
      //         ...
      //       </div>
      //       <div class="modal-footer">
      //         <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      //         <button type="button" class="btn btn-primary">Save changes</button>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // //-----------End Modal for remaining doctorinfor?


    });
 };

 //--------------- Find By Specialty Option --------------------//
 $('#specialty-option').submit(function(event) {
    event.preventDefault();
    //alert("You are in specialtyoption");
    $("#category-list li").remove();
    let doctorLookup = new DoctorLookup();

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
     $("#show-specialties").show();
     $("#specialty-list li").hide();
     $(`.show-title-cat`).hide();
     $(`.show-${category}-specialties`).show();
     $(`#show-${category}-title`).show();

     //---Initialize
     $(function () {
       $('[data-toggle="tooltip"]').tooltip()
     })
  });

 //--------------- Specialty- click --------------------//
  $("ul#specialty-list").on('click', 'li',function(){
    let specialty = $(this).attr("id");
        console.log("THIS  "+$(this));
        console.log("ID   "+specialty);
      //when we click on a speciality, do a API request for dr's
      //in that specialty
    doctorLookup.getDoctorsBySpecialty(specialty,displayDoctors);
     $("#show-doctors").show();

     $("#doctor-list li").hide();
     $(`.show-title-doc`).hide();
     $(`.show-${specialty}-doctors`).show();
     $(`#show-${specialty}-title`).show();

  });
 //--------------- Doctor Name Click- click --------------------//

  $("ul#doctor-list").on('click', 'li',function(){
     let doctorId = $(this).attr("id");
         console.log("THIS  "+$(this));
         console.log("ID   "+doctorId);

         //trigger modal by id
  });

  });
});
