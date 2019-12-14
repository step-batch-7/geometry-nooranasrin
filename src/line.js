"use strict";

const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

const getYIntercept = function(x, y, m) {
  return y - m * x;
};

const isInRange = function(range, coordinate) {
  const [start, end] = range.sort();
  return coordinate >= start && coordinate <= end;
};

const getPoint = function(coordinate1, coordinate2) {
  return (coordinate1 + coordinate2) / 2;
};

class Line {
  constructor(endA, endB) {
    this.endA = { x: endA.x, y: endA.y };
    this.endB = { x: endB.x, y: endB.y };
  }

  toString() {
    let endA = `(${this.endA.x}, ${this.endA.y})`;
    let endB = `(${this.endB.x}, ${this.endB.y})`;
    return `[Line ${endA} to ${endB}]`;
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
    const isYInterceptNotEqual =
      getYIntercept(this.endA.x, this.endA.y, this.slope) !=
      getYIntercept(other.endA.x, other.endA.y, other.slope);
    return isYInterceptNotEqual && this.slope === other.slope;
  }

  findX(y) {
    if (!isInRange([this.endA.x, this.endB.x], y)) return NaN;
    const c = getYIntercept(this.endA.x, this.endA.y, this.slope);
    return (y - c) / this.slope;
  }

  findY(x) {
    if (!isInRange([this.endA.y, this.endB.y], x)) return NaN;
    const c = getYIntercept(this.endA.x, this.endA.y, this.slope);
    return this.slope * x + c;
  }

  split() {
    const middleX = getPoint(this.endA.x, this.endB.x);
    const middleY = getPoint(this.endA.y, this.endB.y);
    return [
      new Line(this.endA, { x: middleX, y: middleY }),
      new Line({ x: middleX, y: middleY }, this.endB)
    ];
  }

  hasPoint(point) {
    const isXisInRange = isInRange([this.endA.x, this.endB.x], point.x);
    const isYisInRange = isInRange([this.endA.y, this.endB.y], point.y);
    if (!(isXisInRange || isYisInRange)) return NaN;
    return (
      point.y ===
      this.slope * point.x + getYIntercept(this.endA.x, this.endA.y, this.slope)
    );
  }
}

module.exports = Line;
