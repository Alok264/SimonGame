var gamepattern=[];
var colors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var started = false;
var again = true;
$(document).keydown("keydown", function(event){
    if(!started)
    {
        nextSequence();
        started = true;
    }
})

$(".btn").click(function(e){
    handler(this);
})

function handler(e)
{
    var userChooserColor = $(e).attr("id");
    animatePress(userChooserColor);
    userClickedPattern.push(userChooserColor);
    playSound(userChooserColor);
    var currentindex = userClickedPattern.length-1;
    checkAnswer(currentindex);
}
function checkAnswer(currentindex)
{
    if(userClickedPattern[currentindex]==gamepattern[currentindex])
    {
        console.log("success");
        if(userClickedPattern.length == gamepattern.length)
        {
            setTimeout(nextSequence, 1000);
        }
    }
    else
    {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        level = 0;
        gamepattern.length = 0;
        started = false;
    }
}
function nextSequence()
{
    userClickedPattern.length = 0;
    level++;
    $("h1").text("Level "+level);
    var sequence = Math.floor(Math.random()*4);
    var colorchooser = colors[sequence];
    gamepattern.push(colorchooser);
    $("#"+colorchooser).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorchooser);
}
function playSound(name)
{
    var y = "sounds/"+name+".mp3";
    var z = new Audio(y);
    z.play();
}
function animatePress(currentColor)
{
    $("."+currentColor).addClass("pressed");
        setTimeout(function(){
            $("."+currentColor).removeClass("pressed")
        }, 100);
}