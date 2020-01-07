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