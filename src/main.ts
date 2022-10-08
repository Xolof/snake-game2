import { Game } from './Game'
import { Snake } from './Snake'

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