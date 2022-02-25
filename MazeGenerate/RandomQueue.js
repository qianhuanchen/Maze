class RandomQueue {
  constructor() {
    this.queue = [];
  }

  add(e) {
    this.queue.push(e);
  }

  remove() {
    if (this.queue.length == 0) {
      console.log('队列异常');
    }
    let randIndex = ~~(Math.random() * this.queue.length);
    let randElement = this.queue[randIndex];
    this.queue.splice(randIndex, 1, this.queue[this.queue.length - 1]);
    this.queue.pop(this.queue.length - 1);

    return randElement;
  }
}