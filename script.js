var ball;
var platform;
var canvas;
var key;
var platformX=10;
var platformY=570;
var ballX=10;
var ballY=300;
var ballXSpeed=3;
var ballYSpeed=-3;
var intervalID;

function startGame(){
    updatePieces();
    drawBricks();
    intervalID= setInterval(updateCanvas, 10);
    platform= new Platform(platformX, platformY, 70, 15);
    platform.update();
    ball= new Ball(ballX, ballY, 10);
    ball.update();

    document.getElementById("newGameButton").style.display= "none";

    window.addEventListener("keydown", function(e){
        key=e.keyCode;
    });
    window.addEventListener("keyup", function(e){
        key=false;
    });

}

function updateCanvas() {
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 1000, 600);
    drawBricks();
    updatePieces();
    if (key && key==37 && platformX>3){movePlatformLeft()}
    if (key && key==39 && platformX<927){movePlatformRight()}
    if (key && key==32){pausePlay()}
}

// var colors=["rgba(250, 43, 226, 0.18)", "rgba(230, 34, 237, 0.34)", "rgba(209, 3, 182, 0.52)", "rgba(255, 92, 220, 0.72)", "rgba(255, 149, 248, 0.63)" ];
var colors=["pink"];


function updatePieces(){


    platform= new Platform(platformX, platformY, 70, 15);
    platform.update();

    ball=new Ball(ballX, ballY, 10);
    ball.update();

    //hits right wall
    if ((ballX+10)+ballXSpeed > 1000){
        ballXSpeed=-ballXSpeed;
    }
    //hits left wall
    if ((ballX-10)+ballXSpeed < 0){
        ballXSpeed=-ballXSpeed;
    }
    //hits top wall
    if ((ballY-10)+ballYSpeed < 0){
        ballYSpeed=-ballYSpeed;
    }
    //hits bottom wall
    if (ballY+10+ballYSpeed >= 600){
        pausePlay();
        clearInterval(intervalID);
        youLost();
    }

    //hits platform
    if (((platformX) <= (ballX-10)+ballXSpeed) && ((ballX-10)+ballXSpeed <= (platformX+70)) && (ballY+ballYSpeed >= (platformY-7.5))){
        ballYSpeed=-ballYSpeed;
    }

    ballX+=ballXSpeed;
    ballY+=ballYSpeed;

}

function drawBricks(){
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    for (var i=0; i<=900; i+=100){
        ctx.fillStyle = "pink";
        ctx.fillRect(i, 0, 100, 30);
        ctx.strokeStyle = "white";
        ctx.strokeRect(i, 0, 100, 30);
    }
    for (var j=0; j<=900; j+=100){
        ctx.fillStyle = "pink";
        ctx.fillRect(j, 30, 100, 30);
        ctx.strokeStyle = "white";
        ctx.strokeRect(j, 30, 100, 30);
    }
    for (var k=0; k<=900; k+=100){
        ctx.fillStyle = "pink";
        ctx.fillRect(k, 60, 100, 30);
        ctx.strokeStyle = "white";
        ctx.strokeRect(k, 60, 100, 30);
    }
    for (var l=0; l<=900; l+=100){
        ctx.fillStyle = "pink";
        ctx.fillRect(l, 90, 100, 30);
        ctx.strokeStyle = "white";
        ctx.strokeRect(l, 90, 100, 30);
    }
    for (var m=0; m<=900; m+=100){
        ctx.fillStyle = "pink";
        ctx.fillRect(m, 120, 100, 30);
        ctx.strokeStyle = "white";
        ctx.strokeRect(m, 120, 100, 30);
    }
}

function Ball(x, y, radius) {
    this.x=x;
    this.y=y;

    this.update= function () {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, radius, 0, Math.PI * 2, true);
        ctx.fill();
    }

}

function Platform(x, y, length, width) {

    this.update= function () {
        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = "pink";
        ctx.fillRect(x, y, length, width);
        ctx.strokeStyle = "black";
        ctx.strokeRect(x, y, length, width);
    }

}

// function Brick(x, y){
//
//     this.update= function(){
//         var canvas = document.getElementById("canvas");
//         var ctx = canvas.getContext("2d");
//         ctx.fillStyle = "pink";
//         ctx.fillRect(x, y, 100, 30);
//         ctx.strokeStyle = "white";
//         ctx.strokeRect(x, y, 100, 30);
//         var remove = function() {
//             //make me die
//         }
//     }
//
// }

var positiveX;
var positiveY;

function pausePlay(){

    if(ballXSpeed==0){
        play();
    }else if(ballXSpeed>0 && ballYSpeed>0){
        positiveX=true;
        positiveY=true;
        ballXSpeed=0;
        ballYSpeed=0;
    }else if(ballXSpeed<0 && ballYSpeed<0){
        positiveX=false;
        positiveY=false;
        ballXSpeed=0;
        ballYSpeed=0;
    }else if(ballXSpeed>0 && ballYSpeed<0){
        positiveX=true;
        positiveY=false;
        ballXSpeed=0;
        ballYSpeed=0;
    }else{
        positiveX=false;
        positiveY=true;
        ballXSpeed=0;
        ballYSpeed=0;
    }

}

function play(){

    if (positiveX && positiveY){
        ballXSpeed=3;
        ballYSpeed=3;
    }else if (positiveX && !positiveY){
        ballXSpeed=3;
        ballYSpeed=-3;
    }else if (!positiveX && positiveY){
        ballXSpeed=-3;
        ballYSpeed=3;
    }else{
        ballXSpeed=-3;
        ballYSpeed=-3;
    }
}

function newGame(){
    platformX=10;
    platformY=570;
    ballX=10;
    ballY=300;
    ballXSpeed=3;
    ballYSpeed=-3;
    updateCanvas();
    startGame();
}

function youLost(){
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.font= "50px Arial";
    ctx.fillStyle= "rgba(111, 111, 111, 0.71)";
    ctx.textAlign= "center";
    ctx.fillText("YOU LOST :(", 500, 325);
    ctx.font= "20px Arial";
    ctx.fillStyle= "rgba(111, 111, 111, 0.71)";
    ctx.textAlign= "center";
    ctx.fillText("Click 'NEW GAME' or Command R to Play Again!", 500, 355);
    document.getElementById("newGameButton").style.display= "inline";
}


// function movePlatformUp(){
//     platformY-=20;
//     platform.update();
// }
// function movePlatformDown(){
//     platformY+=20;
//     platform.update();
// }
function movePlatformLeft(){
    platformX-=7;
    platform.update();
}
function movePlatformRight(){
    platformX+=7;
    platform.update();
}
