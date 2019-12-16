"use strict";
const Point = require("./point");

const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

const getYIntercept = function(x, y, m) {
  return y - m * x;
};

const getPointInADistance = function(line, distance) {
  const length = line.length;
  const ratio = distance / length;
  const xRatio = (1 - ratio) * line.endA.x + ratio * line.endB.x;
  const yRatio = (1 - ratio) * line.endA.y + ratio * line.endB.y;
  return new Point(xRatio, yRatio);
};

const areCollinear = function(pointA, pointB, pointC) {
  const [x1, y1] = [pointA.x, pointA.y];
  const [x2, y2] = [pointB.x, pointB.y];
  const [x3, y3] = [pointC.x, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
};

const isNumInRange = function(range, coordinate) {
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
    return (
      (arePointsEqual(this.endA, other.endA) &&
        arePointsEqual(this.endB, other.endB)) ||
      (arePointsEqual(this.endA, other.endB) &&
        arePointsEqual(this.endB, other.endA))
    );
  }

  isParallelTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      this.slope === other.slope &&
      !areCollinear(this.endA, this.endB, other.endA)
    );
  }

  findX(y) {
    if (!isNumInRange([this.endA.x, this.endB.x], y)) return NaN;
    if (this.slope === 0) return this.endA.x;
    const c = getYIntercept(this.endA.x, this.endA.y, this.slope);
    return (y - c) / this.slope;
  }

  findY(x) {
    if (!isNumInRange([this.endA.y, this.endB.y], x)) return NaN;
    if (this.slope === Infinity) return this.endA.y;
    const c = getYIntercept(this.endA.x, this.endA.y, this.slope);
    return this.slope * x + c;
  }

  split() {
    const middleX = getPoint(this.endA.x, this.endB.x);
    const middleY = getPoint(this.endA.y, this.endB.y);
    const middlePoint = new Point(middleX, middleY);
    return [new Line(this.endA, middlePoint), new Line(middlePoint, this.endB)];
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const isXisInRange = isNumInRange([this.endA.x, this.endB.x], point.x);
    const isYisInRange = isNumInRange([this.endA.y, this.endB.y], point.y);
    return isXisInRange && isYisInRange;
  }

  findPointFromStart(distance) {
    return getPointInADistance(this, distance);
  }

  findPointFromEnd(distance) {
    return getPointInADistance(new Line(this.endA, this.endB), distance);
  }
}

module.exports = Line;
