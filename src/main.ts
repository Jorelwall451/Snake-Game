import "./style.css";

interface ISnakeBody { 
    x: number;
    y: number;
}

const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 400;
canvas.height = 400;

const blockSize: number = 20;
const rows: number = 20;
const cols: number = 20;
const fps: number = 1000/8;
let gameOver: boolean = false;

let snakeX: number = blockSize * 10;
let snakeY: number = blockSize * 10;

let snakeBody: ISnakeBody[] = [];

let velocityX: number = 0;
let velocityY: number = 0;

let foodX: number = placeFood().x;
let foodY: number = placeFood().y;

document.addEventListener("keydown", changeDirection);

function gameLoop(){
    if(gameOver){
        alert("Game Over");
        gameOver = false;

        snakeX = blockSize * 9;
        snakeY = blockSize * 9;

        snakeBody = [];

        velocityX = 0;
        velocityY = 0;

        foodX = placeFood().x;
        foodY = placeFood().y;
        return;
    }

    ctx.fillStyle = "#1b1b1b";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for(let i: number = 0; i < rows; i++){
        for(let j: number = 0; j < cols; j++){
            ctx.strokeStyle = "#5f5f5f";
            ctx.strokeRect(i * blockSize, j * blockSize, blockSize, blockSize);
        }
    }

    ctx.fillStyle = "#E53E3E";
    ctx.fillRect(foodX, foodY, blockSize, blockSize);

    if(snakeX === foodX && snakeY === foodY){
        snakeBody.push({
            x: foodX,
            y: foodY
        });
        
        foodX = placeFood().x;
        foodY = placeFood().y;
    }

    for(let i: number = snakeBody.length - 1; i > 0; i--){ 
        snakeBody[i] = snakeBody[i-1];
    }

    if(snakeBody.length){ 
        snakeBody[0] = {
            x: snakeX,
            y: snakeY
        }
    }

    ctx.fillStyle = "#38A169";

    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;

    ctx.fillRect(snakeX, snakeY, blockSize, blockSize);
    snakeBody.forEach(value => { 
        ctx.fillRect(value.x, value.y, blockSize, blockSize);
    });

    if(snakeX < 0 || snakeX > rows * blockSize || snakeY < 0 || snakeY > cols * blockSize){
        gameOver = true;
    }

    for(let i: number = 0; i < snakeBody.length; i++){
        if(snakeX === snakeBody[i].x && snakeY === snakeBody[i].y){
            gameOver = true;
        }
    }
}

setInterval(gameLoop, fps);

function placeFood() { 
    const x: number = Math.floor(Math.random() * rows) * blockSize;
    const y: number = Math.floor(Math.random() * cols) * blockSize;

    return { 
        x,
        y
    }
}

function changeDirection(event: KeyboardEvent){ 
    const key: string = event.key;

    if(key === "ArrowUp" && velocityY !== 1){
        velocityX = 0;
        velocityY = -1;
    }else if(key === "ArrowDown" && velocityY !== -1){
        velocityX = 0;
        velocityY = 1;
    }else if(key === "ArrowLeft" && velocityX !== 1){
        velocityX = -1;
        velocityY = 0;
    }else if(key === "ArrowRight" && velocityX !== -1){
        velocityX = 1;
        velocityY = 0;
    }
}