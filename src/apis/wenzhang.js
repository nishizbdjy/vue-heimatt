//引入默认基准路径
import axios from '@/utils/myaxios.js'

//获取栏目列表
export const lanmu = ()=>{
    return axios({
        url:'/category'
    })
}
//获取文章
export const wenzhang = (params)=>{
    return axios({
        url:'/post',
        params
    })
}