import Vue from 'vue'//引入vue
import vueRouter from 'vue-router'//引入vue-router
import login from '@/views/login.vue'//登录页
import personal from '@/views/personal.vue'//个人中心页
import editPersonal from '@/views/editPersonal.vue'//编辑资料页
import index from '@/views/index.vue'//主页
import articleDetail from '@/views/articleDetail.vue'//文章详情页
import register from '@/views/register.vue'//文章详情页
import myFollows from '@/views/myFollows.vue'//我的关注页
import myStars from '@/views/myStars.vue'//我的收藏页
import comment from '@/views/comment.vue'//评论页
//挂载
Vue.use(vueRouter)
//配置路由
let router = new vueRouter({
    routes: [
        //登陆页
        {
            name: 'login',
            path: '/login',
            component: login
        },
        //个人中心页
        {
            name: 'personal',
            path: '/personal/:id',
            component: personal
        },
        //编辑资料页
        {
            name: 'editPersonal',
            path: '/editPersonal/:id',
            component: editPersonal,
        },
        //重定向主页
        {
            name: 'index',
            path: '/',
            redirect: { path: '/index' }
        },
        //主页
        {
            name: 'index',
            path: '/index',
            component: index
        },
        //文章详情页
        {
            name: 'articleDetail',
            path: '/articleDetail/:id',
            component: articleDetail
        },
        //注册页
        {
            name: 'register',
            path: '/register',
            component: register
        },
        //我的关注页
        {
            name: 'myFollows',
            path: `/myFollows/:id`,
            component: myFollows
        },
        //我的收藏页
        {
            name: 'myStars',
            path: `/myStars/:id`,
            component: myStars
        },
        //评论页
        {
            name: 'comment',
            path: `/comment/:id`,
            component: comment
        }
    ]
})
//导航守卫
router.beforeEach((to, from, next) => {
    //to :目标路由 from : 原路由 next: 下一步操作
    //判断登陆的是个人中心页
    if (to.path.indexOf('/personal') !== -1) {
        //判断token
        let token = localStorage.getItem('token')
        if (token) {
            //执行下一步
            next()
        } else {
            //跳回登录页
            next({ name: 'login' })
        }
    } else {
        //不是个人中心页 过
        next()
    }
})


//暴露
export default router