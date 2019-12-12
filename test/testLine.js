const assert = require("assert");
const Line = require("../src/line");

describe("testLine", function() {
  describe("isEqual", function() {
    it("should give true when the two instances are equal", function() {
      let testLine = new Line(10, 11, 12, 13);
      let otherLine = new Line(10, 11, 12, 13);
      let actual = testLine.isEqual(otherLine);
      assert.ok(actual);
    });
    it("should give false when the two instances are not equal", function() {
      let testLine = new Line(10, 11, 12, 13);
      let otherLine = { x1: 10, y1: 11, x2: 12, y2: 13 };
      let actual = testLine.isEqual(otherLine);
      assert.ok(!actual);
    });
  });
  describe("testToString", function() {
    it("should give the string format of the object", function() {
      let testLine = new Line(10, 11, 12, 13);
      let actual = testLine.toString;
      let expected = "Line : (10, 11) (12, 13)";
      assert.strictEqual(actual, expected);
    });
  });
});
