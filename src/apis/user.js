//封装请求
//引入默认基准路径
import axios from '@/utils/myaxios.js'
export const login = (data)=>{
    return axios({
        method : 'post',
        url : '/login',
        data
    })
}