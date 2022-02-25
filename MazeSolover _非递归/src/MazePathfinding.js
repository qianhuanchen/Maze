class MazePathfinding {
  constructor() {
    this.dir = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    this.stack = [];
  }

  run() {
    this.setDate(-1, -1, false);
    this.stack.push(new Position(mazeDate.getEntranceX(), mazeDate.getEntranceY()))
    mazeDate.visited[mazeDate.getEntranceX()][mazeDate.getEntranceY()] = true;
    let isSolved = false;
    while (this.stack.length || !isSolved) {
      console.log(this.stack);
      let curPos = this.stack.pop();
      this.setDate(curPos.getX(), curPos.getY(), true);
      if (curPos.getX() === mazeDate.getExitX() && curPos.getY() === mazeDate.getExitY()) {
        isSolved = true;
        this.findPath(curPos);
        break;
      }
      for (let i = 0; i < 4; i++) {
        let newX = curPos.getX() + this.dir[i][0];
        let newY = curPos.getY() + this.dir[i][1];
        if (mazeDate.inArea(newX, newY) &&
            mazeDate.getMaze(newX, newY) == mazeDate.road &&
            !mazeDate.visited[newX][newY]) {
          this.stack.push(new Position(newX, newY, curPos));
          mazeDate.visited[newX][newY] = true;
        }
      }
    }
    if (!isSolved) {
      console.log('无解')
    }
    this.setDate(-1, -1, false);

  }

  findPath(des) {
    let cur = des;
    while (cur !== null) {
      mazeDate.result[cur.x][cur.y] = true;
      cur = cur.prev;
    }
    mazeDate.update()
  }


  setDate(x, y, isPath) {
    if (mazeDate.inArea(x, y)) {
      mazeDate.path[x][y] = isPath;
    }
  }
}

window.mazePathfingding = new MazePathfinding();