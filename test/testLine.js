"use strict";
const assert = require("chai").assert;
const Line = require("../src/line");

describe("Line", () => {
  describe("isEqual", () => {
    it("should validate when the two instances are equal", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      assert.isTrue(line.isEqual(otherLine));
    });
    it("should invalidate when the two instances not equal", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = new Line({ x: 11, y: 11 }, { x: 12, y: 13 });
      assert.isFalse(line.isEqual(otherLine));
    });
    it("should invalidate when one line is not an instance of Line class", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = { endA: { x: 10, y: 11 }, endB: { x: 12, y: 13 } };
      assert.isFalse(line.isEqual(otherLine));
    });
    it("should invalidate when one is an empty object ", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = {};
      assert.isFalse(line.isEqual(otherLine));
    });
    it("should validate when the reference of both the lines are same", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 1 });
      assert.isTrue(line.isEqual(line));
    });
  });

  describe("toString", () => {
    it("should give the string format of the object", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      assert.strictEqual(line.toString(), "Line : (10, 11) (12, 13)");
    });
  });

  describe("length", () => {
    it("should give the length when the coordinates are positive", () => {
      const line = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      assert.deepStrictEqual(line.length, 5);
    });
    it("should give the length of the given line when one of the coordinate is negative", () => {
      const line = new Line({ x: -2, y: 3 }, { x: 5, y: 2 });
      assert.approximately(line.length, 7.07, 7.07);
    });
    it("should give the length of the given line when the coordinates are negative", () => {
      const line = new Line({ x: -2, y: -3 }, { x: -3, y: -5 });
      assert.approximately(line.length, 2.236, 2.2);
    });
    it("should calculate length when line having same end points", () => {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      assert.strictEqual(line.length, 0);
    });
  });

  describe("isParallelTo", () => {
    it("should validate when two lines are parallel", () => {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      const otherLine = new Line({ x: 5, y: 5 }, { x: 9, y: 6 });
      assert.isTrue(line.isParallelTo(otherLine));
    });
    it("should validate when one line is not an instance of class", () => {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      const otherLine = { endA: { x: 5, y: 5 }, endB: { x: 9, y: 6 } };
      assert.isFalse(line.isParallelTo(otherLine));
    });
    it("should invalidate when two lines are not parallel", () => {
      const line = new Line({ x: 3, y: 5 }, { x: 7, y: 5 });
      const otherLine = new Line({ x: 5, y: 5 }, { x: 9, y: 6 });
      assert.isFalse(line.isParallelTo(otherLine));
    });
    it("should invalidate when one is an empty object ", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = {};
      assert.isFalse(line.isParallelTo(otherLine));
    });
    it("should invalidate if lines are perpendicular to each other", () => {
      let line1 = new Line({ x: -3, y: -2 }, { x: 1, y: -2 });
      let line2 = new Line({ x: 3, y: 2 }, { x: -1, y: -2 });
      assert.isFalse(line1.isParallelTo(line2));
    });
    it("should invalidate if lines intersect each other", () => {
      let line1 = new Line({ x: 3, y: 2 }, { x: 1, y: 3 });
      let line2 = new Line({ x: 3.2, y: 2 }, { x: -1, y: 1 });
      assert.isFalse(line1.isParallelTo(line2));
    });
    it("should invalidate overlapping lines", () => {
      let line1 = new Line({ x: 0, y: 0 }, { x: 1, y: 1 });
      let line2 = new Line({ x: 2, y: 2 }, { x: 3, y: 3 });
      assert.isFalse(line1.isParallelTo(line2));
    });
    it("should invalidate overlapping lines when the line references are same", () => {
      let line1 = new Line({ x: 0, y: 0 }, { x: 1, y: 1 });
      assert.isFalse(line1.isParallelTo(line1));
    });
  });

  describe("slope", () => {
    it("should give the slope of a line when slope is positive", () => {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      assert.approximately(line.slope, 0.25, 0.25);
    });
    it("should give 0 as slope when the line is parallel to x axis", () => {
      const line = new Line({ x: -3, y: 4 }, { x: 3, y: 4 });
      assert.approximately(line.slope, 0, 0);
    });
    it("should give the infinity when the line is parallel to y axis", () => {
      const line = new Line({ x: 4, y: -4 }, { x: 4, y: 4 });
      assert.strictEqual(line.slope, Infinity);
    });
    it("Should give slope of a line when slope is negative", () => {
      const line = new Line({ x: 7, y: 2 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, -0.25);
    });
  });

  describe("findX", () => {
    it("should give the x coordinate when the y coordinate is positive", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 2, y: 2 });
      const actual = line.findX(1);
      assert.strictEqual(actual, 1);
    });
    it("should give the x coordinate when the y coordinate is negative", () => {
      const line = new Line({ x: 0, y: 0 }, { x: -2, y: -2 });
      const actual = line.findX(-1);
      assert.strictEqual(actual, -1);
    });
    it("should give the x coordinate when y is 0", () => {
      const line = new Line({ x: 0, y: 0 }, { x: -2, y: -2 });
      const actual = line.findX(0);
      assert.strictEqual(actual, 0);
    });
  });
});
