import Vue from 'vue'
import App from './App.vue'
//路由文件
import router from '@/router'
//初始化css
import '@/style/reset.css'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注入路由
  router
}).$mount('#app')
