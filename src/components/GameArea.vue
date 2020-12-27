<template>
  <div class="game-area">
    <div class="active-blocks">
      <Block
          class="block"
          :block="activeBlock"
          :style="{
          'left':`${activeBlock.x*10}%`,
          'top': `${activeBlock.y}px`,
        }"
      ></Block>
    </div>
    <TeeterTotter/>
  </div>
</template>

<script>
import TeeterTotter from "@/components/TeeterTotter";
import Block from "@/components/Block";
import { mapGetters } from 'vuex'
export default {
  components: {
    TeeterTotter,
    Block
  },
  computed: {
    ...mapGetters([
      'activeBlock'
    ])
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
.active-blocks {
  position: absolute;
  width: 100%;
  height:calc(100%);
  .block {
    position: absolute;
    left: 0;
    top: 0;
  }
}
.game-area {
  margin: 10px auto 0;
  width: 80%;
  height: calc(100vh - 66px);
  display: flex;
  justify-content: center;
  position: relative;
}
</style>
