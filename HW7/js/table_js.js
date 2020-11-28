/*
 File: /~vpang/table_js.js
 COMP 4610 Assignment 5: Dynamic Multiplication Table
 Vannarath Pang, UMass Lowell Computer Science, vpang@cs.uml.edu
 Copyright (c) 2020 by Vannarath N Pang. All rights reserved. May be
 freely copied or excerpted for educational purposes with credit to the author.
 updated by VP on October 29th, 2020 at 7:30 PM

 This webpage displays a dynamic multiplication table that catches errors if non numerical input is submitted.
*/

// This is used to send javascript table to HTML form. Found from Google.
$( document ).ready(function() {
  console.log( "ready!" );
});
// This function is used for Error catching and displays a customized error message below the Calculate Button.
// My form doesn't allow any characters except numbers so I didn't include anything to catch errors regarding non numerical inputs.
function validate(){
  // Typecasting to Number to avoid any conversion issues.
  var minRows = Number(document.getElementById('minRow').value);
  var maxRows = Number(document.getElementById('maxRow').value);
  var minCols = Number(document.getElementById('minCol').value);
  var maxCols = Number(document.getElementById('maxCol').value);

// If any min is greater than the max, send an error message and return false.
  if(minRows > maxRows){
    document.getElementById("error").innerHTML = "ERROR: Min Row is larger than Max Rows.";
    return false;
  }
  else if(minCols > maxCols){
    document.getElementById("error").innerHTML = "ERROR: Min Cols is larger than Max Cols.";
    return false;
  }

  // To check if any of the fields are left blank, send an error message and return false.
  // I couldn't get this to work because the empty field returns back 0 since I'm typecasting the value... will try to figure out a solution in the future.

  /*else if(minRows === null || minRows === "" ||
  maxRows === null || maxRows === "" ||
  minCols === null || minCols === "" ||
  maxCols === null || maxCols === ""){
    document.getElementById("error").innerHTML = "ERROR: One or more fields are blank.";
    return false;
  }*/

  // Max values cannot exceed 100.
  else if(minRows < -100 || maxRows > 100 || minCols < -100 || maxCols > 100){
    document.getElementById("error").innerHTML = "ERROR: Field values cannot exceed 100.";
    return false;
  }
  else{
    document.getElementById("error").innerHTML = "";
    createTable();
  }
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
