/*
 File: /~vpang/index.html
 COMP 4610 Assignment 7: Dynamic Multiplication Table w/ JQUERY sliders
 Vannarath Pang, UMass Lowell Computer Science, vpang@cs.uml.edu
 Copyright (c) 2020 by Vannarath N Pang. All rights reserved. May be
 freely copied or excerpted for educational purposes with credit to the author.
 updated by VP on November 27th, 2020 at 7:30 PM

 This webpage displays a dynamic multiplication table that uses Jsliders/Tabs & catches errors if non numerical input is submitted.

*/

// This is used to send javascript table to HTML form. Found from Google.
// Submit page once on load to load sliders and preset table at values 1.
$( document ).ready(function() {
  console.log( "ready!" );
  validate();
  $("form#tableInput").submit();
});

// This function is used for Error catching and displays a customized error message below the Calculate Button.
// My form doesn't allow any characters except numbers so I didn't include anything to catch errors regarding non numerical inputs.
function validate(){

// IMPLEMENT SLIDERS HERE: used this link to learn how to do so: https://api.jqueryui.com/slider/
 var minCol_slider = $("#minCol_slider").slider({
   range: "max",
   min: -50,
   max: 50,
   value: parseInt($('input[name=minCol]').val()),
   slide: function(event, ui) {
     $("#minCol").val(ui.value);
     //Submit the form after slider value changes to dynamically update the table.
     $("form#tableInput").submit();
   }
 });
 // This link helped to get an idea of how to link the input box with the sliders and to update the slider automatically when input box is changed. https://jqueryui.com/slider/#hotelrooms
  $("#minCol").on("change", function(){
    minCol_slider.slider("value", this.value);
    //resubmit form to update the values in table.
    $("form#tableInput").submit();
  });
//Repeat the process with all four input values/sliders.
  var maxCol_slider = $("#maxCol_slider").slider({
    range: "max",
    min: -50,
    max: 50,
    value: parseInt($('input[name=maxCol]').val()),
    slide: function(event, ui) {
      $("#maxCol").val(ui.value);
      $("form#tableInput").submit();
    }
  });

  $("#maxCol").on("change", function(){
    maxCol_slider.slider("value", this.value);
    $("form#tableInput").submit();
  });

  var minRow_slider = $("#minRow_slider").slider({
    range: "max",
    min: -50,
    max: 50,
    value: parseInt($('input[name=minRow]').val()),
    slide: function(event, ui) {
      $("#minRow").val(ui.value);
      $("form#tableInput").submit();
    }
  });

  $("#minRow").on("change", function(){
    minRow_slider.slider("value", this.value);
    $("form#tableInput").submit();
  });

  var maxRow_slider = $("#maxRow_slider").slider({
    range: "max",
    min: -50,
    max: 50,
    value: parseInt($('input[name=maxRow]').val()),
    slide: function(event, ui) {
      $("#maxRow").val(ui.value);
      $("form#tableInput").submit();
    }
  });

  $("#maxRow").on("change", function(){
    maxRow_slider.slider("value", this.value);
    $("form#tableInput").submit();
  });
// Received help from looking this up on how to compare if field is greater than min using validation. Adds custom method which compares inputs and requires max inputs to be greater than or equal to min.
// https://stackoverflow.com/questions/29451507/how-to-use-jquery-validator-to-determine-value-of-one-field-is-greater-than-anot
  $.validator.addMethod("greaterThan", function (value, element, param) {
      var $min = $(param);
      return parseInt(value) >= parseInt($min.val());
  }, "Max must be greater than min");

// Followed documentation of: https://jqueryvalidation.org/validate/
// Applies rules and displays error messages if outside of rule guidelines of -50, 50. Didn't include number check because input doesn't allow anything besides numbers.
$("#tableInput").validate({

  rules: {
    minCol: {
      required: true,
      range: [-50, 50]
    },
    maxCol: {
      required: true,
      range: [-50, 50],
      greaterThan: '#minCol'
    },
    minRow: {
      required: true,
      range: [-50, 50]
    },
    maxRow: {
      required: true,
      range: [-50, 50],
      greaterThan: '#minRow'
    }
  },
    messages: {
      minCol: {
        required: "This field is blank. Please enter a number between -50 to 50.",
        range: "Please enter a value between -50 and 50."
      },
      maxCol: {
        required: "This field is blank. Please enter a number between -50 to 50.",
        range: "Please enter a value between -50 and 50."
      },
      minRow: {
        required: "This field is blank. Please enter a number between -50 to 50.",
        range: "Please enter a value between -50 and 50."
      },
      maxRow: {
        required: "This field is blank. Please enter a number between -50 to 50.",
        range: "Please enter a value between -50 and 50."
      }
    },
// If no errors found, run normal function to create table.
      submitHandler: function(){
        createTable();
        return false;
      },
// If an error occurs, erase previous table.
      invalidHandler: function(){
        $(multTable).empty();
      },

// Used to append error message beside input box, because it gets stuck within a 1 column width div otherwise...
      errorPlacement(error, element){
        error.insertAfter(element.parent('div'));
      }
    });


  }

// Used https://jqueryui.com/tabs/ to get an idea of how to dynamically insert Tabs. Unforunately, the CSS isn't loading for it for some reason.
// create a counter variable to count number of tabs
  var tabCounter = 0;

  function tableTabs(){

    //calls Jquery tab function
    $("tabs").tabs();

    //increment the counter to label the table tabs
    tabCounter++;

    //insert a list item to create a title for the Tabs
    var tabTitle = "<li><a href='#tab-" + tabCounter + "'>" + "Table " + tabCounter + "</a></li>"

    //append to the ul
    $("#tabs ul").append(tabTitle);

    //save the current table to the tab created
    $( "#tabs" ).append('<div id="tab-' + tabCounter + '">' + $("#multTable").html() + '</div>');

    //continue here...
  }


function createTable() {
  // Typecasting to Number to avoid any conversion issues.
  var minRows = Number(document.getElementById('minRow').value);
  var maxRows = Number(document.getElementById('maxRow').value);
  var minCols = Number(document.getElementById('minCol').value);
  var maxCols = Number(document.getElementById('maxCol').value);
  var columns = minCols; // Used for incrementing
  var multTable = '<table>';

  //Initialize table row with a blank item for the look of the blank corner in the table
  multTable = '<tr>' + '<td></td>';
  // Fill first row
  for (var x = minRows; x <= maxRows; x++) {
    multTable += '<td>' + x + '</td>';
  }

  // Fill in the rest of the rows
  for (var y = minCols; y <= maxCols; y++) {
    multTable += '<tr>';
    multTable += '<td>' + columns + '</td>';
    for (var z = minRows; z <= maxRows; z++) {
      // Add actual values into table.
      multTable += '<td>' + y * z + '</td>';
    }
    // Close row
    multTable += '</tr>';
    columns++; // Increment the columns
  }
  // Close the table
  multTable += '</table>';

$('#multTable').html(multTable); //Display to HTML form

}
