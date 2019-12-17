"use strict";
const Point = require("./point");

const areCollinear = function(pointA, pointB, pointC) {
  const [x1, x2, x3] = [pointA.x, pointB.x, pointC.x];
  const [y1, y2, y3] = [pointA.y, pointB.y, pointC.y];
  return x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2) == 0;
};

const isNumInRange = function(range, coordinate) {
  const [endA, endB] = range.sort((a, b) => a - b);
  return coordinate >= endA && coordinate <= endB;
};

class Line {
  constructor(endA, endB) {
    this.endA = new Point(endA.x, endA.y);
    this.endB = new Point(endB.x, endB.y);
  }

  toString() {
    return `[Line (${this.endA.x},${this.endA.y}) to (${this.endB.x},${this.endB.y})]`;
  }

  get length() {
    return this.endA.findDistanceTo(this.endB);
  }

  get slope() {
    const slope = (this.endA.y - this.endB.y) / (this.endA.x - this.endB.x);
    return slope == -Infinity ? Infinity : slope;
  }

  isEqualTo(other) {
    if (!(other instanceof Line)) return false;
    return (
      (this.endA.isEqualTo(other.endA) && this.endB.isEqualTo(other.endB)) ||
      (this.endA.isEqualTo(other.endB) && this.endB.isEqualTo(other.endA))
    );
  }

  isParallelTo(other) {
    if (!(other instanceof Line)) return false;
    const arePointsCollinear = areCollinear(this.endA, this.endB, other.endA);
    return this.slope === other.slope && !arePointsCollinear;
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
    const middleX = (this.endA.x + this.endB.x) / 2;
    const middleY = (this.endA.y + this.endB.y) / 2;
    const middlePoint = new Point(middleX, middleY);
    return [new Line(this.endA, middlePoint), new Line(middlePoint, this.endB)];
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const isXInRange = isNumInRange([this.endA.x, this.endB.x], point.x);
    const isYInRange = isNumInRange([this.endA.y, this.endB.y], point.y);
    const arePointsCollinear = areCollinear(this.endA, this.endB, point);
    return isXInRange && isYInRange && arePointsCollinear;
  }

  findPointFromStart(distance) {
    if (typeof distance != "number" || distance === NaN) return null;
    const ratio = distance / this.length;
    if (distance < 0 || distance > this.length) return null;
    const xRatio = (1 - ratio) * this.endA.x + ratio * this.endB.x;
    const yRatio = (1 - ratio) * this.endA.y + ratio * this.endB.y;
    return new Point(xRatio, yRatio);
  }

  findPointFromEnd(distance) {
    return this.findPointFromStart(this.length - distance);
  }
}

module.exports = Line;
