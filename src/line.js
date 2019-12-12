class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }
  get toString() {
    let position1 = `(${this.x1}, ${this.y1})`;
    let position2 = `(${this.x2}, ${(this, this.y2)})`;
    return `Line : ${position1} ${position2}`;
  }
  isEqual(other) {
    let isX1Equal = this.x1 == other.x1;
    let isY1Equal = this.y1 == other.y1;
    let isX2Equal = this.x2 == other.x2;
    let isY2Equal = this.y2 == other.y2;
    let isTypeEqual = this instanceof Line && other instanceof Line;
    return isX1Equal && isY1Equal && isX2Equal && isY2Equal && isTypeEqual;
  }
}

module.exports = Line;
