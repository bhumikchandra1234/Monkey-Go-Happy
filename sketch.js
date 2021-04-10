
var monkey,monkey_running;
var banana,bananaImage,obstacle,obstacleImage;
var FoodGroup,obstacleGroup;
var survivalTime;
var invisibleGround;
var score

function preload(){ 
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}

function setup() {
  survivalTime=0;
  score=0;
  
  monkey=createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running)
  monkey.scale=0.1
 
  
  ground=createSprite(400,350,900,10)
  ground.velocityX=-4
  ground.x=ground.width/2
  console.log(ground.x)
  
  invisibleGround=createSprite(400,350,1000,10)
  invisibleGround.visible=false;
  
  FoodGroup=new Group()
  obstacleGroup=new Group() 
  
}


function draw() {
   createCanvas(400,400);
   background(500); 
  
  text("survivalTime: "+ survivalTime, 200,50);
  text("score: "+ score, 200,70);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  survivalTime = survivalTime+1;
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup[0].destroy();
    score=score+1
  }
  
  if(monkey.isTouching(obstacleGroup)){
    text("Game Over ",200,200);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1)
    FoodGroup.setVelocityXEach(0)
    FoodGroup.setLifetimeEach(-1)
    survivalTime = 0;
    
  }
  
  if(keyDown("space")&& monkey.y >=150) {
        monkey.velocityY = -12;
    } 
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);
  bananaFood();
  stoneObstacle();
  drawSprites();
}

function bananaFood(){
  if (frameCount % 60 === 0){
    var banana = createSprite(600,200,10,40);
    banana.addImage(bananaImage)
    banana.scale=0.1
    banana.velocityX=-5;
    banana.lifetime=300
    monkey.depth=banana.depth+1
    FoodGroup.add(banana)
  }
}

function stoneObstacle(){
  if (frameCount % 60 === 0){
    obstacle = createSprite(400,325,50,50)
    obstacle.addImage(obstaceImage)
    obstacle.scale=0.1
    obstacle.velocityX=-5
    obstacle.lifetime=100
    obstacleGroup.add(obstacle)
  }
}

