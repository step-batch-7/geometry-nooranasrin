const assert = require("chai").assert;
const Point = require("../src/point");
const Circle = require("../src/circle");

describe("Circle", () => {
  describe("isEqualTo", () => {
    it("should validate when the two instances are equal", () => {
      const circle1 = new Circle({ x: 10, y: 11 }, 5);
      const circle2 = new Circle({ x: 10, y: 11 }, 5);
      assert.isTrue(circle1.isEqualTo(circle2));
    });
    it("should invalidate when the two instances not equal", () => {
      const circle1 = new Circle({ x: 10, y: 11 }, 5);
      const circle2 = new Circle({ x: 10, y: 12 }, 5);
      assert.isFalse(circle1.isEqualTo(circle2));
    });
    it("should invalidate when one circle1 is not an instance of Circle class", () => {
      const circle1 = new Circle({ x: 10, y: 11 }, 5);
      const circle2 = { center: { x: 10, y: 11 }, radius: 5 };
      assert.isFalse(circle1.isEqualTo(circle2));
    });
    it("should invalidate when one is an empty object ", () => {
      const circle1 = new Circle({ x: 10, y: 11 }, 5);
      const circle2 = {};
      assert.isFalse(circle1.isEqualTo(circle2));
    });
    it("should validate when the reference of both the lines are same", () => {
      const circle = new Circle({ x: 10, y: 11 }, 5);
      assert.isTrue(circle.isEqualTo(circle));
    });
  });

  describe("toString", () => {
    it("should give the string format of the instance", () => {
      const circle = new Circle({ x: 1, y: 2 }, 5);
      assert.strictEqual(circle.toString(), "[Circle @(1,2) radius 5]");
    });
  });

  describe("area", () => {
    it("should give the area of the given circle", () => {
      const circle = new Circle({ x: 0, y: 0 }, 1);
      assert.approximately(circle.area, 3.14, 3.14);
    });
    it("should give 0 as area when radius is 0", () => {
      const circle = new Circle({ x: 0, y: 0 }, 0);
      assert.strictEqual(circle.area, 0);
    });
  });

  describe("perimeter", () => {
    it("should give the perimeter of the given circle", () => {
      const circle = new Circle({ x: 0, y: 0 }, 1);
      assert.approximately(circle.perimeter, 6.28, 6.28);
    });
    it("should give 0 as perimeter when radius is 0", () => {
      const circle = new Circle({ x: 0, y: 0 }, 0);
      assert.strictEqual(circle.perimeter, 0);
    });
  });

  describe("hasPoint", () => {
    it("should validate a point that is on the circumference of circle and on the x axis", () => {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(5, 0);
      assert.isTrue(circle.hasPoint(point));
    });
    it("should validate a point that is on the circumference of circle and on the y axis", () => {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(0, 5);
      assert.isTrue(circle.hasPoint(point));
    });
    it("should invalidate a point that is not on the circumference of circle", () => {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = new Point(0, 6);
      assert.isFalse(circle.hasPoint(point));
    });
    it("should invalidate a point that is not an instance of class Point", () => {
      const circle = new Circle({ x: 0, y: 0 }, 5);
      const point = { x: 0, y: 5 };
      assert.isFalse(circle.hasPoint(point));
    });
  });
});
