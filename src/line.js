class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
  }
  get toString() {
    return `(${this.x1},${this.y1}),(${this.x2},${(this, this.y2)})`;
  }
  isEqual(otherLine) {
    let isX1Equal = this.x1 == otherLine.x1;
    let isY1Equal = this.y1 == otherLine.y1;
    let isX2Equal = this.x2 == otherLine.x2;
    let isY2Equal = this.y2 == otherLine.y2;
    return isX1Equal && isY1Equal && isX2Equal && isY2Equal;
  }
}

module.exports = Line;
