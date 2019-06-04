import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: () => ({
    count: 0,
    currUser: '',
    allPins: [],
  }),
  getters: {
    currUser: (state)  => {
      return state.currUser
    },
    allPins: (state) => {
      return state.allPins
    }
  },
  mutations: {
    increment(state) {
      state.count++
    },
    createNewPin(state, payload) {
        state.allPins.push(payload)
    },
    updateAllPins(state, payload) {
        state.allPins = payload
    },
    updatePin(state, payload) {
        let pinID = payload[0]
        let currUser = payload[1]

        state.allPins.forEach((pin, index) => {
            if (pin.pinID === pinID) {
                state.allPins[index].pinners.push(currUser)
            }
        });
    },
    setCurrUser(state, payload) {
        state.currUser = payload
    }
  },
  actions: {
    increment(context) {
      context.commit('increment')
    }
  }
})