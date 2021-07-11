const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let canvasSize = 500;
let grid = 20;
let scale;
let food;

class Background {
    constructor(light, dark) {
        this.light = light;
        this.dark = dark;
    }

    draw() {
        let color = 0;
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                if ((i + j) % 2 === 0) {
                    c.fillStyle = this.light;
                } else {
                    c.fillStyle = this.dark;
                }
                c.fillRect(i * scale, j * scale, scale, scale);
                color++;
            }
        }
    }
}

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
        for (let part of this.body) {
            c.beginPath();
            c.rect(part.x, part.y, scale, scale);
            c.fillStyle = 'yellow';
            c.fill();
        }
    }
}

let background = new Background('#401457', '#311340');
let snake = new Snake();

function drawFood() {
    c.beginPath();
    c.rect(food.x, food.y, scale, scale);
    c.fillStyle = 'red';
    c.fill();
}

function init() {
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    scale = canvasSize / grid;
    food = new Vector(scale * (Math.floor(Math.random() * grid)), scale * (Math.floor(Math.random() * grid)));
    animate();
}

function animate() {
    setTimeout(function onTick() {
        requestAnimationFrame(animate);
        c.clearRect(0, 0, canvas.width, canvas.height);
        if (snake.eat(food)) {
            food.x = scale * (Math.floor(Math.random() * grid));
            food.y = scale * (Math.floor(Math.random() * grid));
        }
        background.draw();
        snake.update();
        snake.draw();
        drawFood();
    }, 300)
}

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

init();
