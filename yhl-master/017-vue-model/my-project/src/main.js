import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//加载公共css样式
import './assets/css/common.css'

//加载全局vant组件
import './plugins/vant'

//共享store组件信息
import store from './store/index.js'

//引入路由
import router from './router/index.js'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')