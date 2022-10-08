import { SnakePart } from "./types";

export class Snake {
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

    public reset(): void {
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

    public clear (): void {
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.height, this.canvas.width);
            this.ctx.fillStyle = "green";
        }
    };

    public draw (): void {
        this.body.forEach((part): void => {
            if (this.ctx) {
                this.ctx.fillRect(part.x, part.y, this.size, this.size);
            }
        });
    };

    public getX (): number {
        return this.x;
    };

    public getY (): number {
        return this.y;
    };

    public getLength (): number {
        return this.body.length;
    }

    public removeLastPart(): void {
        this.body.shift();
    }

    public getBody (): SnakePart[] {
        return this.body;
    }
};