"use strict";

class Point {
  constructor(x, y) {
    [this.x, this.y] = [x, y];
  }

  isEqualTo(other) {
    if (!(other instanceof Point)) return false;
    return this.x === other.x && this.y === other.y;
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

  findDistanceTo(other) {
    if (!(other instanceof Point)) return NaN;
    return Math.hypot(this.x - other.x, this.y - other.y);
  }

  isOn(shape) {
    return shape.hasPoint(this);
  }
}

module.exports = Point;
