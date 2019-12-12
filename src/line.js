const isPointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

class Line {
  constructor(endA, endB) {
    this.endA = endA;
    this.endB = endB;
  }

  get toString() {
    let endA = `(${this.endA.x}, ${this.endA.y})`;
    let endB = `(${this.endB.x}, ${this.endB.y})`;
    return `Line : ${endA} ${endB}`;
  }

  isEqual(other) {
    let isEndAEqual = isPointsEqual(this.endA, other.endA);
    let isEndBEqual = isPointsEqual(this.endB, other.endB);
    let isTypeEqual = this instanceof Line && other instanceof Line;
    return isEndAEqual && isEndBEqual && isTypeEqual;
  }
}

module.exports = { Line, isPointsEqual };
