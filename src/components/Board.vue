<template>
  <div class="hello">
    <canvas ref="canvas" width="500px" height="500px">
    </canvas>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'hello',
  data () {
    return {
      canvas: {},
      context: {},
      snake: [],
      deltaFrame: 0,
      targetFPS: 15,
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      direction: 0,
      loop: 0,
      apple: [],
      boardSize: 500,
      score: 0
    }
  },
  methods: {
    gameLoop () {
      this.update()
      this.draw()
    },
    draw () {
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.boardSize, this.boardSize)

      this.ctx.fillStyle = '#cc0000'
      this.ctx.fillRect(this.apple[0], this.apple[1], 10, 10)

      this.ctx.fillStyle = '#99ffbb'

      for (let i = 0; i < this.snake.length; i++) {
        this.ctx.fillRect(this.snake[i][0], this.snake[i][1], 10, 10)
      }
    },
    update () {
      let head = []
      head[0] = this.snake[0][0]
      head[1] = this.snake[0][1]

      if (this.direction === this.left) {
        head[0] -= 10
      } else if (this.direction === this.right) {
        head[0] += 10
      } else if (this.direction === this.up) {
        head[1] -= 10
      } else if (this.direction === this.down) {
        head[1] += 10
      }

      this.checkForCollisions(head)

      if (head[0] === this.apple[0] && head[1] === this.apple[1]) {
        this.createApple()
        this.score++
        clearInterval(this.loop)
        this.loop = setInterval(this.gameLoop, 1000 / (this.targetFPS + this.score))
      } else {
        this.snake.pop()
      }

      this.snake.unshift(head)
    },
    checkForApple (head) {
      
    },
    createApple () {
      this.apple = [this.randomInteger() * 10, this.randomInteger() * 10]
    },
    randomInteger () {
      return Math.floor(Math.random() * 50)
    },
    checkForCollisions (head) {
      if (head[0] < 0 || head[0] >= this.boardSize || head[1] < 0 || head[1] >= this.boardSize) {
        clearInterval(this.loop)
      }
    },
    handleKeyDown (event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault()
        this.direction = event.keyCode
      }
    }
  },
  created () {
    this.deltaFrame = 1000 / this.targetFPS
    this.snake = [[40, 10], [30, 10], [20, 10], [10, 10]]
    this.direction = this.right
    this.createApple()

    Vue.nextTick(() => {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')

      // BUTTON
      this.loop = setInterval(this.gameLoop, this.deltaFrame)
    })
  },
  mounted () {
    window.addEventListener('keydown', this.handleKeyDown.bind(this))
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown.bind(this))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-weight: normal;
}

canvas {
  margin : 50px;
  border: 2px solid #e6e6e6;
}
</style>
