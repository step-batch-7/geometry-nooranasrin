const arePointsEqual = function(point1, point2) {
  return point1.x === point2.x && point1.y === point2.y;
};

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  isEqual(other) {
    if (!(other instanceof Point)) return false;
    return arePointsEqual(this, other);
  }
}

module.exports = Point;