import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    user: null,
    message:null,
    manifestation:null
  },
  getters: {
  },
  mutations: {
    setManifestation(state){
      axios({
        method: 'get',
        url: 'http://localhost:3000/users/manifestation'
      }).then(result=>{
        state.manifestation = result.data.data[0]
      }).catch(error=>{
        console.log(error)
      })
    },
    setUser(state,user){
      state.user = user
    },
    setMessage(state, message){
      state.message = message
      location.href='#top'
    },
    emptyMessage(state){
      state.message = null
    }

  },
  actions: {
  },
  modules: {
  }
})
