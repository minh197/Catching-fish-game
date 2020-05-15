/*
  Code modified from:
  http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
  using graphics purchased from vectorstock.com
*/

/* Initialization.
Here, we create and add our "canvas" to the page.
We also load all of our images. 
*/


let canvas;
let ctx;
let myscore= 0;

let visiblescore=0;
let myscoreArray=[];


canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
// canvas.width = 800;
// canvas.height = 600;
// document.body.appendChild(canvas);

let bgReady, catReady, asteroidReady;
let bgImage, catImage, asteroidImage;


let startTime = Date.now();
const SECONDS_PER_ROUND = 3;
let elapsedTime = 0;
let asteroidDirectionX = 1;
let asteroidDirectionY = 1;

let highscore=localStorage.getItem('myscore');
// let myrecentscore=JSON.parse(localStorage.getItem(`myscoreArray`))
// if(!myrecentscore){
//   myrecentscore=[];

// }
// console.log(myrecentscore);

let isGameOver = true;

function loadImages() {
  bgImage = new Image();
  bgImage.onload = function () {
    // show the background image
    bgReady = true;
  };
  bgImage.src = "images/yuri.jpg";
  catImage = new Image();
  catImage.onload = function () {
    // show the hero image
    catReady = true;
  };
  catImage.src = "images/angrykitty.png";

  asteroidImage = new Image();
  asteroidImage.onload = function () {
    // show the monster image
    asteroidReady = true;
  };
  asteroidImage.src = "images/fish.png";
  




  meteorImage = new Image();
  meteorImage.onload = function () {
    // show the asteroid image
    meteorReady = true;
  };
  meteorImage.src = "images/asteroid.png";


  isGameOver = false
}

/** 
 * Setting up our characters.
 * 
 * Note that heroX represents the X position of our hero.
 * heroY represents the Y position.
 * We'll need these values to know where to "draw" the hero.
 * 
 * The same applies to the monster.
 */

let catX = canvas.width / 2;
let catY = canvas.height / 2;

let asteroidX = Math.round(Math.random() * (canvas.width - 64));
let asteroidY = Math.round(Math.random() * (canvas.height - 64));




/** 
 * Keyboard Listeners
 * You can safely ignore this part, for now. 
 * 
 * This is just to let JavaScript know when the user has pressed a key.
*/
let keysDown = {};
function setupKeyboardListeners() {
  // Check for keys pressed where key represents the keycode captured
  // For now, do not worry too much about what's happening here. 
  addEventListener("keydown", function (key) {
    keysDown[key.keyCode] = true;
  }, false);

  addEventListener("keyup", function (key) {
    delete keysDown[key.keyCode];
  }, false);
}


/**
 *  Update game objects - change player position based on key pressed
 *  and check to see if the monster has been caught!
 *  
 *  If you change the value of 5, the player will move at a different rate.
 */

let update = function () {
  // Update the time.
  if(isGameOver){
    return;
  }
  
  if((SECONDS_PER_ROUND-elapsedTime)<=0){
    // console.log("Im here")
    isGameOver =true;
    return;
  }
  elapsedTime = Math.floor((Date.now() - startTime) / 1000);

  if (38 in keysDown) { // Player is holding up key
    catY -= 5;
  }
  if (40 in keysDown) { // Player is holding down key
    catY += 5;
  }
  if (37 in keysDown) { // Player is holding left key
    catX -= 5;
  }
  if (39 in keysDown) { // Player is holding right key
    catX += 5;
  }

  if (catX > canvas.width - 64) {
    catX -= canvas.width;
  } else if (catX < 0) {
    catX += canvas.width;
  }

  if (catY > canvas.height - 64) {
    catY -= canvas.height;
  } else if (catY < 0) {
    catY += canvas.height;
  }


   //fish bounces back
   asteroidX += asteroidDirectionX * 2;
   asteroidY += asteroidDirectionY * 2;

   
  if(asteroidX<0){
    asteroidDirectionX=-asteroidDirectionX
   

  }else if(asteroidX>=canvas.width-64 ){
    asteroidDirectionX=-asteroidDirectionX
    
  }
  if(asteroidY<0){
    asteroidDirectionY=-asteroidDirectionY
    

  }else if(asteroidY>=canvas.height-64){
    asteroidDirectionY=-asteroidDirectionY
  }




  // //asteroids bounces back
  // monsterX += monsterDirectionX * 2;
  // monsterY += monsterDirectionY * 2;

  // Check if player and monster collided. Our images
  // are about 32 pixels big.
  if (
    
    //  let myscore=number;
    catX <= (asteroidX + 60)
    && asteroidX <= (catX + 60)
    && catY <= (asteroidY + 60)
    && asteroidY <= (catY + 60)
    

  ) {
    
    myscore++;
    
    visiblescore++;
    
    console.log(myrecentscore)
    

    //High score && high round
    if (highscore < visiblescore) {
      highscore = visiblescore;
      console.log(highscore);
      localStorage.setItem('myscore', highscore);
      // highRound = Math.floor(highcore / 3)
    }
    document.getElementById("highscore").innerHTML=(`High Score: ${highscore}`)
    
    document.getElementById("score").innerHTML=`Your score: ${myscore}`
   
    console.log(myscore);
    // Pick a new location for the monster.
    // Note: Change this to place the monster at a new, random location.
    asteroidX = Math.floor(Math.random()*canvas.width)
    asteroidY = Math.floor(Math.random()*canvas.height)
   
   
  }
  // console.log(myscore)
  
};

