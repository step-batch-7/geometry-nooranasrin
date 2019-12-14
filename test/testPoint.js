const assert = require("chai").assert;
const Point = require("../src/point");

describe("Point", () => {
  describe("isEqual", () => {
    it("should validate when the two instances are equal", () => {
      const point = new Point(10, 11);
      const otherPoint = new Point(10, 11);
      assert.isTrue(point.isEqual(otherPoint));
    });
    it("should invalidate when the two instances not equal", () => {
      const point = new Point(10, 11);
      const otherPoint = new Point(10, 12);
      assert.isFalse(point.isEqual(otherPoint));
    });
    it("should invalidate when one point is not an instance of Point class", () => {
      const point = new Point(10, 11);
      const otherPoint = { x: 10, y: 11 };
      assert.isFalse(point.isEqual(otherPoint));
    });
    it("should invalidate when one is an empty object ", () => {
      const point = new Point(10, 11);
      const otherPoint = {};
      assert.isFalse(point.isEqual(otherPoint));
    });
    it("should validate when the reference of both the lines are same", () => {
      const point = new Point(10, 11);
      assert.isTrue(point.isEqual(point));
    });
  });

  describe("toString", () => {
    it("should give the string format of the instance", () => {
      const point = new Point(10, 11);
      assert.strictEqual(point.toString(), "[Point @(10,11)]");
    });
  });
});
