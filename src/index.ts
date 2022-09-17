   /**
     * TODO: Make it more object oriented.
    */

    function main (): void {
        type SnakePart = {
            x: number,
            y: number
        }

        const canvas = <HTMLCanvasElement>document.getElementById("canvas");
        const messageDiv = document.getElementById("message");
        const restartButton = document.getElementById("playAgain");
        const score = document.getElementById("score");

        if (!canvas || !messageDiv || !restartButton || !score) {
            return;
        }

        canvas.height = 200;
        canvas.width = 200;
        const ctx = canvas.getContext("2d");
        const apple = canvas.getContext("2d");
        let x = 0;
        let y = 0;
        let size = 10;
        let direction = "ArrowRight";
        let points = 0;
        let appleX = 100;
        let appleY = 100;
        let snake: SnakePart[] = [];
        let gameOver = false;

        window.setInterval((): void => {
            if (!gameIsOver()) {
                if (canvas && ctx) {
                    ctx.clearRect(0, 0, canvas.height, canvas.width);
                    ctx.fillStyle = "green";
                }
                addSnakeHead(direction);

                if (!(x === appleX && y === appleY) && snake.length > 1) {
                    snake.shift();
                    if (gameIsOver()) {
                        gameOver = true;
                        messageDiv.textContent = "Game over";
                        restartButton.setAttribute("style", "display:block");
                    };
                } else {
                    if ((x === appleX && y === appleY)) {
                        points += 1;
                        score.textContent = points.toString();
                    }
                    moveApple();
                }

                snake.forEach((part): void => {
                    if (ctx) {
                        ctx.fillRect(part.x, part.y, size, size);
                    }
                });

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
        }

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
        }

        function addSnakeHead (direction: string): void {
            if (!canvas) {
                return;
            }

            switch (direction) {
                case "ArrowUp":
                    if (y <= 0) {
                        y = canvas.height - size;
                    } else {
                        y -= size;
                    }
                    break;
                case "ArrowRight":
                    if (x >= canvas.width - size) {
                        x = 0;
                    } else {
                        x += size;
                    }
                    break;
                case "ArrowDown":
                    if (y >= canvas.height - size) {
                        y = 0;
                    } else {
                        y += size;
                    }
                    break;
                case "ArrowLeft":
                    if (x <= 0) {
                        x = canvas.width - size;
                    } else {
                        x -= size;
                    }
                    break;
                default:
            }

            let part: SnakePart  = {
                x: x,
                y: y
            }

            snake.push(part);
        }

        function drawApple (): void {
            if (apple) {
                apple.fillStyle = "red";
                apple.fillRect(appleX, appleY, 10 ,10);
            }
        }

        function gameIsOver (): boolean {
            let snakeSet = new Set();
            snake.forEach(part => snakeSet.add(JSON.stringify(part)));
            return snakeSet.size !== snake.length;
        }

        function restart (): void {
            snake = [];
            gameOver = false;
            points = 0;

            if (messageDiv && restartButton && score) {
                messageDiv.textContent = "";
                restartButton.setAttribute("style", "display:none");
                score.textContent = points.toString();
            }
        }
    }

    main();