/**
 * This function, render, runs as often as possible.
 */
var render = function () {
  if (bgReady) {
    ctx.drawImage(bgImage, 0, 0);
  }
  if (catReady) {
    ctx.drawImage(catImage, catX, catY);
  }
  if (asteroidReady) {
    ctx.drawImage(asteroidImage, asteroidX, asteroidY);
  }
  // if (meteorReady) {
  //   ctx.drawImage(meteorImage, meteorX, meteorY);
  // }
  if(SECONDS_PER_ROUND-elapsedTime == 0){
    endGame();
  }else{
    document.getElementById("time").innerHTML= `Seconds Remaining: ${SECONDS_PER_ROUND-elapsedTime}`

  }

    // ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND-elapsedTime}`, 20,20);
   
   
  }
  
  // ctx.fillText(`Your score: ${myscore}`, 50, 200);
  
  


/**
 * The main game loop. Most every game will have two distinct parts:
 * update (updates the state of the game, in this case our hero and monster)
 * render (based on the state of our game, draw the right things)
 */
var main = function () {
  update(); 
  render();
  // Request to do this again ASAP. This is a special method
  // for web browsers. 
  requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame.
// Safely ignore this line. It's mostly here for people with old web browsers.
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
loadImages();
setupKeyboardListeners();
main();

function endGame(){
  // ctx.fillText(`Seconds Remaining: ${SECONDS_PER_ROUND - elapsedTime}`, 20, 20);
  document.getElementById("time").innerHTML= `Seconds Remaining: ${SECONDS_PER_ROUND-elapsedTime}`
  document.getElementById("gameover").innerHTML = `Game Over! Click reset to start a new game`
  myrecentscore.push(myscore);
  console.log(myscoreArray)
  localStorage.setItem('myscoreArray', JSON.stringify(myrecentscore));
  document.getElementById("lastscores").innerHTML=`You last scores: ${myrecentscore}`

}

function submitName(){
  playerName= document.getElementById("nameinput").value;
  document.getElementById("nameinput").value=''
  console.log(playerName);
  document.getElementById("username").innerHTML=`Hi ${playerName}! We're in this together!`
 

}

function reset(){
  loadImages();
  let catX = canvas.width / 2;
  let catY = canvas.height / 2;

  let asteroidX = Math.abs(Math.floor(Math.random()*canvas.width-64))
  let asteroidY = Math.abs(Math.floor(Math.random()*canvas.height-64))
  isGameOver=false;
  myscore=0;
  document.getElementById("score").innerHTML=`Your score: ${myscore}`
  elapsedTime = 0;
   startTime = Date.now();
  //  SECONDS_PER_ROUND = 20;
  document.getElementById("time").innerHTML= `Seconds Remaining: ${SECONDS_PER_ROUND-elapsedTime}`
  playerName= document.getElementById("nameinput").value;
  document.getElementById("username").innerHTML=''
  
  
 

}
