//封装请求
//引入默认基准路径
import axios from '@/utils/myaxios.js'
//登陆
export const login = (data)=>{
    return axios({
        method : 'post',
        url : '/login',
        data
    })
}
//获取用户详情
export const user = (id)=>{
    return axios({
        method : 'get',
        url: `/user/${id}`,
        // headers: {'Authorization':localStorage.getItem('token')}
    })
}
//上传图片
export const upload =(data)=>{
    return axios({
        method : 'post',
        url :'/upload',
        data
    })
}
//修改用户信息
export const bianji = (id,data)=>{
    return axios({
        method : 'post',
        url : `/user_update/${id}`,
        data
    })
}
//注册用户
export const zhuce = (data)=>{
    return axios({
        method : 'post',
        url : `/register`,
        data
    })
}
//用户关注列表
export const userguanzhu =()=>{
  return axios({
      url :`/user_follows`
  })
} 
//用户收藏
export const usershoucang =()=>{
    return axios({
        url :'/user_star'
    })
  }