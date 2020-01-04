import Vue from 'vue'//引入vue
import vueRouter from 'vue-router'//引入vue-router
import login from '@/views/login.vue'//登录页
import personal from '@/views/personal.vue'//个人中心页
//挂载
Vue.use(vueRouter)
//配置路由
let router = new vueRouter({
    routes:[
        //登陆页
        {
        name : 'login',
        path : '/login',
        component : login
        },
        //个人中心页
        {
            name : 'personal',
            path : '/personal',
            component : personal
        }
    ]
})


//暴露
export default router