"use strict";
const Point = require("./point");
const Line = require("./line");

class Rectangle {
  constructor(diagonalEndA, diagonalEndC) {
    this.vertexA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.vertexB = new Point(diagonalEndC.x, diagonalEndA.y);
    this.vertexC = new Point(diagonalEndC.x, diagonalEndC.y);
    this.vertexD = new Point(diagonalEndA.x, diagonalEndC.y);

    Object.defineProperties(this, {
      vertexA: { writable: false },
      vertexB: { enumerable: true, writable: false },
      vertexC: { writable: false },
      vertexD: { enumerable: true, writable: false }
    });
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const endA = this.diagonalEndA;
    const endB = this.diagonalEndB;
    return (
      (this.vertexA.isEqualTo(other.vertexA) &&
        this.vertexC.isEqualTo(other.vertexC)) ||
      (this.vertexA.isEqualTo(other.vertexC) &&
        this.vertexC.isEqualTo(other.vertexA))
    );
  }

  toString() {
    let endA = `(${this.vertexA.x},${this.vertexA.y})`;
    let endB = `(${this.vertexC.x},${this.vertexC.y})`;
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

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const AB = new Line(this.vertexA, this.vertexB);
    const BC = new Line(this.vertexB, this.vertexC);
    const CD = new Line(this.vertexC, this.vertexD);
    const AD = new Line(this.vertexD, this.vertexA);
    return point.isOn(AB) || point.isOn(BC) || point.isOn(CD) || point.isOn(AD);
  }

  covers(point) {
    if (!(point instanceof Point)) return false;
    const x1 = this.vertexA.x;
    const x2 = this.vertexB.x;
    const y1 = this.vertexA.y;
    const y2 = this.vertexC.y;
    const [minX, maxX] = [x1, x2].sort((x1, x2) => x1 - x2);
    const [minY, maxY] = [y1, y2].sort((y1, y2) => y1 - y2);
    return (
      point.x >= minX && point.x <= maxX && point.y >= minY && point.y <= maxY
    );
  }
}

module.exports = Rectangle;
