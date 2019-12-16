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
});
