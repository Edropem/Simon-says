var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gamePattern = [];
var started = false;
var level = 0;

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currrentColor) {
    $("#" + currrentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currrentColor).removeClass("pressed");
    },100);
};

function nextSequence(){
    var randomNumber;
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    console.log(randomChosenColor);
    animatePress(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    level ++;
    $("h1").text("Level "+ level);
    userClickedPattern = [];
};

$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    $("#" + userChosenColor).fadeOut(100).fadeIn(100);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    } else {
        playSound("wrong");
        console.log("wrong");
        $("body").addClass("game-over");
            setTimeout(function(){
            $("body").removeClass("game-over")}, 200);
        $("h1").text("Game over. Press Any Key To Start");
        startOver();     
    }
}

$(document).keydown(function(){
    if (started == false){
        started = true;
        nextSequence();
    }
});

function startOver(){
    gamePattern = [];
    level = 0;
    started = false;
}