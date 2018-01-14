var canvas, ctx, w, h;
var mousePos;


var initialNumberOfBalls;
var globalSpeedMultiplier = 1;
var colorToEat = 'blue';
var wrongBallsEaten = 0;
var goodBallsEaten = 0;
var numberOfGoodBalls;

var player = {
  x:10,
  y:10, 
  width:20,
  height:20,
  color:'red'
};

var balls = [];


window.onload = init;

function init(){
  console.log("came to init");
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  w = canvas.width;
  h = canvas.height;
  console.log("Game is starting");
  startGame(10);
  console.log("Initializing mouseMove");
  canvas.addEventListener('mousemove', mouseMoved);
  mainLoop();
}

function startGame(nb){
  do{
    balls = createBalls(nb);
    initialNumberOfBalls = nb;
    numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
  }while(numberOfGoodBalls === 0);
  console.log("Game started");
  wrongBallsEaten = goodBallsEaten = 0;
}

function countNumberOfGoodBalls(balls, colorToEat){
  var nb = 0;

  balls.forEach(function(b){
      if(b.color === colorToEat)
        nb++;
  });

  return nb;
}

function changeNbBalls(nb){
  startGame(nb);
}

function changeColorToEat(color){
  colorToEat = color;
}

function changePlayerColor(color){
  player.color = color;
}

function changeBallSpeed(coef){
  globalSpeedMultiplier = coef;
}

function mouseMoved(evt){
  mousePos = getMousePos(canvas,evt);
}

function getMousePos(canvas, evt){
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function movePlayerWithMouse(){
  if(mousePos !== undefined){
    player.x = mousePos.x;
    player.y = mousePos.y;
  }
}

function mainLoop(){
  ctx.clearRect(0,0,w,h);
 
  drawFilledRectangle(player);
  drawBalls(balls);
  drawBallNumbers(balls);
  moveBalls(balls);
  movePlayerWithMouse();
  requestAnimationFrame(mainLoop);
}

function circleRectOverlap(x0, y0, w0, h0, cx, cy, r) {
  var testX=cx;
  var testY=cy;
  if (testX < x0) testX=x0;
  if (testX > (x0+w0)) testX=(x0+w0);
  if (testY < y0) testY=y0;
  if (testY > (y0+h0)) testY=(y0+h0);
  return (((cx-testX)*(cx-testX)+(cy-testY)*(cy-testY))< r*r);
}

function createBalls(n){
  var balls = [];
  
  for(var i = 0; i<n; i++){
    var ball = {
      x:w/2,
      y:h/2,
      radius:5 + 30 * Math.random(),
      color:getRandomColor(),
      speedX:-5 + 10 * Math.random(),
      speedY:-5 + 10 * Math.random()  
    };
    balls.push(ball);
  }
  return balls;
}

function getRandomColor(){
  var colors = ["black", "blue", "magenta", "green", "cyan", "yellow", "pink", "purple"];
  var random_index = Math.random() * (colors.length - 1);
  return colors[Math.round(random_index)];
}


function drawBallNumbers(balls) {
  ctx.save();
  ctx.font="20px Arial";
  
  if(balls.length === 0) {
    ctx.fillText("Game Over!", 20, 30);
  } else if(goodBallsEaten === numberOfGoodBalls) {
    ctx.fillText("You Win! Final score : " + (initialNumberOfBalls - wrongBallsEaten), 
                 20, 30);
  } else {
    ctx.fillText("Balls still alive: " + balls.length, 210, 30);
    ctx.fillText("Good Balls eaten: " + goodBallsEaten, 210, 50);
     ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 210, 70);
  }
  ctx.restore();
}

function drawBalls(balls){
  balls.forEach(function(ball){
    drawFilledCircle(ball);
  });
}


function moveBalls(balls){
  balls.forEach(function(ball, index){
    ball.x += ( ball.speedX * globalSpeedMultiplier);
    ball.y += ( ball.speedY * globalSpeedMultiplier);
    testCollisionWithWalls(ball);
    testCollisionWithPlayer(ball, index);
  });
}



function testCollisionWithPlayer(ball, index){
  if(circleRectOverlap(player.x, player.y, player.width, player.height, ball.x, ball.y, ball.radius)){
    if(ball.color === colorToEat){
      goodBallsEaten += 1;
    }
    else{
      wrongBallsEaten += 1;
    }
    balls.splice(index, 1);
  }
}



function testCollisionWithWalls(b){
  if((b.x + b.radius) > w ){
    b.speedX = -b.speedX;
    b.x = w - b.radius;
  }
  else if((b.x - b.radius) < 0){
    b.speedX = -b.speedX;
    b.x = b.radius;
  }
  
  if((b.y - b.radius) < 0){
    b.speedY = -b.speedY;
    b.Y = b.radius;
  }
  else if((b.y + b.radius) > h){
    b.speedY = -b.speedY;
    b.Y = h - b.radius;
  }
}



function drawFilledCircle(c){
  ctx.save();
    
  ctx.translate(c.x,c.y);
  ctx.fillStyle = c.color;
  ctx.beginPath();
  ctx.arc(0,0,c.radius,0,2*Math.PI);
  ctx.fill();
  
  ctx.restore();
}

function drawFilledRectangle(r){
  ctx.save();
  
  ctx.translate(r.x, r.y);
  ctx.fillStyle = r.color;
  ctx.fillRect(0,0,r.width,r.height);
  
  ctx.restore();
}