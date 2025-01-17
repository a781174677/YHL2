import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//加载全局css样式
import './assets/css/common.css'
import store from './store'
//引入路由
import router from './router/index.js'

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
