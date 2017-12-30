import keyCodes from './directions.js'

export default class snake {
  constructor (ctx, size, boardSize) {
    this.ctx = ctx
    this.size = size
    this.boardSize = boardSize
    this.body = [[40, 10], [30, 10], [20, 10], [10, 10]]
    this.head = []
    this.tail = []
  }

  draw () {
    this.ctx.fillStyle = '#99ffbb'

    for (let i = 0; i < this.body.length; i++) {
      this.ctx.fillRect(this.body[i][0], this.body[i][1], this.size, this.size)
    }
  }

  move (direction) {
    this.head = {}
    this.head[0] = this.body[0][0]
    this.head[1] = this.body[0][1]

    if (direction === keyCodes.left) {
      this.head[0] -= this.size
    } else if (direction === keyCodes.right) {
      this.head[0] += this.size
    } else if (direction === keyCodes.up) {
      this.head[1] -= this.size
    } else if (direction === keyCodes.down) {
      this.head[1] += this.size
    }

    this.body.unshift(this.head)
    this.tail = this.body.pop()
  }

  hitsApple (apple) {
    return this.head[0] === apple.x && this.head[1] === apple.y
  }

  eatApple () {
    this.body.push(this.tail)
  }

  hitsWall () {
    return this.head[0] < 0 ||
      this.head[0] >= this.boardSize ||
      this.head[1] < 0 ||
      this.head[1] >= this.boardSize
  }

  hitsTail () {
    for (let i = 1; i < this.body.length; i++) {
      if (this.head[0] === this.body[i][0] && this.head[1] === this.body[i][1]) {
        return true
      }
    }

    return false
  }
}
