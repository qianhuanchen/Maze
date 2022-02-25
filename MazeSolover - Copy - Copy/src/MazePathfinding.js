class MazePathfinding {
  constructor() {
    this.dir = [[-1, 0], [0, 1], [1, 0], [0, -1]]
  }

  run() {
    this.setDate(-1, -1, false);
    this.go(mazeDate.getEntranceX(), mazeDate.getEntranceY());
    this.setDate(-1, -1, false);
  }


  go(x, y) { 递归算法
    if (!mazeDate.inArea(x, y)) {
      console.log("不在范围内");
    }
    mazeDate.visited[x][y] = true;
    this.setDate(x, y, true);
    if (x === mazeDate.getExitX() && y === mazeDate.getExitY()) {
      console.log(99999999999);
      mazeDate.update();
      return true;
    }
    for (let i = 0; i < 4; i++) {
      let newX = x + this.dir[i][0];
      let newY = y + this.dir[i][1];
      if (mazeDate.inArea(newX, newY) &&
          mazeDate.getMaze(newX, newY) !== mazeDate.wall &&
          !mazeDate.visited[newX][newY]) {

        if(this.go(newX, newY)){
          return true;
        }

      }
    }
    this.setDate(x, y, false)
    return false;
  }

  setDate(x, y, isPath) {
      console.log(isPath,x,y);
    if (mazeDate.inArea(x, y)) {
      mazeDate.path[x][y] = isPath;
    }
  }
}

window.mazePathfingding = new MazePathfinding();