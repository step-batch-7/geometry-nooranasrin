const assert = require("assert");
const Line = require("../src/line");

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
