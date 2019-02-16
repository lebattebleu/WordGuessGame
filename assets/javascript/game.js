// 80s Word Guess Game by Laura Sedok

//characters for the computer to pick
"use strict";

var hairBands = ["poison", "bonjovi", "skidrow", "motleycrue", "kiss", "warrant", "gunsnroses", "ratt", "aerosmith", "scorpions"];
var maxTries = 10;
var guessesLeft = 0;
var computerPick;     //What the computer picks
var computerPickLength;
var hairbandWord = []; //this is the hidden word.
var wins = 0;
var userGuess = [];
var finishedGame = false; // Flag for 'press any key to try again'     

// Game sounds
var keySound = new Audio('./assets/sounds/typewriter-key.wav');

// Reset the game
function resetGame() {
    guessesLeft = maxTries;

    //the computer pick an character picks a character
    var computerPick = hairBands[Math.floor(Math.random() * hairBands.length)];
    var computerPickLength = computerPick.length;
    //alert(computerPick);
    //alert(computerPick.length);

    // Clear out arrays
    userGuess = [];
    hairbandWord = [];

    // Build the guessing word and clear it out
    for (var i = 0; i < computerPickLength; i++) {
        hairbandWord.push("_");
    }   

    //make blanks for the answer
    /*for (var i = 0; i < computerPick.length; i++) {
        for (var i = 0; i < computerPick.length; i++) {
            var answer = [];
            answer = "_ ";   
        }
    }  
    //print the word blanks
    for (var i = 0; i < computerPick.length; i++) {
        var grabAnswerDiv = $("#currentWord");
        var printAnswertoDiv = document.createTextNode(answer);
        grabAnswerDiv.append(printAnswertoDiv);    
    }    */

    if(computerPick == hairBands[0]) {
        $('.clue').html("<img src='assets/images/poison.jpg' width='300'/>");
    }else if(computerPick == hairBands[1]) {
        $('.clue').html("<img src='assets/images/bonjovi.jpg' width='300'/>");
    }else if(computerPick == hairBands[2]) {
        $('.clue').html("<img src='assets/images/skidrow.jpg' width='300'/>");
    }else if(computerPick == hairBands[3]) {
        $('.clue').html("<img src='assets/images/motleycrue.jpg' width='300'/>");
    }else if(computerPick == hairBands[4]) {
        $('.clue').html("<img src='assets/images/kiss.jpg' width='300'/>");  
    }else if(computerPick == hairBands[5]) {
        $('.clue').html("<img src='assets/images/warrant.jpg' width='300'/>");  
    }else if(computerPick == hairBands[6]) {
        $('.clue').html("<img src='assets/images/gunsnroses.jpg' width='300'/>");  
    }else if(computerPick == hairBands[7]) {
        $('.clue').html("<img src='assets/images/ratt.jpg' width='300'/>");  
    }else if(computerPick == hairBands[8]) {
        $('.clue').html("<img src='assets/images/aerosmith.jpg' width='300'/>");       
    }else if(computerPick == hairBands[9]) {
        $('.clue').html("<img src='assets/images/scorpions.jpg' width='300'/>");                                
    }else($('.clue').text('neither of these')); 

    // Hide game over and win images/text
    $("#pressKeyTryAgain").css("display", "none");
    $("#gameover-image").css("display", "none");
    $("#youwin-image").css("display", "none");

    //Update the Interface
    updateDisplay();
}

//  Updates the display on the HTML Page
function updateDisplay() {

    $("#gameWins").text(wins);
    // Display the letters guessed so far
    var hairbandWordText = "";
    for (var i = 0; i < hairbandWord.length; i++) {
        hairbandWordText += hairbandWord[i];
    }
    //update hangman words, guesses left, and guessed letters
    $("#currentWord").text(hairbandWordText);
    $("#guessesLeft").text(guessesLeft);
    $("#myGuesses").text(userGuess);
}

// This function takes a letter and finds all instances of 
// it in the string replaces them with the blanks.
function evaluateGuess(letter) {
    // Array to store positions of letters in string
    var charPositions = [];
    // Loop through word finding all instances of guessed letter and save it to the array.
    for (var i = 0; i < computerPickLength; i++) {
        if(computerPick[i] === letter) {
            charPositions.push(i);
        }
    }
    // if you picked the wrong letter, update guesses left
    if (charPositions.length <= 0) {
        guessesLeft--;
    } else {
        // Loop through all the indicies and replace the '_' with a letter.
        for(var j = 0; j < charPositions.length; j++) {
            hairbandWord[charPositions[j]] = letter;
        }
    }
}

// Checks for a win by seeing if there are any remaining underscores in the hangman word we are building.
function checkWin() {
    if(hairbandWord.indexOf("_") === -1) {
        $(".bandName").css("display", "none");        
        $("#youwin-image").css("display", "block");
        $("#pressKeyTryAgain").css("display", "block");
        wins++;
        finishedGame = true;
    }
}

// Checks for a loss
function checkLoss()
{
    if(guessesLeft <= 0) {
        $(".hangTitle").css("display", "none");        
        $("#gameover-image").css("display", "block");
        $("#pressKeyTryAgain").css("display", "block");
        finishedGame = true;
    }
}
// Makes a guess
function makeGuess(letter) {
    if (guessesLeft > 0) {
        // Make sure we didn't use this letter yet
        if (userGuess.indexOf(letter) === -1) {
            userGuess.push(letter);
            evaluateGuess(letter);
        }
    }
}
// Event listener
document.onkeydown = function(event) {
    //if the game is finished, restart it. 
    if(finishedGame) { 
	startGame(); 
		finishedGame = false; 
     } else { 
         // Check to make sure a-z was pressed. 
         if(event.keyCode >= 65 && event.keyCode <= 90) { 
             keySound.play(); 
             makeGuess(event.key.toUpperCase()); 
             resetGame(); 
             checkWin(); 
			 checkLoss(); 
         } 
     } 
 }; 