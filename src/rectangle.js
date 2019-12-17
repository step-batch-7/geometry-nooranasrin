"use strict";
const Point = require("./point");
const Line = require("./line");

class Rectangle {
  constructor(diagonalEndA, diagonalEndC) {
    this.A = new Point(diagonalEndA.x, diagonalEndA.y);
    this.B = new Point(diagonalEndC.x, diagonalEndA.y);
    this.C = new Point(diagonalEndC.x, diagonalEndC.y);
    this.D = new Point(diagonalEndA.x, diagonalEndC.y);
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
      this.A.isEqualTo(other.A) &&
      this.B.isEqualTo(other.B) &&
      this.C.isEqualTo(other.C) &&
      this.D.isEqualTo(other.D)
    );
  }

  toString() {
    let endA = `(${this.diagonal.endA.x},${this.diagonal.endA.y})`;
    let endB = `(${this.diagonal.endB.x},${this.diagonal.endB.y})`;
    return `[Rectangle ${endA} to ${endB}]`;
  }

  get area() {
    const length = this.A.findDistanceTo(this.B);
    const breadth = this.B.findDistanceTo(this.C);
    return Math.abs(length * breadth);
  }

  get perimeter() {
    const length = this.A.findDistanceTo(this.B);
    const breadth = this.B.findDistanceTo(this.C);
    return Math.abs(2 * (length + breadth));
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const AB = new Line(this.A, this.B);
    const BC = new Line(this.B, this.C);
    const CD = new Line(this.C, this.D);
    const AD = new Line(this.D, this.A);
    return point.isOn(AB) || point.isOn(BC) || point.isOn(CD) || point.isOn(AD);
  }
}

module.exports = Rectangle;
