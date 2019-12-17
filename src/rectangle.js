"use strict";
const Point = require("./point");

class Rectangle {
  constructor(diagonalEndA, diagonalEndB) {
    this.diagonalEndA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.diagonalEndB = new Point(diagonalEndB.x, diagonalEndB.y);
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const endA = this.diagonalEndA;
    const endB = this.diagonalEndB;
    return (
      (endA.isEqualTo(other.diagonalEndA) &&
        endB.isEqualTo(other.diagonalEndB)) ||
      (endA.isEqualTo(other.diagonalEndB) && endB.isEqualTo(other.diagonalEndA))
    );
  }

  toString() {
    let endA = `(${this.diagonalEndA.x},${this.diagonalEndA.y})`;
    let endB = `(${this.diagonalEndB.x},${this.diagonalEndB.y})`;
    return `[Rectangle ${endA} to ${endB}]`;
  }
}

module.exports = Rectangle;
