// noinspection LocalVariableNamingConventionJS
export default class MouseCoords {
  public x: number;
  public y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public calculateDelta(otherCoords: MouseCoords): { deltaX: number, deltaY: number } {
    return {
      deltaX: otherCoords.x - this.x,
      deltaY: otherCoords.y - this.y
    };
  }
}