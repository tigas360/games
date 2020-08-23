
let canvas = document.getElementById("game-view");
let context = canvas.getContext("2d");
let box = 32;
let snake=[];
let score=0;
let life=3;

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
    context.fillStyle = "lightgreen";
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
        direction = "left"
    }
    if(event.keyCode == 39){
        direction = "right"
    }
    if(event.keyCode == 38){
        direction = "up"
    }
    if(event.keyCode == 40){
        direction = "down"
    }
}


function gameLoop(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0        && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0        && direction == "up") snake[0].y = 16 * box;

    // snake head has collided with the body
    for(i=1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            if(life <= 0){
                clearInterval(game);
                alert("Game Over :.(");
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
    }

    let newHead = {
        x: playerX,
        y: playerY
    }

    snake.unshift(newHead);
}


    document.getElementById("game-life").innerText = "Life: " + life;
    let game = setInterval(gameLoop,100);
