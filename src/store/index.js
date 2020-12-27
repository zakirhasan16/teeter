import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    blocks: [
      {
        x: Math.ceil((Math.random() * 5) + 5),
        blockType: ['rectangle','triangle','circle'][Math.floor(Math.random() * 3)],
        blockWidth: 50,
        blockHeight: 50,
        blockWeight: Math.ceil(Math.random() * 10)
      },
    ],
    activeBlock: {
      x: 5,
      y: 0,
      blockWidth: 50,
      blockHeight: 50,
      blockType: ['rectangle','triangle','circle'][Math.floor(Math.random() * 3)],
      blockWeight: Math.ceil(Math.random() * 10)
    },
    isStarted: false,
    momentum: 0
  },
  getters: {
    isStarted(state) {
      return state.isStarted
    },
    getBlocks(state) {
      return state.blocks
    },
    activeBlock(state) {
      return state.activeBlock
    },
    getXBlocksHeight: (state) => (x) => {
      if(state.blocks.filter(block => block.x === x).length) {
        if(state.blocks.filter(block => block.x === x).length > 1) {
          return state.blocks.filter(block => block.x === x).map(block => block.blockHeight).reduce((a,b) => a+b)
        } else {
          return state.blocks.filter(block => block.x === x).map(block => block.blockHeight)[0]
        }
      } else {
        return 0
      }
    },
    getMomentum(state) {
      return state.momentum
    }
  },
  mutations: {
    toggleGame(state) {
      state.isStarted = !state.isStarted
    },
    pushToBlocks(state, payload) {
      state.blocks.push(payload)
    },
    setActiveBlock(state, payload) {
      state.activeBlock = payload
    },
    resetActiveBlock(state) {
      state.activeBlock = {
        x: 5,
        y: 0,
        blockType: ['rectangle','triangle','circle'][Math.floor(Math.random() * 3)],
        blockWeight: Math.ceil(Math.random() * 10),
        blockWidth: 50,
        blockHeight: 50,
      }
    },
    resetGame(state) {
      state.blocks = [
        {
          x: Math.ceil((Math.random() * 5) + 5),
          blockType: ['rectangle','triangle','circle'][Math.floor(Math.random() * 3)],
          blockWeight: Math.ceil(Math.random() * 10),
          blockWidth: 50,
          blockHeight: 50,
        },
      ]
      state.activeBlock = {
        x: 5,
        y: 0,
        blockType: ['rectangle','triangle','circle'][Math.floor(Math.random() * 3)],
        blockWeight: Math.ceil(Math.random() * 10),
        blockWidth: 50,
        blockHeight: 50,
      }
      state.isStarted = false
      state.momentum = 0
    },
    setMomentum(state, payload) {
      state.momentum = payload;
    }
  },
})
