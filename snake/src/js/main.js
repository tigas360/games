/**
 *  This game code was developed by Gabriela Pinheiro - Front-End Dev
 * 
 *  new features added by Tiago dos Santos:
 *      - game score point;
 *      - game life count;
 *      - 
 */


let canvas = document.getElementById("game-view");
let context = canvas.getContext("2d");
let box = 32;
let snake=[];
let score=0;
let ranking=0;
let life=3;
let gameStatus="title";

snake[0] = {
    x:8*box,
    y:8*box
}

food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let direction = "right";

function criarBG(){
    if(gameStatus == "title" || gameStatus == "playing"){
        context.fillStyle = "lightgreen";
    }else{
        context.fillStyle = "black";
    }
    context.fillRect(0,0,16*box,16*box);
}

function drawSnake(){
    snake.forEach((elem,index)=>{
        context.fillStyle = "green";
        context.fillRect(elem.x,elem.y,box,box);
    });
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x,food.y,box,box);
}

document.addEventListener("keydown",inputUpdate);
function inputUpdate(event){

    if(event.keyCode == 37){
        direction = "left";
    }
    if(event.keyCode == 39){
        direction = "right";
    }
    if(event.keyCode == 38){
        direction = "up";
    }
    if(event.keyCode == 40){
        direction = "down";
    }
    if(event.keyCode == 32 && (gameStatus == "title" || gameStatus == "gameover")){
        gameStatus = "playing";
        reset();
    }
}

function gameTitle(){
    let titleText = "Snake Game"
    let startText = "Press Space bar to start!!!";
    criarBG();
    context.font = "30px Arial";

    context.fillStyle = "Yellow"
    context.fillText(titleText,(512+context.measureText(titleText).width)/4,100);
    console.log(context.measureText(titleText).width);

    context.font = "18px Arial";
    context.fillStyle = "white";
    context.fillText(startText,(512+context.measureText(startText).width)/5,250);

}

function gameOver(){
    let titleText = "GAME OVER"
    let startText = "Press Space bar to try again!!!";
    let scoreText = "Your score : "
    criarBG();
    context.font = "30px Arial";

    context.fillStyle = "red"
    context.fillText(titleText,(512+context.measureText(titleText).width)/4,100);
    console.log(context.measureText(titleText).width);

    context.font = "18px Arial";
    context.fillStyle = "white";
    context.fillText(startText,(512+context.measureText(startText).width)/4.5,250);

    context.font = "20px Arial";
    context.fillStyle = "green";
    context.fillText(scoreText + score,(512+context.measureText(scoreText).width)/5.5,400);
}

function reset(){
    score = 0;
    life = 3;
    snake=[];
    snake[0] = {
        x:8*box,
        y:8*box
    };
}


function gamePlay(){
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0        && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0        && direction == "up") snake[0].y = 16 * box;

    // snake head has collided with the body
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            if(life <= 0){
                //clearInterval(game);
                gameStatus = "gameover";
                return;
            }else{
                life--;
                document.getElementById("game-life").innerText = "Life: " + life;
            }
        }
    }
    criarBG();
    drawSnake();
    drawFood();

    let playerX = snake[0].x;
    let playerY = snake[0].y;

    if(direction == "right") playerX += box;
    if(direction == "left") playerX -= box;
    if(direction == "down") playerY += box;
    if(direction == "up") playerY -= box;

    if(playerX != food.x || playerY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score ++; 
        document.getElementById("game-score").innerText = "Game Score: " + score;

        if(score > ranking){
            ranking = score;
            document.getElementById("game-rank").innerText = "Best Score: " + ranking;
            document.getElementById("game-rank").classList.remove("textBlink");
            document.getElementById("game-rank").classList.add("textBlink");
        }
    }

    let newHead = {
        x: playerX,
        y: playerY
    }

    snake.unshift(newHead);
}


function gameLoop(){
    if(gameStatus == "title"){
        gameTitle();
    }else
    if(gameStatus == "gameover"){
        gameOver();
    }else{
        gamePlay();
    }
}

document.getElementById("game-rank").innerText = "Best Score: " + ranking;
document.getElementById("game-life").innerText = "Life: " + life;
let game = setInterval(gameLoop,100);