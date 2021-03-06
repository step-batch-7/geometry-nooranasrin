"use strict";
const assert = require("chai").assert;
const Line = require("../src/line");
const Point = require("../src/point");

describe("Line", () => {
  describe("isEqualTo", () => {
    it("should validate when the two instances are equal", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      assert.isTrue(line.isEqualTo(otherLine));
    });
    it("should invalidate when lines of unequal start points ", () => {
      const line1 = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const line2 = new Line({ x: 5, y: 6 }, { x: 3, y: 4 });
      assert.isFalse(line1.isEqualTo(line2));
    });

    it("should invalidate when lines of unequal end points", () => {
      const line1 = new Line({ x: 1, y: 2 }, { x: 3, y: 4 });
      const line2 = new Line({ x: 1, y: 2 }, { x: 7, y: 8 });
      assert.isFalse(line1.isEqualTo(line2));
    });
    it("should invalidate when one line is not an instance of Line class", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = { endA: { x: 10, y: 11 }, endB: { x: 12, y: 13 } };
      assert.isFalse(line.isEqualTo(otherLine));
    });
    it("should invalidate when one is an empty object ", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = {};
      assert.isFalse(line.isEqualTo(otherLine));
    });
    it("should validate when the reference of both the lines are same", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 1 });
      assert.isTrue(line.isEqualTo(line));
    });
    it("should validate when start of one line is equal to end of other line and vise versa", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      const otherLine = new Line({ x: 12, y: 13 }, { x: 10, y: 11 });
      assert.isTrue(line.isEqualTo(otherLine));
    });
  });

  describe("toString", () => {
    it("should give the string format of the object", () => {
      const line = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      assert.strictEqual(line.toString(), "[Line (10,11) to (12,13)]");
    });
  });

  describe("length", () => {
    it("should give the length when the coordinates are positive", () => {
      const line = new Line({ x: 2, y: 1 }, { x: 6, y: 4 });
      assert.strictEqual(line.length, 5);
    });
    it("should give the length of the given line when one of the coordinate is negative", () => {
      const line = new Line({ x: -2, y: 3 }, { x: 5, y: 2 });
      assert.approximately(line.length, 7.07, 7.07);
    });
    it("should give the length of the given line when the coordinates are negative", () => {
      const line = new Line({ x: -2, y: -3 }, { x: -3, y: -5 });
      assert.approximately(line.length, 2.236, 2.2);
    });
    it("should give the length when line having same end points", () => {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      assert.strictEqual(line.length, 0);
    });
    it("should give the decimal length when the length of the line is decimal", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 3, y: 11.9 });
      assert.strictEqual(line.length, 10.1);
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
    it("should validate if two vertical lines are parallel", function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 10 });
      const line2 = new Line({ x: 2, y: 2 }, { x: 2, y: 20 });
      assert.isTrue(line1.isParallelTo(line2));
    });
    it("should validate if two horizontal lines are parallel", function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 10, y: 0 });
      const line2 = new Line({ x: 5, y: 2 }, { x: 7, y: 2 });
      assert.isTrue(line1.isParallelTo(line2));
    });
    it("should invalidate when two equal line segments are given", function() {
      const line1 = new Line({ x: 1, y: 0 }, { x: 5, y: 5 });
      const line2 = new Line({ x: 1, y: 0 }, { x: 5, y: 5 });
      assert.isFalse(line1.isParallelTo(line2));
    });
    it("should validate when two parallel line segments those are parallel to y axis", function() {
      const line1 = new Line({ x: 2, y: 5 }, { x: 2, y: 7 });
      const line2 = new Line({ x: 3, y: 0 }, { x: 3, y: 5 });
      assert.isTrue(line1.isParallelTo(line2));
    });
    it("should invalidate when two lines are overlapping and on y axis", function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 5 });
      const line2 = new Line({ x: 0, y: 5 }, { x: 0, y: 10 });
      assert.isFalse(line1.isParallelTo(line2));
    });
    it("should invalidate when two lines are overlapping and parallel to y axis", function() {
      const line1 = new Line({ x: 2, y: 0 }, { x: 2, y: 5 });
      const line2 = new Line({ x: 2, y: 5 }, { x: 2, y: 10 });
      assert.isFalse(line1.isParallelTo(line2));
    });
    it("should give true if both lines are parallel to Y-axis and slope is in negative", function() {
      const line1 = new Line({ x: 0, y: 0 }, { x: 0, y: 4 });
      const line2 = new Line({ x: 1, y: 1 }, { x: 1, y: -3 });
      assert.isTrue(line1.isParallelTo(line2));
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
    it("should give NaN if end points of the line are same", function() {
      const line = new Line({ x: 1, y: 1 }, { x: 1, y: 1 });
      assert.isNaN(line.slope);
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
    it("should give NaN when the point is outside of the line segment", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 4, y: 4 });
      assert.isNaN(line.findX(5));
    });
    it("should give any valid x value when there are multiple x values available for a given y", function() {
      const line = new Line({ x: 0, y: 0 }, { x: 1, y: 0 });
      assert.strictEqual(line.findX(0), 0);
    });
    it("should give valid whe line is parallel to y axis and has a corresponding point", function() {
      const line = new Line({ x: 4, y: 0 }, { x: 4, y: 4 });
      assert.strictEqual(line.findX(3), 4);
    });
  });

  describe("findY", () => {
    it("should give the y coordinate when the x coordinate is positive", () => {
      let line = new Line({ x: 0, y: 0 }, { x: 2, y: 2 });
      const actual = line.findY(1);
      assert.strictEqual(actual, 1);

      line = new Line({ x: 2, y: 2 }, { x: 0, y: 0 });
      assert.equal(line.findY(1), 1);
    });
    it("should give the y coordinate when the x coordinate is negative", () => {
      const line = new Line({ x: 0, y: 0 }, { x: -2, y: -2 });
      const actual = line.findY(-1);
      assert.strictEqual(actual, -1);
    });
    it("should give the y coordinate when x is 0", () => {
      const line = new Line({ x: 0, y: 0 }, { x: -2, y: -2 });
      const actual = line.findY(0);
      assert.strictEqual(actual, 0);
    });
    it("should give NaN when the point is outside of the line segment", () => {
      let line = new Line({ x: 0, y: 0 }, { x: 4, y: 4 });
      assert.isNaN(line.findY(5));
    });
    it("should give any valid y value when there are multiple y values available for a given x", function() {
      const line = new Line({ x: 0, y: 0 }, { x: 0, y: 1 });
      assert.strictEqual(line.findY(0), 0);
    });
    it("should give y value of start point if there are multiple y values available for a given x", function() {
      const line = new Line({ x: 1, y: 5 }, { x: 1, y: -1 });
      const actualValue = line.findY(1);
      const expectedValue = 5;
      assert.strictEqual(actualValue, expectedValue);
    });
  });

  describe("split", () => {
    it("should split the given line in the middle", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 0 });
      const firstLine = new Line({ x: 0, y: 0 }, { x: 5, y: 0 });
      const secondLine = new Line({ x: 5, y: 0 }, { x: 10, y: 0 });
      const expected = [firstLine, secondLine];
      assert.deepStrictEqual(line.split(), expected);
    });
    it("should split the given line in the middle even it is a floating point", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 9, y: 0 });
      const firstLine = new Line({ x: 0, y: 0 }, { x: 4.5, y: 0 });
      const secondLine = new Line({ x: 4.5, y: 0 }, { x: 9, y: 0 });
      const expected = [firstLine, secondLine];
      assert.deepStrictEqual(line.split(), expected);
    });
    it("should give ", function() {
      const line = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      const actualValue = line.split();
      const line1 = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      const line2 = new Line({ x: 1, y: 2 }, { x: 1, y: 2 });
      const expectedValue = [line1, line2];
      assert.deepStrictEqual(actualValue, expectedValue);
    });
  });

  describe("hasPoint", () => {
    it("should validate a point that is in the line", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(4, 4);
      assert.isTrue(line.hasPoint(point));
    });
    it("should validate a point that is in the endA", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(0, 0);
      assert.isTrue(line.hasPoint(point));
    });
    it("should validate a point that is in the endB", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(10, 10);
      assert.isTrue(line.hasPoint(point));
    });
    it("should invalidate a point that is in the same line but not in the same segment", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(11, 11);
      assert.isFalse(line.hasPoint(point));
    });
    it("should validate a point that is parallel to x axis and given a point on the line", () => {
      const line = new Line({ x: 0, y: 5 }, { x: 10, y: 5 });
      const point = new Point(2, 5);
      assert.isTrue(line.hasPoint(point));
    });
    it("should validate a point that is parallel to y axis and given a point on the line", () => {
      const line = new Line({ x: 5, y: 0 }, { x: 5, y: 10 });
      const point = new Point(5, 5);
      assert.isTrue(line.hasPoint(point));
    });
    it("should invalidate a point that is in the same line but not in the same segment", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = new Point(2, 3);
      assert.isFalse(line.hasPoint(point));
    });
    it("should invalidate a point that is not an instance of class Point", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 10, y: 10 });
      const point = { x: 3, y: 3 };
      assert.isFalse(line.hasPoint(point));
    });
  });

  describe("findPointFromStart", () => {
    it("should give a point on the line in given distance in the forward direction when point is in x axis", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 5, y: 0 });
      const point = new Point(2, 0);
      const pointInDistance = line.findPointFromStart(2);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });
    it("should give a point on the line in given distance in the forward direction when point is in y axis", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 0, y: 5 });
      const point = new Point(0, 2);
      const pointInDistance = line.findPointFromStart(2);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });
    it("should give a point on the line in given distance in the forward direction when all the coordinates are positive", () => {
      const line = new Line({ x: 0, y: 0 }, { x: 6, y: 8 });
      const point = new Point(3, 4);
      const pointInDistance = line.findPointFromStart(5);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });
    it("should give a point on the line in given distance in the forward direction when any of the coordinate is negative", () => {
      const line = new Line({ x: 0, y: 0 }, { x: -6, y: -8 });
      const point = new Point(-3, -4);
      const pointInDistance = line.findPointFromStart(5);
      assert.isTrue(point.isEqualTo(pointInDistance));
    });
    it("should give null when the distance is not a number", () => {
      const line = new Line({ x: 0, y: 0 }, { x: -6, y: -8 });
      const point = new Point(-3, -4);
      const pointInDistance = line.findPointFromStart(`hai`);
      assert.isNull(pointInDistance);
    });
    it("should give null when the distance is less than zero or greater than the line length", () => {
      const line = new Line({ x: 0, y: 0 }, { x: -6, y: -8 });
      const pointInDistance = line.findPointFromStart(-2);
      assert.isNull(pointInDistance);
    });

    describe("findPointFromEnd", () => {
      it("should give a point on the line in given distance in the forward direction when point is in x axis", () => {
        const line = new Line({ x: 5, y: 0 }, { x: 0, y: 0 });
        const point = new Point(2, 0);
        const pointInDistance = line.findPointFromEnd(2);
        assert.isTrue(point.isEqualTo(pointInDistance));
      });
      it("should give a point on the line in given distance in the forward direction when point is in y axis", () => {
        const line = new Line({ x: 0, y: 5 }, { x: 0, y: 0 });
        const point = new Point(0, 2);
        const pointInDistance = line.findPointFromEnd(2);
        assert.isTrue(point.isEqualTo(pointInDistance));
      });
      it("should give a point on the line in given distance in the forward direction when all the coordinates are positive", () => {
        const line = new Line({ x: 6, y: 8 }, { x: 0, y: 0 });
        const point = new Point(3, 4);
        const pointInDistance = line.findPointFromEnd(5);
        assert.isTrue(point.isEqualTo(pointInDistance));
      });
      it("should give start Point if given distance is equal to length", function() {
        const line = new Line({ x: 0, y: 1 }, { x: 0, y: 9 });
        const actualValue = line.findPointFromEnd(8);
        const point = new Point(0, 1);
        assert.isTrue(point.isEqualTo(actualValue));
      });
      it("should give a point on the line in given distance in the forward direction when any of the coordinate is negative", () => {
        const line = new Line({ x: -6, y: -8 }, { x: 0, y: 0 });
        const point = new Point(-3, -4);
        const pointInDistance = line.findPointFromEnd(5);
        assert.isTrue(point.isEqualTo(pointInDistance));
      });
      it("should give null when the distance is not a number", () => {
        const line = new Line({ x: 0, y: 0 }, { x: -6, y: -8 });
        const pointInDistance = line.findPointFromEnd(`hai`);
        assert.isNull(pointInDistance);
      });
    });
  });
});
