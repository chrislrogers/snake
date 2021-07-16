const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let canvasSize = 500;
let grid = 20;
let scale;
let food;
let tail = 3;

class Background {
    constructor(light, dark) {
        this.light = light;
        this.dark = dark;
    }

    draw() {
        for (let i = 0; i < grid; i++) {
            for (let j = 0; j < grid; j++) {
                if ((i + j) % 2 === 0) {
                    c.fillStyle = this.light;
                } else {
                    c.fillStyle = this.dark;
                }
                c.fillRect(i * scale, j * scale, scale, scale);
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
        let head = this.body[this.body.length - 1];
        head.x += this.direction.x;
        head.y += this.direction.y;
        if (this.body.length > tail) {
            this.body.shift();
        }
        this.body.push(new Vector(head.x, head.y));
    }

    eat(food) {
        let foodX = Math.floor(food.x);
        let foodY = Math.floor(food.y);
        let bodyX = Math.floor(this.body[this.body.length-1].x);
        let bodyY = Math.floor(this.body[this.body.length-1].y);
        if (foodX === bodyX && foodY === bodyY) {
            this.body.push(new Vector(bodyX, bodyY));
            return true;
        }
        return false;
    }

    move(x, y) {
        this.direction.x = x;
        this.direction.y = y;
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
    }, 200)
}

function keyToggle(key) {
    if (key === "ArrowLeft" || key === "a" || key === "A") {
        snake.move(-scale, 0);
    }
    if (key === "ArrowRight" || key === "d" || key === "D") {
        snake.move(scale, 0);
    }
    if (key === "ArrowUp" || key === "w" || key === "W") {
        snake.move(0, -scale);
    }
    if (key === "ArrowDown" || key === "s" || key === "S") {
        snake.move(0, scale);
    }
}

document.onkeydown = function (e) {
    keyToggle(e.key);
};

init();
