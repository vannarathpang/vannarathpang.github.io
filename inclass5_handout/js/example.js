//NAME: VANNARATH PANG
//CLASS: COMP 4610


// ADD NEW ITEM TO END OF LIST
// Select the 'ul' in document to append and li child to the list.
var ul = document.querySelector("ul");
var cream = document.createElement("li");
cream.appendChild(document.createTextNode("cream"));
cream.setAttribute("id", "five");
ul.appendChild(cream);
// ADD NEW ITEM START OF LIST
// Does the same as above but uses insertBefore to insert before first item in list.
var kale = document.createElement("li");
kale.appendChild(document.createTextNode("kale"));
kale.setAttribute("id", "six");
ul.insertBefore(kale, ul.childNodes[0]);
// ADD A CLASS OF COOL TO ALL LIST ITEMS
// Use a for loop to traverse collection of li's in list and set class attribute to 'cool'
var li = document.querySelectorAll("li");
var length = li.length;
for(var i = 0; i < length; i++){
  li[i].setAttribute('class', 'cool');
}
// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
//append a span tag to h2 and append the length to the span element.
var header = document.querySelector('h2');
var span = document.createElement("span");
header.appendChild(span);
span.appendChild(document.createTextNode(length));
