import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {
    loggedIn (state) {
      return !!state.user
    }
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    },
    CLEAR_USER_DATA(){
      localStorage.setItem('user', '');
      location.reload();
    }
  },
  actions: {
    register({commit}, payload){
      return axios
        .post('//localhost:3000/register', payload)
        .then(({data}) =>{
          commit('SET_USER_DATA', data);
        });
    },
    login ({ commit }, payload) {
      return axios
        .post('//localhost:3000/login', payload)
        .then(({ data }) => {
          commit('SET_USER_DATA', data)
        })
    },
    signout({commit}){
      commit('CLEAR_USER_DATA');
    }
  },
  modules: {}
});
