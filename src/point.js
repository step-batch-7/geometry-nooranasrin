"use strict";

const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

class Point {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }

  isEqual(other) {
    if (!(other instanceof Point)) return false;
    return arePointsEqual(this, other);
  }
  toString() {
    return `[Point @(${this.x},${this.y})]`;
  }

  visit(operation) {
    return operation(this.x, this.y);
  }

  clone() {
    return new Point(this.x, this.y);
  }
}

module.exports = Point;
