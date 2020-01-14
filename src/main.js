import Vue from 'vue'
import App from './App.vue'
//路由文件
import router from '@/router'
//初始化css
import '@/style/reset.css'
//引入vant框架
import { Toast, Uploader, Dialog, Field, Picker,Tab,Tabs,List,PullRefresh,Icon} from 'vant'
//挂载
Vue.use(Toast)//轻提示
  .use(Uploader)//文件上传
  .use(Dialog)//弹出框
  .use(Field)//输入框
  .use(Picker)//picker选择器
  .use(Tab).use(Tabs)//滑动标签页
  .use(List)//list列表
  .use(PullRefresh)//下拉刷新
  .use(Icon)//图标
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //注入路由
  router
}).$mount('#app')
