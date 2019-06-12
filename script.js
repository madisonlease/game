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
var intervalTime=10;
var intervalID;
var initialBricks=[];
var updatedBricks=[];
var score=0;

//y values of each column
var y1=150;
var y2=150;
var y3=150;
var y4=150;
var y5=150;
var y6=150;
var y7=150;
var y8=150;
var y9=150;
var y10=150;

//index of brick array for each column
var index1=4;
var index2=9;
var index3=14;
var index4=19;
var index5=24;
var index6=29;
var index7=34;
var index8=39;
var index9=44;
var index10=49;


//bricks
var brick1a = new Brick(0,0,false);
var brick1b = new Brick(0,30,false);
var brick1c = new Brick(0,60,false);
var brick1d = new Brick(0,90,false);
var brick1e = new Brick(0,120,false);
var brick2a = new Brick(100,0,false);
var brick2b = new Brick(100,30,false);
var brick2c = new Brick(100,60,false);
var brick2d = new Brick(100,90,false);
var brick2e = new Brick(100,120,false);
var brick3a = new Brick(200,0,false);
var brick3b = new Brick(200,30,false);
var brick3c = new Brick(200,60,false);
var brick3d = new Brick(200,90,false);
var brick3e = new Brick(200,120,false);
var brick4a = new Brick(300,0,false);
var brick4b = new Brick(300,30,false);
var brick4c = new Brick(300,60,false);
var brick4d = new Brick(300,90,false);
var brick4e = new Brick(300,120,false);
var brick5a = new Brick(400,0,false);
var brick5b = new Brick(400,30,false);
var brick5c = new Brick(400,60,false);
var brick5d = new Brick(400,90,false);
var brick5e = new Brick(400,120,false);
var brick6a = new Brick(500,0,false);
var brick6b = new Brick(500,30,false);
var brick6c = new Brick(500,60,false);
var brick6d = new Brick(500,90,false);
var brick6e = new Brick(500,120,false);
var brick7a = new Brick(600,0,false);
var brick7b = new Brick(600,30,false);
var brick7c = new Brick(600,60,false);
var brick7d = new Brick(600,90,false);
var brick7e = new Brick(600,120,false);
var brick8a = new Brick(700,0,false);
var brick8b = new Brick(700,30,false);
var brick8c = new Brick(700,60,false);
var brick8d = new Brick(700,90,false);
var brick8e = new Brick(700,120,false);
var brick9a = new Brick(800,0,false);
var brick9b = new Brick(800,30,false);
var brick9c = new Brick(800,60,false);
var brick9d = new Brick(800,90,false);
var brick9e = new Brick(800,120,false);
var brick10a = new Brick(900,0,false);
var brick10b = new Brick(900,30,false);
var brick10c = new Brick(900,60,false);
var brick10d = new Brick(900,90,false);
var brick10e = new Brick(900,120,false);

// var firstBlock=150;

function startGame(){
    pushInitialBricks();
    pushUpdatedBricks();
    updatePieces();
    drawBricks();
    score=0;
    intervalID= setInterval(updateCanvas, intervalTime);
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
    pushUpdatedBricks();
    drawBricks();
    updatePieces();
    if (key && key==37 && platformX>3){movePlatformLeft()}
    if (key && key==39 && platformX<927){movePlatformRight()}
    if (key && key==32){pausePlay()}
    document.getElementById("score").innerHTML=score;
}

// var colors=["rgba(250, 43, 226, 0.18)", "rgba(230, 34, 237, 0.34)", "rgba(209, 3, 182, 0.52)", "rgba(255, 92, 220, 0.72)", "rgba(255, 149, 248, 0.63)" ];
var colors=["pink"];


function updatePieces(){


    platform=new Platform(platformX, platformY, 70, 15);
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

    // hits 1st column
    if (((ballY-10)+ballYSpeed < y1) && ((ballX-10)+ballXSpeed <=100)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y1-=30;
        initialBricks[index1].broken=true;
        index1-=1;
    }

    // hits 2nd column
    if (((ballY-10)+ballYSpeed < y2) && ((ballX-10)+ballXSpeed >=100) && ((ballX-10)+ballXSpeed <=200)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y2-=30;
        initialBricks[index2].broken=true;
        index2-=1;
    }

    // hits 3rd column
    if (((ballY-10)+ballYSpeed < y3) && ((ballX-10)+ballXSpeed >=200) && ((ballX-10)+ballXSpeed <=300)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y3-=30;
        initialBricks[index3].broken=true;
        index3-=1;
    }

    // hits 4th column
    if (((ballY-10)+ballYSpeed < y4) && ((ballX-10)+ballXSpeed >=300) && ((ballX-10)+ballXSpeed <=400)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y4-=30;
        initialBricks[index4].broken=true;
        index4-=1;
    }

    // hits 5th column
    if (((ballY-10)+ballYSpeed < y5) && ((ballX-10)+ballXSpeed >=400) && ((ballX-10)+ballXSpeed <=500)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y5-=30;
        initialBricks[index5].broken=true;
        index5-=1;
    }

    // hits 6th column
    if (((ballY-10)+ballYSpeed < y6) && ((ballX-10)+ballXSpeed >=500) && ((ballX-10)+ballXSpeed <=600)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y6-=30;
        initialBricks[index6].broken=true;
        index6-=1;
    }

    // hits 7th column
    if (((ballY-10)+ballYSpeed < y7) && ((ballX-10)+ballXSpeed >=600) && ((ballX-10)+ballXSpeed <=700)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y7-=30;
        initialBricks[index7].broken=true;
        index7-=1;
    }

    // hits 8th column
    if (((ballY-10)+ballYSpeed < y8) && ((ballX-10)+ballXSpeed >=700) && ((ballX-10)+ballXSpeed <=800)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y8-=30;
        initialBricks[index8].broken=true;
        index8-=1;
    }

    // hits 9th column
    if (((ballY-10)+ballYSpeed < y9) && ((ballX-10)+ballXSpeed >=800) && ((ballX-10)+ballXSpeed <=900)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y9-=30;
        initialBricks[index9].broken=true;
        index9-=1;
    }

    // hits 10th column
    if (((ballY-10)+ballYSpeed < y10) && ((ballX-10)+ballXSpeed >=900) && ((ballX-10)+ballXSpeed <=1000)){
        score ++;
        ballYSpeed=-ballYSpeed;
        y10-=30;
        initialBricks[index10].broken=true;
        index10-=1;
    }

    ballX+=ballXSpeed;
    ballY+=ballYSpeed;

}

