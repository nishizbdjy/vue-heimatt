import Vue from 'vue'//引入vue
import vueRouter from 'vue-router'//引入vue-router
import login from '@/views/login.vue'//登录页
//挂载
Vue.use(vueRouter)
//配置路由
let router = new vueRouter({
    routes:[
        {
        name : 'login',
        path : '/login',
        component : login
        }
    ]
})


//暴露
export default router