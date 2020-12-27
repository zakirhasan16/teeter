<template>
  <div id="app">
    <Header />
    <GameArea />
  </div>
</template>

<script>
import Header from "@/components/Header";
import GameArea from "@/components/GameArea";
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'App',
  components: {
    Header,
    GameArea
  },
  computed: {
    ...mapGetters([
      'activeBlock',
      'isStarted',
      'getXBlocksHeight',
      'getMomentum'
    ]),
    xBlockHeight() {
      return this.getXBlocksHeight(this.activeBlock.x)
    }
  },
  methods: {
    ...mapMutations([
      'setActiveBlock',
      'toggleGame',
      'pushToBlocks',
      'resetActiveBlock',
    ])
  },
  mounted() {
    let gameAreaHeight = document.querySelector('.game-area').clientHeight,
        teeterHeight = 210;

    window.addEventListener('keyup', (e) => {
      if(this.isStarted) {
        if(e.key === 'ArrowLeft') {
          if(this.activeBlock.x >= 1) {
            this.setActiveBlock({...this.activeBlock, x: this.activeBlock.x - 1})
          }
        }
        if(e.key === 'ArrowRight') {
          if(this.activeBlock.x <= 9) {
            this.setActiveBlock({...this.activeBlock, x: this.activeBlock.x + 1})
          }
        }
      }
      if(e.code === 'Space') {
        this.toggleGame()
      }
    })
    setInterval(() => {
      if(this.isStarted) {
        let max = gameAreaHeight-teeterHeight-this.xBlockHeight - this.activeBlock.blockHeight;
        let colision = max;
        let momentum = this.getMomentum;
        let width = document.querySelector('.game-area').offsetWidth/10;

        let height = 10;

        let rad = momentum * Math.PI / 180,
            sin = Math.sin(rad),
            cos = Math.cos(rad);

        let newHeight = Math.abs(width * sin) + Math.abs(height * cos);
        if (this.activeBlock.x < 5) {
          if (momentum >0) {
            colision = max - (newHeight * (5 - this.activeBlock.x) )
          } else {
            colision = max + (newHeight * (5 - this.activeBlock.x) )
          }
        } else if(this.activeBlock.x > 5){
          if (momentum >0) {
            colision = max + (newHeight * (this.activeBlock.x-5) )
          } else {
            colision = max - (newHeight * (this.activeBlock.x-5) )
          }
        }
        if(this.activeBlock.y < colision) {
          this.setActiveBlock({...this.activeBlock, y: Math.min(this.activeBlock.y + this.activeBlock.blockHeight, colision)})
        } else {
          this.pushToBlocks({...this.activeBlock, y: max })
          this.resetActiveBlock()
        }
      }
    },500)
  }
}
</script>

<style lang="scss">
body {
  overflow: hidden;
}
</style>
