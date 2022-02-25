class DrawMaze {
  constructor(i, j) {
    this.date = new MazeDate(i, j);
    this.dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    this.stack = [];
    this.run()
  }

  repaint() {
    for (let i = 0; i < this.date.n; i++) {
      let box = document.getElementById('maps');
      let div = document.createElement('div');
      div.className = 'col'
      box.append(div);
      for (let j = 0; j < this.date.m; j++) {
        let dom = document.getElementsByClassName('col')[i]
        let div2 = document.createElement('div');
        if (this.getMaze(i, j) === this.date.wall) {
          div2.className = 'wall'
        } else if (this.getMaze(i, j) === this.date.road) {
          div2.className = 'road'
        }
        dom.append(div2);
      }
    }
  }

  getMaze(i, j) {
    if (!this.inArea(i, j)) {
      console.log("出界");
    }
    return this.date.maze[i][j]
  }

  inArea(x, y) {
    return x >= 0 && x < this.date.n && y >= 0 && y < this.date.m;
  }

  run() {
    this.setDate(-1, -1);
    this.stack.push(new Position(this.date.enternceX, this.date.entranceY + 1));
    this.date.visited[this.date.enternceX][this.date.entranceY] = true;

    while (this.stack.length) {
      let cur = this.stack.pop();

      for (let i = 0; i < 4; i++) {
        let newX = cur.x + this.dir[i][0] * 2;
        let newY = cur.y + this.dir[i][1] * 2;
        if (this.inArea(newX, newY) && !this.date.visited[newX][newY]) {
          this.stack.push(new Position(newX,newY));
          this.date.visited[newX][newY]=true;
          this.setDate(cur.x+this.dir[i][0],cur.y + this.dir[i][1]);
        }
      }
    }
    this.setDate(-1, -1);
  }

  setDate(x, y) {
    if (this.inArea(x, y)) {
      console.log(123);
      this.date.maze[x][y] = this.date.road
    }
  }
}