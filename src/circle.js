const Point = require("./point");

class Circle {
  constructor(center, radius) {
    this.center = new Point(center.x, center.y);
    this.radius = radius;
  }

  isEqualTo(other) {
    if (!(other instanceof Circle)) return false;
    return this.center.isEqualTo(other.center) && this.radius === other.radius;
  }

  toString() {
    return `[Circle @(${this.center.x},${this.center.y}) radius ${this.radius}]`;
  }
}

module.exports = Circle;
