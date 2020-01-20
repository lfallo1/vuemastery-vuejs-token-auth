import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import axios from 'axios'

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  created(){
    const userString = localStorage.getItem('user');
    if(userString){
      const userData = JSON.parse(userString);
      console.log(userData);
      this.$store.commit('SET_USER_DATA', userData)
    }
    axios.interceptors.response.use(
      response => response,
      error => {
        console.log(error);
        if(error.message.indexOf('Failed to execute') > -1 || (error.response && error.response.status === 401)){
          this.$store.dispatch('signout');
        }
        return Promise.reject(error);
      }
    )
  },
  render: h => h(App)
}).$mount("#app");
