import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    data:''
  },
  mutations: {
    setData(state,payload) {
      state.data=payload;
    }
  }
})