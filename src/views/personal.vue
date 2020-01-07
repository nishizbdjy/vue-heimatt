<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img src="http://img1.imgtn.bdimg.com/it/u=3757784226,1202878475&fm=26&gp=0.jpg" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>我就是我
          </div>
          <div class="time">2019-9-24</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <cell title="我的关注" value="关注的用户"></cell>
    <cell title="我的跟帖" value="跟帖/回复"></cell>
    <cell title="我的收藏" value="文章/视频"></cell>
    <cell title="设置"></cell>
    <hmbutton type="hong">退出</hmbutton>
  </div>
</template>

<script>
//引入封装的列表
import cell from '@/components/cell.vue'
//button
import hmbutton from '@/components/button.vue'
//引入获取用户详情
import {user} from '@/apis/user.js'
export default {
data(){
  return{

  }
},
components:{
  cell,//列表
  hmbutton//按钮
},
//页面一加载
async mounted(){
  //发送请求获取用户详情
  let id  = this.$route.params.id
 let res = await user(id)
 console.log(res)
}
}
</script>

<style lang='less' scoped>
.btn{
  margin: 15px auto;
}
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
