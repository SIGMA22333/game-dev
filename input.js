const prompt = require('prompt-sync')();

// Get user input for character name and game
let cardsuit = prompt("What cardsuit are you part of? ");
let cardnumber = prompt("Which card will you pick? ");

// Combine the inputs into a greeting
// let greeting = "Welcome to " + gameName + ", " + characterName + "! Prepare for your adventure!";

//console.log(greeting);

console.log("I know what card you are thinking of! "+ cardsuit + cardnumber)

