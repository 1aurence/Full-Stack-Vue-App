import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'
import store from './store/index'

Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false

const user = JSON.parse(localStorage.getItem('vuex'));
if (user) {
  Vue.prototype.$user = user.user
}
localStorage.clear()

new Vue({
  render: h => h(App),
  store,
  router,
}).$mount('#app')