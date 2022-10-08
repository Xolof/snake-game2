export class Game {
    points: number;
    isOver: boolean;

    constructor(points: number, isOver: boolean) {
      this.points = points;
      this.isOver = isOver;
    }

    public setIsOver(isOver: boolean): void {
      this.isOver = isOver;
    }

    public getIsOver(): boolean {
        return this.isOver;
    }

    public incrementPoints(): void {
        this.points += 1;
    }

    public getPoints(): number {
        return this.points;
    }

    public reset(): void {
        this.isOver = false;
        this.points = 0;
    }
};