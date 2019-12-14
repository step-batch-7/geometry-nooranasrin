"use strict";

const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

const getYIntercept = function(x, y, m) {
  return y - m * x;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    let endA = `(${this.endA.x}, ${this.endA.y})`;
    let endB = `(${this.endB.x}, ${this.endB.y})`;
    return `Line : ${endA} ${endB}`;
  }

  get length() {
    return Math.hypot(this.endB.x - this.endA.x, this.endB.y - this.endA.y);
  }

  get slope() {
    return (this.endB.y - this.endA.y) / (this.endB.x - this.endA.x);
  }

  isEqual(other) {
    if (!(other instanceof Line)) return false;
    const areEndAEqual = arePointsEqual(this.endA, other.endA);
    const areEndBEqual = arePointsEqual(this.endB, other.endB);
    return areEndAEqual && areEndBEqual;
  }

  isParallelTo(other) {
    if (!(other instanceof Line)) return false;
    const thisYIntercept = getYIntercept(this.endA.x, this.endA.y, this.slope);
    const otherYIntercept = getYIntercept(
      other.endA.x,
      other.endA.y,
      other.slope
    );
    return thisYIntercept != otherYIntercept && this.slope === other.slope;
  }
}

module.exports = Line;
