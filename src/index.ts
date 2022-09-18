type SnakePart = {
    x: number,
    y: number
};

class Game {
    points: number;
    isOver: boolean;

    constructor(points: number, isOver: boolean) {
      this.points = points;
      this.isOver = isOver;
    }

    public setIsOver(isOver: boolean) {
      this.isOver = isOver;
    }

    public getIsOver() {
        return this.isOver;
    }

    public incrementPoints() {
        this.points += 1;
    }

    public getPoints() {
        return this.points;
    }

    public reset() {
        this.isOver = false;
        this.points = 0;
    }
};

class Snake {
    x: number = 0;
    y: number = 0;
    size: number = 10;
    body: SnakePart[] = [];
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D | null;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    public reset() {
        this.body = [];
    }

    public addSnakeHead (direction: string): void {
        if (!this.canvas) {
            return;
        }

        switch (direction) {
            case "ArrowUp":
                if (this.y <= 0) {
                    this.y = this.canvas.height - this.size;
                } else {
                    this.y -= this.size;
                }
                break;
            case "ArrowRight":
                if (this.x >= this.canvas.width - this.size) {
                    this.x = 0;
                } else {
                    this.x += this.size;
                }
                break;
            case "ArrowDown":
                if (this.y >= this.canvas.height - this.size) {
                    this.y = 0;
                } else {
                    this.y += this.size;
                }
                break;
            case "ArrowLeft":
                if (this.x <= 0) {
                    this.x = this.canvas.width - this.size;
                } else {
                    this.x -= this.size;
                }
                break;
            default:
        }

        let part: SnakePart  = {
            x: this.x,
            y: this.y
        }

        this.body.push(part);
    };

    public clear () {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
            this.ctx.fillStyle = "green";
        }
    };

    public draw () {
        this.body.forEach((part): void => {
            if (this.ctx) {
                this.ctx.fillRect(part.x, part.y, this.size, this.size);
            }
        });
    };

    public getX () {
        return this.x;
    };

    public getY () {
        return this.y;
    };

    public getLength () {
        return this.body.length;
    }

    public removeLastPart() {
        this.body.shift();
    }

    public getBody () {
        return this.body;
    }
};

function main (): void {
    const canvas = <HTMLCanvasElement>document.getElementById("canvas");
    const messageDiv = document.getElementById("message");
    const restartButton = document.getElementById("playAgain");
    const score = document.getElementById("score");

    const game = new Game(0, false);
    const snake = new Snake(canvas);

    if (!canvas || !messageDiv || !restartButton || !score) {
        return;
    }

    canvas.height = 200;
    canvas.width = 200;
    const apple = canvas.getContext("2d");
    let direction = "ArrowRight";
    let appleX = 100;
    let appleY = 100;

    window.setInterval((): void => {
        if (!game.getIsOver()) {
            snake.clear();
            snake.addSnakeHead(direction);

            const x = snake.getX();
            const y = snake.getY();

            if (!(x === appleX && y === appleY) && snake.getLength() > 1) {
                snake.removeLastPart();
                if (gameIsOver()) {
                    game.setIsOver(true);
                    messageDiv.textContent = "Game over";
                    restartButton.setAttribute("style", "display:block");
                };
            } else {
                if ((x === appleX && y === appleY)) {
                    game.incrementPoints();
                    score.textContent = game.getPoints().toString();
                }

                moveApple();
            }

            snake.draw();

            drawApple();
        }
    }, 100);

    if (restartButton) {
        restartButton.addEventListener("click", (): void => {
            restart();
        });
    }

    function isOppositeDirection(newDirection: string): boolean {
        if (direction === "ArrowDown" && newDirection === "ArrowUp") {
            return true;
        }

        if (direction === "ArrowRight" && newDirection === "ArrowLeft") {
            return true;
        }

        if (direction === "ArrowLeft" && newDirection === "ArrowRight") {
            return true;
        }

        if (direction === "ArrowUp" && newDirection === "ArrowDown") {
            return true;
        }

        return false;
    };

    document.addEventListener("keydown", (e): void => {
        if (!["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(e.key)) {
            return;
        }

        if (isOppositeDirection(e.key)) {
            return;
        }

        direction = e.key;
    });

    function moveApple (): void {
        if (canvas) {
            appleX = Math.floor((Math.random() * canvas.width)/10) * 10;
            appleY = Math.floor((Math.random() * canvas.width)/10) * 10;
        }
    };

    function drawApple (): void {
        if (apple) {
            apple.fillStyle = "red";
            apple.fillRect(appleX, appleY, 10 ,10);
        }
    };

    function gameIsOver (): boolean {
        let snakeSet = new Set();
        snake.getBody().forEach(part => snakeSet.add(JSON.stringify(part)));
        return snakeSet.size !== snake.getLength();
    };

    function restart (): void {
        snake.reset();
        game.reset();

        if (messageDiv && restartButton && score) {
            messageDiv.textContent = "";
            restartButton.setAttribute("style", "display:none");
            score.textContent = game.getPoints().toString();
        }
    };
};

main();