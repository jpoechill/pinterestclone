import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default () => new Vuex.Store({
  state: () => ({
    count: 0,
    currUser: '',
    allPins: [
        // {
        //     pinID: "123",
        //     pinURL: "https://images.unsplash.com/photo-1543363950-725dc7180660?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=802&q=80",
        //     pinName: "Pin 1",
        //     pinnedBy: 'Angela',
        //     pinners: ['Angela']
        // },
        // {
        //     pinID: "124",
        //     pinURL: "https://images.unsplash.com/photo-1548373564-99ab96ed0dc2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        //     pinName: "Pin 2",
        //     pinnedBy: 'Angela',
        //     pinners: ['Marie']
        // },
        // {
        //     pinID: "125",
        //     pinURL: "https://images.unsplash.com/photo-1542840410-3092f99611a3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
        //     pinName: "Pin 3",
        //     pinnedBy: 'Angela',
        //     pinners: ['Joe', 'Po']
        // }
    ],
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