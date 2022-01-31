var buttonColors = ["red", "blue", "green", "yellow"]; // array to hold button sequence

var gamePattern = []; // empty array to hold the game pattern

var userClickedPattern = []; // empty array to hold the user button clicked pattern

var level = 0; // to track the user level

var started = false; // to track if the game has started

// to play sound both in the color flash and user click
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(toAnimateColor) {
    $("#" + toAnimateColor).addClass("pressed");

    setTimeout(function () {
        $("#" + toAnimateColor).removeClass("pressed");
    }, 100);
}

// to start over the game if the user gets the pattern wrong (resets all variables to initial values)
function startOver() {

    // setting game pattern to empty array 
    gamePattern = [];

    // setting user clicked pattern to empty array
    // userClickedPattern = [];

    // setting level to 0
    level = 0

    // setting started variable to false (to restart the game) to re-apply keydown event listner
    started = false;
}

// curretLevel is the index of the last user clicked answer in the array
function checkAnswer(currentLevel) { 

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        // to check if a sequence is complete
        if(gamePattern.length === userClickedPattern.length) {
            console.log("sequence completed");

            // go to next level by calling nextSequence after 1000 miliseconds
            setTimeout(function(){
                // userClickedPattern = [];  // setting userClickedPattern as empty array for each next level
                nextSequence();
            }, 1000);
            
        }
    }
    else {
        console.log("wrong");

        // to play the wrong sound when the user clicks on wrong pattern
        var wrongSound = new Audio("./sounds/wrong.mp3");
        wrongSound.play();

        // changing body background when user gets wrong answer
        $("body").addClass("game-over");

        // removing the game-over effect after 200 miliseconds for bg flash animation
        setTimeout(function() {
            $("body").removeClass("game-over");
            // $("#level-title").text("Game Over. Press any key to restart");
        }, 200);

        // changing h1 to game-over text 
        $("#level-title").text("Game Over. Press Enter to restart")

        startOver();  // calls startover function to reset the initial values
    }
}

function nextSequence() {

    userClickedPattern = [];  // to reset user clicks in each new level or in game-(re)start

    level += 1; // level is increased everytime this function is called

    $("h1").text("Level: " + level); // level 1 is shown at the start of the game

    var randomNumber = Math.floor(Math.random() * 4); // generates random number between 0 and 3

    var randomChoosenColor = buttonColors[randomNumber]; // chooses random color from the buttonColors Array

    gamePattern.push(randomChoosenColor); // appends randomChoosenColor to the end of the array

    $("#" + randomChoosenColor)
        .fadeOut(150)
        .fadeIn(150); // select the button with the same id as the randomChosenColour and add flash animation to that button

    // plays audio for the button color selected
    playSound(randomChoosenColor);
    // var audio = new Audio("./sounds/" + randomChoosenColor + ".mp3");
    // audio.play();
}

// detecting when any of the buttons are clicked and triggering a handler function (event listner)

$(".btn").on("click", function () {
    var userChoosenColor = $(this).attr("id"); // gets the id attribute value of the object that got clicked
    // console.log(userChoosenColor);

    userClickedPattern.push(userChoosenColor); // appends the userChoosenColor (button) to the end of the array
    // console.log(userClickedPattern);

    playSound(userChoosenColor); // to play the corresponding sound of user choosen color

    animatePress(userChoosenColor); // adds and removes "pressed" class to the clicked button's css to animate it

    checkAnswer(userClickedPattern.length - 1);
});

// Detecting keyboard press to start the game i.e call nextSequence for the first time (keypress/keydown event listner)
$(document).on("keydown", function (event) {

    // keypress are only listned to start or restart the game
    if(event.key === "Enter" && !started) {
        $("#level-title").text("Level: " + level);

        nextSequence(); // inside here level is increased to 1 to start off from 1
        // console.log(event.key);

        // $(this).unbind();  // removes the current event listner on document after the nextSequence is called but we need to re-start the game after gameover
        started = true;
    }


// //     // console.log(event.key);
//     if (!started) {
//         $("#level-title").text("Level: " + level);

//         nextSequence(); // inside here level is increased to 1 to start off from 1
//         // console.log(event.key);

//         // $(this).unbind();  // removes the current event listner on document after the nextSequence is called but we need to re-start the game after gameover
//         started = true;
//     }
});
