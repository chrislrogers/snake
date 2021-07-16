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
    constructor(x, y, headColor, color) {
        this.body = [];
        this.body[0] = new Vector(x, y);
        this.direction = new Vector(0, 0);
        this.color = color;
        this.headColor = headColor;
    }

    update() {
        let head = this.body[this.body.length - 1];
        if (this.body.length > tail) {
            this.body.shift();
        }
        head.x += this.direction.x;
        head.y += this.direction.y;
        this.body.push(new Vector(head.x, head.y));
    }

    eat(food) {
        let foodX = Math.floor(food.x);
        let foodY = Math.floor(food.y);
        let bodyX = Math.floor(this.body[this.body.length - 1].x);
        let bodyY = Math.floor(this.body[this.body.length - 1].y);
        if (foodX === bodyX && foodY === bodyY) {
            tail++;
            return true;
        }
        return false;
    }

    die() {
        let head = this.body[this.body.length - 1];
        if (head.x > canvas.width - 1 || head.x < 0 || head.y > canvas.height - 1 || head.y < 0) {
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
            if (part === this.body[this.body.length - 1]) {
                c.fillStyle = this.headColor;
            } else {
                c.fillStyle = this.color;
            }
            c.fill();
        }
    }
}

let background = new Background('#401457', '#311340');
let gameover = new Background('red', 'red');
let snake = new Snake(250, 250, 'yellow', 'yellow');

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
        if (!snake.die()) {
            c.clearRect(0, 0, canvas.width, canvas.height);
            if (snake.eat(food)) {
                food.x = scale * (Math.floor(Math.random() * grid));
                food.y = scale * (Math.floor(Math.random() * grid));
            }
            background.draw();
            snake.update();
            snake.draw();
            drawFood();
        } else { gameover.draw(); }
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
