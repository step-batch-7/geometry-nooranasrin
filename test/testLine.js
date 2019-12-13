"use strict";
const assert = require("chai").assert;
const Line = require("../src/line");

describe("Line", function() {
  describe("isEqual", function() {
    it("should give true when the two instances are equal", function() {
      const testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const actual = testLine.isEqual(otherLine);
      assert.ok(actual);
    });
    it("should invalidate when the two instances not equal", function() {
      const testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = new Line({ x: 11, y: 11 }, { x: 12, y: 13 });
      const actual = testLine.isEqual(otherLine);
      assert.isFalse(actual);
    });
    it("should invalidate when one line is not an instance of Line class", function() {
      const testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = { endA: { x: 10, y: 11 }, endB: { x: 12, y: 13 } };
      const actual = testLine.isEqual(otherLine);
      assert.ok(!actual);
    });
    it("should give false when one is an empty object ", function() {
      const testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = {};
      const actual = testLine.isEqual(otherLine);
      assert.ok(!actual);
    });
  });

  describe("toString", function() {
    it("should give the string format of the object", function() {
      const testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const actual = testLine.toString();
      const expected = "Line : (10, 11) (12, 13)";
      assert.strictEqual(actual, expected);
    });
  });

  describe("length", function() {
    it("should give the length when the coordinates are positive", function() {
      const line = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      const expectedLine = 5;
      assert.deepStrictEqual(line.length, expectedLine);
    });
    it("should give the length of the given line when one of the coordinate is negative", function() {
      const line = new Line({ x: -2, y: 3 }, { x: 5, y: 2 });
      const expectedLine = 7.07;
      assert.approximately(line.length, expectedLine, 7.07);
    });
    it("should give the length of the given line when the coordinates are negative", function() {
      const line = new Line({ x: -2, y: -3 }, { x: -3, y: -5 });
      const expectedLine = 2.236;
      assert.approximately(line.length, expectedLine, 2.2);
    });
    it("should calculate length when line having same end points", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      assert.strictEqual(line.length, 0);
    });
    it("should invalidate if lines are perpendicular to each other", function() {
      let line1 = new Line({ x: -3, y: -2 }, { x: 1, y: -2 });
      let line2 = new Line({ x: 3, y: 2 }, { x: -1, y: -2 });
      assert.isFalse(line1.isParallelTo(line2));
    });
    it("should invalidate if lines intersect each other", function() {
      let line1 = new Line({ x: 3, y: 2 }, { x: 1, y: 3 });
      let line2 = new Line({ x: 3.2, y: 2 }, { x: -1, y: 1 });
      assert.isFalse(line1.isParallelTo(line2));
    });
  });

  describe("isParallelTo", function() {
    it("should give true if two lines are parallel", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      const otherLine = new Line({ x: 5, y: 5 }, { x: 9, y: 6 });
      assert.isTrue(line.isParallelTo(otherLine));
    });
    it("should validate when one line is not an instance of class", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      const otherLine = { endA: { x: 5, y: 5 }, endB: { x: 9, y: 6 } };
      assert.isFalse(line.isParallelTo(otherLine));
    });
    it("should give false if two lines are not parallel", function() {
      const line = new Line({ x: 3, y: 5 }, { x: 7, y: 5 });
      const otherLine = new Line({ x: 5, y: 5 }, { x: 9, y: 6 });
      assert.isFalse(line.isParallelTo(otherLine));
    });
    it("should invalidate when one is an empty object ", function() {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = {};
      assert.isFalse(line.isParallelTo(otherLine));
    });
  });

  describe("slope", function() {
    it("should give the slope of a line when slope is positive", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      const expected = 0.25;
      assert.approximately(line.slope, expected, 0.25);
    });
    it("should give 0 as slope when the line is parallel to x axis", function() {
      const line = new Line({ x: -3, y: 4 }, { x: 3, y: 4 });
      const expected = 0;
      assert.approximately(line.slope, expected, 0);
    });
    it("should give the infinity when the line is parallel to y axis", function() {
      const line = new Line({ x: 4, y: -4 }, { x: 4, y: 4 });
      const expected = Infinity;
      assert.strictEqual(line.slope, expected);
    });
    it("Should give slope of a line when slope is negative", function() {
      const line = new Line({ x: 7, y: 2 }, { x: 3, y: 3 });
      assert.strictEqual(line.slope, -0.25);
    });
  });
});
