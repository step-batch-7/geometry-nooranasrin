const assert = require("chai").assert;
const Rectangle = require("../src/rectangle");

describe("Rectangle", () => {
  describe("isEqualTo", () => {
    it("should validate when the two instances are equal", () => {
      const rectangle1 = new Rectangle({ x: 10, y: 11 }, { x: 12, y: 13 });
      const rectangle2 = new Rectangle({ x: 10, y: 11 }, { x: 12, y: 13 });
      assert.isTrue(rectangle1.isEqualTo(rectangle2));
    });
    it("should invalidate when the two instances not equal", () => {
      const rectangle1 = new Rectangle({ x: 10, y: 11 }, { x: 12, y: 13 });
      const rectangle2 = new Rectangle({ x: 10, y: 12 }, { x: 12, y: 13 });
      assert.isFalse(rectangle1.isEqualTo(rectangle2));
    });
    it("should invalidate when one rectangle1 is not an instance of Rectangle class", () => {
      const rectangle1 = new Rectangle({ x: 10, y: 11 }, { x: 12, y: 13 });
      const rectangle2 = {
        diagonalEndA: { x: 10, y: 11 },
        diagonalEndB: { x: 12, y: 13 }
      };
      assert.isFalse(rectangle1.isEqualTo(rectangle2));
    });
    it("should invalidate when one is an empty object ", () => {
      const rectangle1 = new Rectangle({ x: 10, y: 11 }, { x: 12, y: 13 });
      const rectangle2 = {};
      assert.isFalse(rectangle1.isEqualTo(rectangle2));
    });
    it("should validate when the reference of both the lines are same", () => {
      const circle = new Rectangle({ x: 10, y: 11 }, { x: 12, y: 13 });
      assert.isTrue(circle.isEqualTo(circle));
    });
  });
});
