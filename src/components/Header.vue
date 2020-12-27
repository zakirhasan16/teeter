<template>
  <div style="position:relative; z-index: 1000">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>Insider Teeter Totter</b-navbar-brand>
      <b-navbar-nav>
        <b-nav-item @click="toggleGame()">{{ isStarted ? 'Pause Game' : 'Start Game' }}</b-nav-item>
        <b-nav-item @click="resetGame()">Reset Game</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  methods: {
    ...mapMutations([
        'toggleGame',
        'resetGame'
    ]),
  },
  computed: {
    ...mapGetters([
      'isStarted'
    ])
  }
}
</script>

<style scoped>

</style>
