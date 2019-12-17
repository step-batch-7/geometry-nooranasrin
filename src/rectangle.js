"use strict";
const Point = require("./point");
const Line = require("./line");

const getSides = function(rectangle) {
  const [vertexA, vertexC] = [rectangle.vertexA, rectangle.vertexC];
  const AB = new Line(vertexA, new Point(vertexC.x, vertexA.y));
  const BC = new Line(new Point(vertexC.x, vertexA.y), vertexC);
  const CD = new Line(vertexC, new Point(vertexA.x, vertexC.y));
  const AD = new Line(vertexA, new Point(vertexA.x, vertexC.y));
  return [AB, BC, CD, AD];
};

class Rectangle {
  constructor(diagonalEndA, diagonalEndC) {
    this.vertexA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.vertexC = new Point(diagonalEndC.x, diagonalEndC.y);
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
    const [length] = getSides(this);
    const [, breadth] = getSides(this);
    return Math.abs(length.length * breadth.length);
  }

  get perimeter() {
    const [length] = getSides(this);
    const [, breadth] = getSides(this);
    return Math.abs(2 * (length.length + breadth.length));
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const [AB, BC, CD, AD] = getSides(this);
    return point.isOn(AB) || point.isOn(BC) || point.isOn(CD) || point.isOn(AD);
  }

  covers(point) {
    if (!(point instanceof Point)) return false;
    const [AB, BC, CD, AD] = getSides(this);
    const [minX, maxX] = [AB.endA.x, AB.endB.x].sort((x1, x2) => x1 - x2);
    const [minY, maxY] = [AB.endA.y, AD.endB.y].sort((y1, y2) => y1 - y2);
    return point.x > minX && point.x < maxX && point.y > minY && point.y < maxY;
  }
}

module.exports = Rectangle;
