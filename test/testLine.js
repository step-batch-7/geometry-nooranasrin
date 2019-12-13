const assert = require("assert");
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
});
