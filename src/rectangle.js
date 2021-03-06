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

const isNumInRange = function(range, coordinate) {
  const [endA, endB] = range.sort((a, b) => a - b);
  return coordinate > endA && coordinate < endB;
};

class Rectangle {
  constructor(diagonalEndA, diagonalEndC) {
    this.vertexA = new Point(diagonalEndA.x, diagonalEndA.y);
    this.vertexC = new Point(diagonalEndC.x, diagonalEndC.y);
  }

  isEqualTo(other) {
    if (!(other instanceof Rectangle)) return false;
    const [AB, , , AD] = getSides(this);
    const vertexB = AB.endB;
    const vertexD = AD.endB;
    const diagonal1 = new Line(this.vertexA, this.vertexC);
    const diagonal2 = new Line(vertexB, vertexD);
    const otherDiagonal = new Line(other.vertexA, other.vertexC);
    return (
      diagonal1.isEqualTo(otherDiagonal) || diagonal2.isEqualTo(otherDiagonal)
    );
  }

  toString() {
    let endA = `(${this.vertexA.x},${this.vertexA.y})`;
    let endB = `(${this.vertexC.x},${this.vertexC.y})`;
    return `[Rectangle ${endA} to ${endB}]`;
  }

  get area() {
    const [length, breadth] = getSides(this);
    return Math.abs(length.length * breadth.length);
  }

  get perimeter() {
    const [length, breadth] = getSides(this);
    return Math.abs(2 * (length.length + breadth.length));
  }

  hasPoint(point) {
    if (!(point instanceof Point)) return false;
    const sides = getSides(this);
    return sides.some(side => point.isOn(side));
  }

  covers(point) {
    if (!(point instanceof Point)) return false;
    const [AB, , , AD] = getSides(this);
    const isXInRange = isNumInRange([AB.endA.x, AB.endB.x], point.x);
    const isYInRange = isNumInRange([AB.endA.y, AD.endB.y], point.y);
    return isXInRange && isYInRange;
  }
}

module.exports = Rectangle;
