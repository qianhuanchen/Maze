class DrawMaze {
  constructor(i, j) {
    this.date = new MazeDate(i, j);
    this.dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    this.linke = [];
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

  update() {
    for (let i = 0; i < this.date.n; i++) {
      let dom = document.getElementById('maps');
      for (let j = 0; j < this.date.m; j++) {
        let cell = dom.querySelector(`.col:nth-child(${i + 1})>div:nth-child(${j + 1})`)
        if (this.date.result[i][j] && cell !== null) {
          console.log(this.date.result[i][j], this.date.visited[i][j]);
          cell.classList.add('path');
        }
      }
    }
  }



  inArea(x, y) {
    return x >= 0 && x < this.date.n && y >= 0 && y < this.date.m;
  }

  run() {
    this.setDate(-1, -1);
    let stack = new RandomQueue();
    stack.add(new Position(this.date.enternceX, this.date.entranceY + 1));
    this.date.visited[this.date.enternceX][this.date.entranceY] = true;

    while (stack.list.length) {
      let cur = stack.remove();

      for (let i = 0; i < 4; i++) {
        let newX = cur.x + this.dir[i][0] * 2;
        let newY = cur.y + this.dir[i][1] * 2;
        if (this.inArea(newX, newY) && !this.date.visited[newX][newY]) {
          stack.add(new Position(newX, newY));
          this.date.visited[newX][newY] = true;
          this.setDate(cur.x + this.dir[i][0], cur.y + this.dir[i][1]);
        }
      }
    }
    this.setDate(-1, -1);
  }


  runGo() {
    this.repaint()
    this.setDateRun(-1, -1, false);
    console.log(this.date.enternceX)
    this.linke.push(new Position(this.date.enternceX, this.date.entranceY))

    this.date.visited[this.date.enternceX][this.date.entranceY] = true;

    let isSolved = false;
    while (this.linke.length  && !isSolved) {

      let curPos = this.linke.shift();
      console.log(curPos);

      try {
        this.setDateRun(curPos.x, curPos.y, true);
      }catch (e){
        debugger;
      }

      if (curPos.x === this.date.exitX && curPos.y === this.date.exitY) {
        isSolved = true;
        this.findPath(curPos);
        break;
      }
      for (let i = 0; i < 4; i++) {
        let newX = curPos.x + this.dir[i][0];
        let newY = curPos.y + this.dir[i][1];
        if (this.inArea(newX, newY) &&
            this.getMaze(newX, newY) === this.date.road &&
            !this.date.visited[newX][newY]) {

          console.log(newX, newY,1111111);
          this.linke.push(new Position(newX, newY, curPos));
          this.date.visited[newX][newY] = true;

        }
      }
    }
    if (!isSolved) {
      console.log('无解')
    }
    this.setDateRun(-1, -1, false);

  }
  getMaze(i, j) {
    if (!this.inArea(i, j)) {
      console.log("出界");
    }
    return this.date.maze[i][j]
  }
  setDateRun(x, y, isPath) {
    console.log(x, y, isPath);
    if (this.inArea(x, y)) {
      this.date.path[x][y] = isPath;
    }
  }
  setDate(x, y) {
    if (this.inArea(x, y)) {

      this.date.maze[x][y] = this.date.road
    }
  }

  findPath(des) {
    let cur = des;
    while (cur !== null) {
      this.date.result[cur.x][cur.y] = true;
      cur = cur.prev;
    }
    this.update()
  }


}