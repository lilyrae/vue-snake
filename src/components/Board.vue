<template>
  <div class="hello">
    <canvas ref="canvas" width="500px" height="500px"></canvas>
    <div class="linebreak"></div>
    <button @click="startGame">Start</button>
  </div>
</template>

<script>
import Snake from '../snake.js'
import Apple from '../apple.js'
import directions from '../directions.js'

export default {
  name: 'hello',
  data () {
    return {
      canvas: {},
      context: {},
      snake: {},
      apple: {},
      loop: 0,
      targetFPS: 15,
      boardSize: 500,
      partSize: 10,
      direction: 0,
      score: 0
    }
  },
  methods: {
    startGame () {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      this.snake = new Snake(this.ctx, this.partSize, this.boardSize)
      this.apple = new Apple(this.ctx, this.partSize, this.boardSize)
      this.score = 0
      this.direction = directions.right

      this.loop = setInterval(this.gameLoop, this.calculateTimeInterval())
    },
    calculateTimeInterval () {
      return 1000 / (this.targetFPS + this.score)
    },
    gameLoop () {
      this.update()
      this.draw()
    },
    draw () {
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, this.boardSize, this.boardSize)

      this.apple.draw()
      this.snake.draw()
    },
    update () {
      this.snake.move(this.direction)

      if (this.snake.hitsWall()) {
        this.endGame()
      }

      if (this.snake.hitsTail()) {
        this.endGame()
      }

      if (this.snake.hitsApple(this.apple)) {
        this.snake.eatApple()
        this.apple.create()
        this.updateScore()
      }
    },
    endGame () {
      clearInterval(this.loop)
    },
    updateScore () {
      this.score++
      clearInterval(this.loop)
      this.loop = setInterval(this.gameLoop, this.calculateTimeInterval())
    },
    handleKeyDown (event) {
      if (event.keyCode >= 37 && event.keyCode <= 40) {
        event.preventDefault()
        this.direction = event.keyCode
      }
    }
  },
  mounted () {
    window.addEventListener('keydown', this.handleKeyDown)
  },
  beforeDestroy () {
    window.removeEventListener('keydown', this.handleKeyDown)
  }
}
</script>

<style scoped>

.hello {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
}

.linebreak {
  width: 100%;
}

canvas {
  margin : 25px;
  border: 2px solid #e6e6e6;
}

button {
  padding: 9px 12px;
  padding-top: 7px;
  margin-right: 5px;
  margin-bottom: 8px;
  
  min-width: 120px;
  line-height: 20px;

  color: #fff;
  background-color: #5bc0de;

  font-size: 14px;
  font: 14px/20px "Helvetica Neue",Helvetica,Arial,sans-serif;

  text-align: center;
  vertical-align: middle;

  border: none;
  -webkit-border-radius: 3px;
  -webkit-border-radius: 3px;
  -webkit-border-radius: 3px;
  
  text-shadow: none;
  box-shadow: none;
  transition: all 0.12s linear 0s !important;
}

</style>
