const isPointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

const isTypeEqual = function(line) {
  return line instanceof Line;
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

  isEqual(other) {
    return (
      isTypeEqual(other) &&
      isPointsEqual(this.endA, other.endA) &&
      isPointsEqual(this.endB, other.endB)
    );
  }
}

module.exports = Line;
