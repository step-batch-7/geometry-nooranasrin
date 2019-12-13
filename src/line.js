const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  get toString() {
    let endA = `(${this.endA.x}, ${this.endA.y})`;
    let endB = `(${this.endB.x}, ${this.endB.y})`;
    return `Line : ${endA} ${endB}`;
  }

  get length() {
    const differenceOfSquaresOfX = Math.pow(this.endB.x - this.endA.x, 2);
    const differenceOfSquaresOfY = Math.pow(this.endB.y - this.endA.y, 2);
    return Math.sqrt(differenceOfSquaresOfX + differenceOfSquaresOfY);
  }

  get slope() {
    return (this.endB.y - this.endA.y) / (this.endB.x - this.endA.x);
  }

  isEqual(other) {
    if (!(other instanceof Line)) {
      return false;
    }
    return (
      arePointsEqual(this.endA, other.endA) &&
      arePointsEqual(this.endB, other.endB)
    );
  }

  isParallelTo(other) {
    return this.slope === other.slope;
  }
}

module.exports = Line;
