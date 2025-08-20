let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

// START THE GAME ONLY ON THE FIRST KEYPRESS
$(document).keydown(() => {
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})




function nextSequence() {

    userClickedPattern=[];

    level++;
    $("#level-title").text("Level " + level);

    let ranNum = Math.floor(Math.random() * 4);
    let ranChosenColor = buttonColors[ranNum];
    gamePattern.push(ranChosenColor);

    $("#" + ranChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(ranChosenColor);

}

//USER BUTTON CLICK
$(".btn").on("click", (e) => {
    let userChosenColor = e.target.id;

    playSound(userChosenColor);
    animatePress(userChosenColor);

    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);

    checkAnswer(userClickedPattern.length - 1);
})

//FUNCTION FOR PLAYING SOUND
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//FUNCTION FOR BUTTON ANIMATION
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}


// CHECKS USER INPUT AGAINST GAME PATTERN AND HANDLES SUCCESS OR GAME OVER
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(()=>{
                nextSequence();
            },1000)
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },200)
        $("h1").text("Game Over,Press Any Key to Restart");
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




