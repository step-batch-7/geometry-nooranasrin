"use strict";
const Point = require("./point");

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
  const [endA, end] = range.sort();
  return coordinate >= endA && coordinate <= end;
};

const getPoint = function(coordinate1, coordinate2) {
  return (coordinate1 + coordinate2) / 2;
};

class Line {
  constructor(endA, endB) {
    this.endA = new Point(endA.x, endA.y);
    this.endB = new Point(endB.x, endB.y);
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
      (this.endA.isEqual(other.endA) && this.endB.isEqual(other.endB)) ||
      (this.endA.isEqual(other.endB) && this.endB.isEqual(other.endA))
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
    if (!isNumInRange([this.endA.y, this.endB.y], y)) return NaN;
    if (this.slope === 0) return this.endA.x;
    return (y - this.endA.y) / this.slope + this.endA.x;
  }

  findY(x) {
    if (!isNumInRange([this.endA.x, this.endB.x], x)) return NaN;
    if (this.slope === Infinity) return this.endA.y;
    const dx = x - this.endA.x;
    return dx * this.slope + this.endA.y;
  }

  split() {
    const middleX = getPoint(this.endA.x, this.endB.x);
    const middleY = getPoint(this.endA.y, this.endB.y);
    const middlePoint = new Point(middleX, middleY);
    return [new Line(this.endA, middlePoint), new Line(middlePoint, this.endB)];
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const isXInRange = isNumInRange([this.endA.x, this.endB.x], point.x);
    const isYInRange = isNumInRange([this.endA.y, this.endB.y], point.y);
    return (
      isXInRange && isYInRange && areCollinear(this.endA, this.endB, point)
    );
  }

  findPointFromStart(distance) {
    if (!(typeof distance == "number")) return undefined;
    return getPointInADistance(this, distance);
  }

  findPointFromEnd(distance) {
    if (!(typeof distance == "number")) return undefined;
    return getPointInADistance(new Line(this.endA, this.endB), distance);
  }
}

module.exports = Line;
