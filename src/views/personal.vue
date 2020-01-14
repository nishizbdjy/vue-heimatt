<template>
  <div class="personal">
    <router-link :to="{path:`/editPersonal/${user.id}`}">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="user.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span
              :class="['iconfont',{'iconxingbienan':user.gender==1,'iconxingbienv':user.gender==0}]"
            ></span>
            {{user.nickname}}
          </div>
          <div class="time">{{user.create_date}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <cell title="我的关注" value="关注的用户"></cell>
    <cell title="我的跟帖" value="跟帖/回复"></cell>
    <cell title="我的收藏" value="文章/视频"></cell>
    <cell title="设置"></cell>
    <hmbutton type="hong" @click="tuichu">退出</hmbutton>
    <hmbutton type="pink" @click="$router.push({name: 'index'})">返回主页</hmbutton>
  </div>
</template>

<script>
//引入封装的列表
import cell from "@/components/cell.vue";
//button
import hmbutton from "@/components/button.vue";
//引入获取用户详情
import { user } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {}
    };
  },
  components: {
    cell, //列表
    hmbutton //按钮
  },
  //页面一加载
  async mounted() {
    //发送请求获取用户详情
    let id = this.$route.params.id;
    let res = await user(id);
    console.log(res);
    if (res.data.message === "获取成功") {
      //赋值
      this.user = res.data.data;
      //拼接img地址
      this.user.head_img = "http://127.0.0.1:3000" + this.user.head_img;
      //时间
      this.user.create_date = this.user.create_date.substring(0, 10);
    }
    //获取失败情况拦截器已经判断
  },
  methods: {
    //退出
    tuichu() {
      // 清除本地token
      localStorage.removeItem("token");
      //跳转主页
      this.$router.push({ path: "/index" });
    }
  }
};
</script>

<style lang='less' scoped>
.btn {
  margin: 15px auto;
}
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
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
