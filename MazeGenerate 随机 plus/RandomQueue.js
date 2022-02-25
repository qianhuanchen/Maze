class RandomQueue {
  constructor() {
    this.list = [];
  }

  add(e) {
    if (Math.random() < 0.5) {
      this.list.unshift(e);
    } else {
      this.list.push(e);

    }
  }

  remove() {
    if (this.list.length === 0) {
      console.log('不合法');
    }
    if (Math.random() < 0.5) {
      return this.list.shift();
    } else {
      return this.list.pop();
    }
  }

}