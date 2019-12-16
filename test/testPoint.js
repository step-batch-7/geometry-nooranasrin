const assert = require("chai").assert;
const Point = require("../src/point");
const Line = require("../src/line");

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

  describe("visit", () => {
    it("should give the result of calculation when the visit is invoked", () => {
      const point = new Point(2, 3);
      let actual = point.visit((x, y) => x + y);
      assert.strictEqual(actual, 5);

      actual = point.visit((x, y) => x * y);
      assert.strictEqual(actual, 6);
    });
  });

  describe("clone", () => {
    it("should return the copy of same instance", () => {
      const point = new Point(2, 3);
      const copy = point.clone();
      assert.isTrue(point.isEqual(copy));
    });
  });

  describe("findDistanceTo", () => {
    it("should give the distance when the two points are positive", () => {
      const point1 = new Point(2, 1);
      const point2 = new Point(6, 4);
      assert.strictEqual(point1.findDistanceTo(point2), 5);
    });
    it("should give the distance when any one of coordinate is negative", () => {
      const point1 = new Point(-2, 3);
      const point2 = new Point(5, 2);
      assert.approximately(point1.findDistanceTo(point2), 7.07, 7.07);
    });
    it("should give the distance when all the coordinates are negative", () => {
      const point1 = new Point(-2, -3);
      const point2 = new Point(-3, -5);
      assert.approximately(point1.findDistanceTo(point2), 2.236, 2.2);
    });
    it("should give distance as 0 when both the points are equal", () => {
      const point1 = new Point(1, 2);
      const point2 = new Point(1, 2);
      assert.strictEqual(point1.findDistanceTo(point2), 0);
    });
    it("should give the decimal distance when the distance between two points are decimal value", function() {
      const point1 = new Point(1, 2);
      const point2 = new Point(3, 11.9);
      assert.strictEqual(point1.findDistanceTo(point2), 10.1);
    });
    it("should give distance as 0 when the reference of two points are equal", function() {
      const point1 = new Point(1, 2);
      assert.strictEqual(point1.findDistanceTo(point1), 0);
    });
    it("should give NaN when the given point is not an instance of Point", function() {
      const point1 = new Point(1, 2);
      const point2 = { x: 3, y: 3 };
      assert.isNaN(point1.findDistanceTo(point2));
    });
  });

  describe("isOn", () => {
    it("should validate a point that is in the line", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(4, 4);
      assert.isTrue(point.isOn(line));
    });
    it("should validate a point that is in the endA of line", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(0, 0);
      assert.isTrue(point.isOn(line));
    });
    it("should validate a point that is in the endB of line", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(10, 10);
      assert.isTrue(point.isOn(line));
    });
    it("should invalidate a point that is in the same line but not in the same segment", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(11, 11);
      assert.isFalse(point.isOn(line));
    });
    it("should validate a point that is parallel to x axis and given a point on the line", () => {
      const line = new Line({ x: 0, y: 5 }, { x: 10, y: 5 });
      const point = new Point(2, 5);
      assert.isTrue(point.isOn(line));
    });
    it("should validate a point that is parallel to y axis and given a point on the line", () => {
      const line = new Line({ x: 5, y: 0 }, { x: 5, y: 10 });
      const point = new Point(5, 5);
      assert.isTrue(point.isOn(line));
    });
  });
});