function drawBricks(){
    canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    for (var i=0; i<updatedBricks.length; i++){
        ctx.fillStyle = "pink";
        ctx.fillRect(updatedBricks[i].x, updatedBricks[i].y, 100, 30);
        ctx.strokeStyle = "white";
        ctx.strokeRect(updatedBricks[i].x, updatedBricks[i].y, 100, 30);
    }
}

function pushInitialBricks(){
    initialBricks.push(brick1a);
    initialBricks.push(brick1b);
    initialBricks.push(brick1c);
    initialBricks.push(brick1d);
    initialBricks.push(brick1e);
    initialBricks.push(brick2a);
    initialBricks.push(brick2b);
    initialBricks.push(brick2c);
    initialBricks.push(brick2d);
    initialBricks.push(brick2e);
    initialBricks.push(brick3a);
    initialBricks.push(brick3b);
    initialBricks.push(brick3c);
    initialBricks.push(brick3d);
    initialBricks.push(brick3e);
    initialBricks.push(brick4a);
    initialBricks.push(brick4b);
    initialBricks.push(brick4c);
    initialBricks.push(brick4d);
    initialBricks.push(brick4e);
    initialBricks.push(brick5a);
    initialBricks.push(brick5b);
    initialBricks.push(brick5c);
    initialBricks.push(brick5d);
    initialBricks.push(brick5e);
    initialBricks.push(brick6a);
    initialBricks.push(brick6b);
    initialBricks.push(brick6c);
    initialBricks.push(brick6d);
    initialBricks.push(brick6e);
    initialBricks.push(brick7a);
    initialBricks.push(brick7b);
    initialBricks.push(brick7c);
    initialBricks.push(brick7d);
    initialBricks.push(brick7e);
    initialBricks.push(brick8a);
    initialBricks.push(brick8b);
    initialBricks.push(brick8c);
    initialBricks.push(brick8d);
    initialBricks.push(brick8e);
    initialBricks.push(brick9a);
    initialBricks.push(brick9b);
    initialBricks.push(brick9c);
    initialBricks.push(brick9d);
    initialBricks.push(brick9e);
    initialBricks.push(brick10a);
    initialBricks.push(brick10b);
    initialBricks.push(brick10c);
    initialBricks.push(brick10d);
    initialBricks.push(brick10e);
}

function pushUpdatedBricks(){
    updatedBricks=[];

    for (var i=0; i<initialBricks.length; i++){
        if (initialBricks[i].broken==false){
            updatedBricks.push(initialBricks[i]);
        }
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

function Brick(x, y, broken) {
    this.x=x;
    this.y=y;
    this.broken=broken;
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

function reloadBricks(){
    for (var i=0; i<initialBricks.length; i++){
        initialBricks[i].broken=false;
    }

    y1=150;
    y2=150;
    y3=150;
    y4=150;
    y5=150;
    y6=150;
    y7=150;
    y8=150;
    y9=150;
    y10=150;

    index1=4;
    index2=9;
    index3=14;
    index4=19;
    index5=24;
    index6=29;
    index7=34;
    index8=39;
    index9=44;
    index10=49;
}

function newGame(){
    platformX=10;
    platformY=570;
    ballX=10;
    ballY=300;
    ballXSpeed=3;
    ballYSpeed=-3;
    reloadBricks();
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
    ctx.font= "30px Arial";
    ctx.fillStyle= "rgba(111, 111, 111, 0.71)";
    ctx.textAlign= "center";
    ctx.fillText("Score: "+score, 500, 360);
    ctx.font= "20px Arial";
    ctx.fillStyle= "rgba(111, 111, 111, 0.71)";
    ctx.textAlign= "center";
    ctx.fillText("Click 'NEW GAME' or Command R to Play Again!", 500, 385);
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
