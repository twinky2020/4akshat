var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Creating Global variables
var track, trackImg;

var mq, mqImg;

var coin, coinImg;

var obstacle, obstacleImg;

var score;

var coinSound, obstacleSound;

function preload(){
  
  //Loading Images
  
  trackImg = loadImage("raceTrack.png");
  
  mqImg = loadImage("mcqueen.png");
  
  coinImg = loadImage("coin.png");
  
  obstacleImg = loadImage("stone.png");
  
  coinSound = loadSound("checkPoint.mp3");
  
  obstacleSound = loadSound("die.mp3");
  
}

function setup(){
  
  //Creating Canvas
  createCanvas(500,700)
  
  //Creating the Road
  track = createSprite(250,50);
  track.addImage(trackImg);
  track.velocityY = -15;
  track.scale = 3;
  
  //Creating the Player(McQueen)
  mq = createSprite(257,100,250,250);
  mq.addImage(mqImg);
  mq.scale = 0.3;
  
  coinGroup = new Group();
  obstacleGroup = new Group();
  
  mq.setCollider("rectangle",0,0,250,450);
  mq.debug = false;
 
  score = 0;
}

function draw(){
  
  background("pink")
  
  if(gameState === PLAY){
   //Making the Road go On and On 
  if(track.y < 0){
      track.y = track.width/2;
  }
  
  //Move Player with Right Arrow Key
  if(keyDown("right_arrow")){
    mq.x = mq.x + 7;  
  }  
  
  //Move Player with Left Arrow Key
  if(keyDown("left_arrow")){
    mq.x = mq.x + -7;  
  }
  
  if(mq.isTouching(coinGroup)){
    coinGroup.destroyEach();
    coinSound.play();
    score = score + 1;
  }  
   
  spawnCoins();
  spawnObstacles();
    
  }
  
    if(mq.isTouching(obstacleGroup)){
    coinGroup.destroyEach();
    obstacleGroup.destroyEach();
    track.velocityX = 0;
    gameState = END  
    obstacleSound.play();
  }    
  else if(gameState === END){
    
    score = 0;

    stroke("black");
    fill("red");
    textSize(50);
    text("GAME OVER",110,345);
    
    
  } 
  drawSprites();
  
  stroke("black");
  fill("white");
  textSize(15);
  text("Score: "+ score, 100,50);
} 

function spawnCoins(){
  
  if (frameCount % 150 === 0){
      var coin = createSprite(300,545,10,10);

      coin.x = Math.round(random(250,500));
      coin.y = Math.round(random(250,500));  
      coin.addImage(coinImg);
      coin.scale = 0.1;
      coin.velocityY = -5;

      coin.lifetime = 250;

      coinGroup.add(coin);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(450,600,10,40);
    
    obstacle.x = Math.round(random(300,400));
    obstacle.y = Math.round(random(300,500));  
    obstacle.velocityY = -4;
    obstacle.addImage(obstacleImg);
            
    obstacle.scale = 0.2;
    obstacle.lifetime = 250;
    
    obstacleGroup.add(obstacle);
  }
}