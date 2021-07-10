const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let grid = 20;
let scale;
let food;

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Snake {
    constructor() {
        this.body = [];
        this.body[0] = new Vector(0, 0);
        this.direction = new Vector(0, 0);
    }

    update() {
        this.body[0].x += this.direction.x;
        this.body[0].y += this.direction.y;
    }

    eat(food) {
        let foodX = Math.floor(food.x);
        let foodY = Math.floor(food.y);
        let bodyX = Math.floor(this.body[0].x);
        let bodyY = Math.floor(this.body[0].y);
        if (foodX === bodyX && foodY === bodyY) {
            return true;
        }
        return false;
    }

    setDirection(x, y) {
        if (scale) {
            this.direction.x = x;
            this.direction.y = y;
        }
    }

    draw() {
        c.beginPath();
        c.rect(part.x, part.y, scale, scale);
        c.fillStyle = 'yellow';
        c.fill();
    }
}

function drawFood() {
    c.beginPath();
    c.rect(food.x, food.y, scale, scale);
    c.fillStyle = 'red';
    c.fill();
}

function init() {
    if (window.innerHeight > window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth;
        scale = window.innerWidth / grid;
    } else if (window.innerHeight < window.innerWidth) {
        canvas.width = window.innerHeight;
        canvas.height = window.innerHeight;
        scale = window.innerHeight / grid;
    }
    food = new Vector(scale * (Math.floor(Math.random() * grid)), scale * (Math.floor(Math.random() * grid)));
    animate();
}

let snake = new Snake();

function animate() {
    setTimeout(function onTick() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        if (snake.eat(food)) {
            food.x = scale * (Math.floor(Math.random() * grid));
            food.y = scale * (Math.floor(Math.random() * grid));
        }
        snake.update();
        snake.draw();
        drawFood();
    }, 300)
}

init();

function keyToggle(key) {
    if (key === "ArrowLeft" || key === "a" || key === "A") {
        snake.setDirection(-scale, 0);
    }
    if (key === "ArrowRight" || key === "d" || key === "D") {
        snake.setDirection(scale, 0);
    }
    if (key === "ArrowUp" || key === "w" || key === "W") {
        snake.setDirection(0, -scale);
    }
    if (key === "ArrowDown" || key === "s" || key === "S") {
        snake.setDirection(0, scale);
    }
}

document.onkeydown = function (e) {
    keyToggle(e.key);
};
