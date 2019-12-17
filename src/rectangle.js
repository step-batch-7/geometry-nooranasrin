"use strict";
const Point = require("./point");
const Line = require("./line");

class Rectangle {
  constructor(diagonalEndA, diagonalEndC) {
    this.vertexA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.vertexB = new Point(diagonalEndC.x, diagonalEndA.y);
    this.vertexC = new Point(diagonalEndC.x, diagonalEndC.y);
    this.vertexD = new Point(diagonalEndA.x, diagonalEndC.y);
    this.diagonal = new Line(diagonalEndA, diagonalEndC);

    Object.defineProperties(this, {
      diagonal: { writable: false },
      vertexA: { enumerable: true, writable: false },
      vertexB: { enumerable: true, writable: false },
      vertexC: { enumerable: true, writable: false },
      vertexD: { enumerable: true, writable: false }
    });
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const endA = this.diagonalEndA;
    const endB = this.diagonalEndB;
    return (
      this.vertexA.isEqualTo(other.vertexA) &&
      this.vertexB.isEqualTo(other.vertexB) &&
      this.vertexC.isEqualTo(other.vertexC) &&
      this.vertexD.isEqualTo(other.vertexD)
    );
  }

  toString() {
    let endA = `(${this.diagonal.endA.x},${this.diagonal.endA.y})`;
    let endB = `(${this.diagonal.endB.x},${this.diagonal.endB.y})`;
    return `[Rectangle ${endA} to ${endB}]`;
  }

  get area() {
    const length = this.vertexA.findDistanceTo(this.vertexB);
    const breadth = this.vertexB.findDistanceTo(this.vertexC);
    return Math.abs(length * breadth);
  }

  get perimeter() {
    const length = this.vertexA.findDistanceTo(this.vertexB);
    const breadth = this.vertexB.findDistanceTo(this.vertexC);
    return Math.abs(2 * (length + breadth));
  }

  hasPoint(point) {}
}

module.exports = Rectangle;
