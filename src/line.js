const isPointsEqual = function(point1, point2) {
  return point1 === point2;
};

class Line {
  constructor(endA, endB) {
    this.endA = endA;
    this.endB = endB;
  }
  get toString() {
    let position1 = `(${this.endA.x}, ${this.endA.y})`;
    let position2 = `(${this.endB.x}, ${this.endB.y})`;
    return `Line : ${position1} ${position2}`;
  }
  isEqual(other) {
    let isX1Equal = isPointsEqual(this.endA.x, other.endA.x);
    let isY1Equal = isPointsEqual(this.endA.y, other.endA.y);
    let isX2Equal = isPointsEqual(this.endB.x, other.endB.x);
    let isY2Equal = isPointsEqual(this.endB.y, other.endB.y);
    let isTypeEqual = this instanceof Line && other instanceof Line;
    return isX1Equal && isY1Equal && isX2Equal && isY2Equal && isTypeEqual;
  }
}

module.exports = { Line, isPointsEqual };
