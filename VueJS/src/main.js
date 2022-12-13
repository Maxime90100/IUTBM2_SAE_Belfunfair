import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import Router from "@/router/index";
import CSS from "@/assets/css/index.css"

Vue.config.productionTip = false
Vue.use(CSS)

new Vue({
  router: Router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
