const prompt = require("prompt-sync")(); // Ask for user inputs
let gameCharacter = prompt("Enter a game character: ");
let weapon = prompt("Enter a weapon: ");
let story = "Once upon a time " + gameCharacter + " was on a mission to ..."
console.log(story);

let mystory= "It was a dark night and " + gameCharacter + "was sitting in his room, reading a book of history." + gameCharacter + "hears a loud thump came from the outised of his room. He crept up to the window and saw a goblin." + gameCharacter + "pulls out his " + weapon + "and swings at the small fiend." + gameCharacter + "finally vanquishes the beast and is sweating from head to toe."
console.log(mystory)