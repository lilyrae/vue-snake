export default class apple {
  constructor (ctx, size, boardSize) {
    this.ctx = ctx
    this.size = size
    this.boardSize = boardSize
    this.position = {}

    this.create()
  }

  get x () {
    return this.position.x
  }

  get y () {
    return this.position.y
  }

  draw () {
    this.ctx.fillStyle = '#cc0000'
    this.ctx.fillRect(this.position.x, this.position.y, this.size, this.size)
  }

  create (direction) {
    this.position.x = this.randomPosition()
    this.position.y = this.randomPosition()
  }

  randomPosition () {
    return Math.floor(Math.random() * this.boardSize / this.size) * this.size
  }
}
