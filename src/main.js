import Vue from 'vue'
import App from './App.vue'
//路由文件
import router from '@/router'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注入路由
  router
}).$mount('#app')
