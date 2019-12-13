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
    it("should give false when the two instances are not equal", function() {
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
      const actual = testLine.toString;
      const expected = "Line : (10, 11) (12, 13)";
      assert.strictEqual(actual, expected);
    });
  });

  describe("length", function() {
    it("should give the length of the given line if the square root of sum of squares of differences of same coordinates is a perfect square", function() {
      const line = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      const expectedLine = 5;
      assert.deepStrictEqual(line.length, expectedLine);
    });
    it("should give the length of the given line if the square root sum of squares of differences of same coordinates is not a perfect square", function() {
      const line = new Line({ x: 7, y: 3 }, { x: 5, y: 2 });
      const expectedLine = 2.2360679;
      assert.approximately(line.length, expectedLine, 2.2);
    });
  });

  describe("isParallelTo", function() {
    it("should give true if two lines are parallel", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      const otherLine = new Line({ x: 5, y: 5 }, { x: 9, y: 6 });
      assert.isTrue(line.isParallelTo(otherLine));
    });
    it("should give false if two lines are not parallel", function() {
      const line = new Line({ x: 3, y: 5 }, { x: 7, y: 5 });
      const otherLine = new Line({ x: 5, y: 5 }, { x: 9, y: 6 });
      assert.isFalse(line.isParallelTo(otherLine));
    });
  });

  describe("slope", function() {
    it("should give the slope of a line", function() {
      const line = new Line({ x: 3, y: 4 }, { x: 7, y: 5 });
      const expected = 0.25;
      assert.approximately(line.slope, expected, 0.25);
    });
  });
});
