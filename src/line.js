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
    const differenceOfSquaresOfX =
      (this.endB.x - this.endA.x) * (this.endB.x - this.endA.x);
    const differenceOfSquaresOfY =
      (this.endB.y - this.endA.y) * (this.endB.y - this.endA.y);
    return Math.sqrt(differenceOfSquaresOfX + differenceOfSquaresOfY);
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
}

module.exports = Line;
