var canvas, ctx, w, h;

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
  canvas = document.querySelector("#myCanvas");
  ctx = canvas.getContext('2d');
  w = canvas.width;
  h = canvas.height;
  
  balls = createBalls(10);
  mainLoop();
}

function mainLoop(){
  
  ctx.clearRect(0,0,w,h);
  
  drawFilledRectangle(player);
  
  drawBalls(balls);
  
  moveBalls(balls);

  requestAnimationFrame(mainLoop);
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


function drawBalls(balls){
  balls.forEach(function(ball){
    drawFilledCircle(ball);
  });
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


function moveBalls(balls){
  balls.forEach(function(ball){
    ball.x += ball.speedX;
    ball.y += ball.speedY;
    testCollisionWithWalls(ball);
  });
  
  
  
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