const isPointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

const isTypeEqual = function(firstLine, secondLine) {
  return firstLine instanceof Line && secondLine instanceof Line;
};

class Line {
  constructor(endA, endB) {
    this.endA = { ...endA };
    this.endB = { ...endB };
  }

  get toString() {
    let endA = `(${this.endA.x}, ${this.endA.y})`;
    let endB = `(${this.endB.x}, ${this.endB.y})`;
    return `Line : ${endA} ${endB}`;
  }

  isEqual(other) {
    let isEndAEqual = isPointsEqual(this.endA, other.endA);
    let isEndBEqual = isPointsEqual(this.endB, other.endB);
    let isSameType = isTypeEqual(this, other);
    return isEndAEqual && isEndBEqual && isSameType;
  }
}

module.exports = { Line, isPointsEqual, isTypeEqual };
