<template>
  <div
      class="block-wrapper"
      :class="block.blockType"
      :style="{
        'transform': `translate(-50%,0)`,
        'width': block.blockType !== 'triangle' ? `${block.blockWidth}px` : 0,
        'height': block.blockType !== 'triangle' ? `${block.blockHeight}px` : 0,
        'border-width': block.blockType === 'triangle' ? `0px ${block.blockWidth/2}px ${block.blockHeight}px ${block.blockWidth/2}px` : 0
      }"
  ><p :style="{'transform': block.blockType === 'triangle' ? `translate(-50%,0)` : 'unset'}">{{block.blockWeight + ' kg'}}</p></div>
</template>

<script>
export default {
  props: {
    block: {
      required: true,
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
  .block {
      transition: .5s;
  }
  .block-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #FFF;
    p {
      margin: 0;
    }
  }
  .triangle {
    width: 0;
    height: 0;
    border-style: solid;
    border-color: transparent transparent #007bff transparent;
    p {
      position: absolute;
      text-align: center;
      top: 0;
      left: 50%;
      transform: translate(-50%,-50%);
      width: 30px;
      height: 30px;
      margin: 0;
    }
  }
  .circle {
    border-radius: 50%;
    background-color: red;
  }

  .rectangle {
    background-color: #000;
  }
</style>
