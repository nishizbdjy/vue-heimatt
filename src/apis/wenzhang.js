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
//获取文章详情
export const wenzhangxiangqing = (id)=>{
    return axios({
        url : `/post/${id}`,
    })
}
//关注用户
export const guanzhu = (id)=>{
    return axios ({
        url : `/user_follows/${id}`,
    })
}
//取消关注用户
export const quxiaoguanzhu = (id)=>{
    return axios ({
        url : `/user_unfollow/${id}`,
    })
}
//点赞文章
export const dianzan =(id)=>{
    return axios ({
        url : `/post_like/${id}`
    })
}
//收藏文章
export const shoucang =(id)=>{
    return axios ({
        url : `/post_star/${id}`
    })
}
//评论列表
export const pinglunliebiao =(id)=>{
    return axios({
        url : `/post_comment/${id}`
    })
}
//发表评论
export const fabiaopl = (id,data)=>{
    return axios({
        method: 'post',
        url :`/post_comment/${id}`,
        data
    })
}
//获取栏目
export const huoqulanmu =()=>{
    return axios({
        url : '/category'
    })
} 