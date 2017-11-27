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
      ctx: {},
      snake: [],
      deltaFrame: 0,
      targetFPS: 1,
    }
  },
  methods: {
    gameLoop () {
      this.update()
      this.draw()
    },
    draw () {
      this.ctx.fillStyle = 'white'
      this.ctx.fillRect(0, 0, 500, 500)
      this.ctx.fillStyle = '#99ffbb'

      for (let i = 0; i < this.snake.length; i++) {
        this.ctx.fillRect(this.snake[i][0], this.snake[i][1], 10, 10)
      }
    },
    update () {
      let head = []
      head[0] = this.snake[0][0] + 10
      head[1] = this.snake[0][1]

      this.snake.pop()
      this.snake.unshift(head)
    }
  },
  created () {
    this.deltaFrame = 1000 / this.targetFPS
    this.snake = [[30, 10], [30, 10], [20, 10], [10, 10]]
    let started = false

    Vue.nextTick(() => {
      this.canvas = this.$refs.canvas
      this.ctx = this.canvas.getContext('2d')
      this.ctx.fillStyle = '#cc0000'
      this.ctx.fillRect(150, 150, 10, 10)

      // BUTTON
      if(!started) {
        started = true
        setInterval(this.gameLoop, this.deltaFrame)
      }
    })
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
