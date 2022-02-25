class MazeDate {
  constructor() {
    this.entranceX = 1;
    this.entranceY = 0;
    this.exitX = this.N - 2
    this.exitY = this.M - 1;
    this.road = 0;
    this.wall = 1;
    this.maze = 0;//迷宫数组
    this.maps = 0;//难度和迷宫数组
    this.visited = 0//boolean判断是否走过
    this.path = 0;
    this.N = 0;
    this.M = 0;
    this.result = 0;
  }

  readFiles(files) {
    let file = files[0];
    let reader = new FileReader();
    let that = this;
    reader.onload = function () {
      let aaa = JSON.parse(this.result);
      that.maps = aaa;
      that.N = aaa.maps[0].length;
      that.M = aaa.maps[0][0].length;
      that.exitX = that.N - 2;
      that.exitY = that.M - 1;
      that.maze = aaa.maps[0];
      that.start();
    };
    reader.readAsText(file);
  }

  start() {
    for (let i = 0; i < this.N; i++) {
      let box = document.getElementById('maps');
      let div = document.createElement('div');
      div.className = 'col'
      box.append(div);
      for (let j = 0; j < this.M; j++) {
        let dom = document.getElementsByClassName('col')[i]
        let div2 = document.createElement('div');
        if (this.getMaze(i, j) === this.wall) {
          div2.className = 'wall'
        } else if (this.getMaze(i, j) === this.road) {
          div2.className = 'road'
        }
        dom.append(div2);
      }
    }

    let dp = Array.from(new Array(this.N), () => {
      return new Array(this.M).fill(false)
    })
    this.visited = [...dp];//初始化
    this.path = [...dp]//初始化
    this.result = Array.from(new Array(this.N), () => {
      return new Array(this.M).fill(false)
    })//初始化

    this.update()
  }

  update() {
    for (let i = 0; i < this.N; i++) {
      let dom = document.getElementById('maps');
      for (let j = 0; j < this.M; j++) {
        let cell = dom.querySelector(`.col:nth-child(${i + 1})>div:nth-child(${j + 1})`)
        if (this.result[i][j] && cell !== null) {
          console.log(this.result[i][j], this.visited[i][j]);
          cell.classList.add('path');
        }
      }
    }
  }


  getMaze(i, j) {
    if (!this.inArea(i, j)) {
      console.log("出界");
    }
    return this.maze[i][j]
  }

  getEntranceX() {
    return this.entranceX;
  }

  getEntranceY() {
    return this.entranceY;
  }

  getExitX() {
    return this.exitX
  }

  getExitY() {
    return this.exitY;
  }


  /**
   * 判断当前坐标是否在棋盘内
   * @param x
   * @param y
   * @returns {boolean}
   */
  inArea(x, y) {
    return x >= 0 && x < this.N && y >= 0 && y < this.M;
  }
}
