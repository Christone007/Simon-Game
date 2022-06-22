let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let gameStarted = false;
let level = 0;

function nextSequence(){
  let randomNumber = Math.floor(Math.random()*4);

  let randomChosenColour = buttonColours[randomNumber];
  playSound(randomChosenColour);

  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  userClickedPattern=[];
  level++;

  $('h1').text("Level "+level);
}

$(".btn").click(function(){
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  let colourSound = new Audio("sounds/"+name+".mp3");
  colourSound.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
  $("#"+currentColour).removeClass("pressed")
}, 100);
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length===userClickedPattern.length){
      console.log("Pattern Completed!");

      setTimeout(function(){
        nextSequence();
      }, 1000);
    }
  } else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver(){
  gamePattern = [];
  userClickedPattern = [];
  gameStarted = false;
  level = 0;
}

$(document).keydown(function(){
  if(!gameStarted){
    gameStarted = true;
    $('h1').text("Level 0");
    console.log("pressed a ky");
    nextSequence();
  }
else{
  console.log("game already started");
}
})
