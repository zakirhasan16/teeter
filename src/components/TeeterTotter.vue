<template>
  <div class="teeter-totter">
    <div class="w-100">
      <div
          class="stick"
          :style="{'transform': `rotate(${momentum}deg)`}"
      >
        <Block
            v-for="block in getBlocks"
            class="block"
            :block="block"
            :style="blockStyle(block)"
        />
      </div>
      <div class="bottom-triangle"></div>
    </div>
  </div>
</template>

<script>
import Block from "@/components/Block";
import {mapMutations, mapGetters} from 'vuex';

export default {
  components: {
    Block
  },
  watch: {
    momentum(val) {
      this.setMomentum(val);
      if(val >= 30 || val <= -30) {
        alert('Game Over! Angle greater than 30 degrees!')
        this.resetGame()
      }
      if(val === 0) {
        alert('SUCCESS ! You win this game !!!')
        this.resetGame()
      }
    },
    'getBlocks': {
      deep: true,
      handler(val) {
        let leftBlocks = this.getBlocks.filter(block => block.x < 5),
            rightBlocks = this.getBlocks.filter(block => block.x > 5),
            leftWeight = 0,
            rightWeight = 0;

        leftBlocks.forEach(block => {
          leftWeight += block.blockWeight;
        })

        rightBlocks.forEach(block => {
          rightWeight += block.blockWeight;
        })

        if(rightWeight >= 20 || leftWeight >= 20) {
          alert('Game Over! One side is too heavy!')
          this.resetGame()
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getBlocks',
      'getXBlocksHeight'
    ]),

    momentum() {
      let leftBlocks = this.getBlocks.filter(block => block.x < 5),
          rightBlocks = this.getBlocks.filter(block => block.x > 5),
          leftMoment = 0,
          rightMoment = 0,
          totalMoment = 0;

      leftBlocks.forEach(block => {
        leftMoment += (5 - block.x) * block.blockWeight;
      })

      rightBlocks.forEach(block => {
        rightMoment += (block.x - 5) * block.blockWeight;
      })

      totalMoment = rightMoment - leftMoment;

      return totalMoment / 2;
    },
  },
  methods: {
    ...mapMutations([
      'resetGame',
      'setMomentum'
    ]),
    blockStyle(block) {
      return {
        'left': `${block.x * 10}%`,
        'top': block.y ? `${block.y}px` : `calc(100% - ${block.blockHeight}px)`
      }
    },
  },
  mounted() {
    if(this.momentum)
    this.setMomentum(this.momentum)
  }
}
</script>

<style scoped lang="scss">
.teeter-totter {
  align-self: flex-end;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: relative;
  margin-top: auto;
}
.bottom-triangle {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 100px 200px 100px;
  border-color: transparent transparent #666666 transparent;
  margin: 0 auto;
  align-self: flex-end;
}
.stick {
  width: 100%;
  height: calc(100% - 200px);
  border-bottom: 10px solid #007bff;
  display: flex;
  transition: .5s;
  position: absolute;
  top: 0;
  transform-origin: 50% 100%;
  .block {
    position: absolute;
    bottom: 100%;
  }
}
</style>
