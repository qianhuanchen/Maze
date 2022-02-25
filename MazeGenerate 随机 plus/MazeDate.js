class MazeDate {
  constructor(n, m) {
    this.road = 0;
    this.wall = 1;
    this.n = n;
    this.m = m;
    this.maze = 0;
    this.visited = 0;
    this.enternceX = 0;
    this.entranceY = 0;
    this.exitX = 0;
    this.exitY = 0;

    this.maps = 0;//难度和迷宫数组
    this.path = 0;
    this.result = 0;

    this.init()
  }

  init() {
    if (this.n % 2 === 0 || this.m % 2 === 0) {
      alert('不能使用偶数的宽或者高');
    }
    this.maze = Array.from(new Array(this.n), () => {
      return new Array(this.m);
    });
    this.visited = Array.from(new Array(this.n), () => {
      return new Array(this.m).fill(false);
    });

    for (let i = 0; i < this.n; i++) {
      for (let j = 0; j < this.m; j++) {
        if (i % 2 === 1 && j % 2 === 1) {
          this.maze[i][j] = this.road;
        } else {
          this.maze[i][j] = this.wall;
        }
      }
    }


    this.enternceX = 1;
    this.entranceY = 0;
    this.exitX = this.n - 2;
    this.exitY = this.m - 1

    this.maze[this.enternceX][this.entranceY] = this.road;
    this.maze[this.exitX][this.exitY] = this.road;


    let dp = Array.from(new Array(this.n), () => {
      return new Array(this.m).fill(false)
    })
    this.path = [...dp]//初始化
  }

}

