"use strict";
const Point = require("./point");

const getSide = function(rectangle, coordinate) {
  const coordinate1 = rectangle.diagonalEndA[coordinate];
  const coordinate2 = rectangle.diagonalEndB[coordinate];
  return coordinate2 - coordinate1;
};

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

  get area() {
    return getSide(this, `x`) * getSide(this, `y`);
  }
}

module.exports = Rectangle;
