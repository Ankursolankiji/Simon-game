var gamePattern = [];
var userClickedPattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;
$(document).keypress(function () {
    if(!started){
        
        $("h1").text("Level " +level );
        nextSequence();
        started = true; 
    }

    
  } 

);


$(".btn").click(function () {
   
  var userChosenColour = $(this).attr("id");

  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});
 function checkAnswer(currenLevel){
if (gamePattern[currenLevel] === userClickedPattern[currenLevel]){
    console.log("SUCCES");
   if( userClickedPattern.length === gamePattern.length) {
    setTimeout(function () {
        nextSequence();
      }, 1000);
   }
} else {

   $("body").addClass("game-over");
   $("h1").text("Game Over, Press Any Key to Restart");
   var audio = new Audio("sounds/wrong.mp3")
   setTimeout(function () {
    $("body").removeClass("game-over");
    startOver();
  }, 200);
  }
}
function startOver(){
    level = 0;
    gamePattern =[];
    started = false;
}
function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " +level );

  var randomNumber = Math.round(Math.random() * 4);
  var randomChosenColor = buttonColours[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
