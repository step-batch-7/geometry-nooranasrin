const assert = require("assert");
const { Line, isPointsEqual, isTypeEqual } = require("../src/line");

describe("testLine", function() {
  describe("isEqual", function() {
    it("should give true when the two instances are equal", function() {
      let testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      let otherLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      let actual = testLine.isEqual(otherLine);
      assert.ok(actual);
    });
    it("should give false when the two instances are not equal", function() {
      let testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      let otherLine = { endA: { x: 10, y: 11 }, endB: { x: 12, y: 13 } };
      let actual = testLine.isEqual(otherLine);
      assert.ok(!actual);
    });
  });

  describe("testToString", function() {
    it("should give the string format of the object", function() {
      let testLine = new Line({ x: 10, y: 11 }, { x: 12, y: 13 });
      let actual = testLine.toString;
      let expected = "Line : (10, 11) (12, 13)";
      assert.strictEqual(actual, expected);
    });
  });
});

describe("testIsPointsEqual", function() {
  it("should give true when the inputs are equal", function() {
    let actual = isPointsEqual({ x: 3, y: 3 }, { x: 3, y: 3 });
    assert.ok(actual);
  });

  it("should give false when the inputs are not equal", function() {
    let actual = isPointsEqual({ x: 3, y: 3 }, { x: 3, y: 4 });
    assert.ok(!actual);
  });
});

describe("testIsTypeEqual", function() {
  it("should give true when the two lines are the instance of class Line", function() {
    let firstLine = new Line({ x: 2, y: 4 }, { x: 5, y: 6 });
    let secondLine = new Line({ x: 2, y: 4 }, { x: 5, y: 6 });
    let actual = isTypeEqual(firstLine, secondLine);
    assert.ok(actual);
  });
  it("should give false when any of them or both are not an instance of class Line", function() {
    let firstLine = new Line({ x: 2, y: 4 }, { x: 5, y: 6 });
    let secondLine = { endA: { x: 2, y: 4 }, endB: { x: 5, y: 6 } };
    let actual = isTypeEqual(firstLine, secondLine);
    assert.ok(!actual);
  });
});
