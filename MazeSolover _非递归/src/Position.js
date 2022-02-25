class Position {
  constructor(x, y,prev=null) {
    this.x = x;
    this.y = y;
    this.prev=prev;
  }

  getX() {
    return this.x;

  }

  getY() {
    return this.y;

  }
}