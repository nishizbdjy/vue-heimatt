<template>
  <div class="index">
    <!-- 头部 -->
    <div class="tou">
      <!-- logo -->
      <div class="logo">
        <span data-v-a83bd3b0 class="iconfont iconnew"></span>
      </div>
      <!-- 搜索 -->
      <div class="sousuo">
        <i data-v-a83bd3b0 class="van-icon van-icon-search"></i>
        <span>搜索新闻</span>
      </div>
      <!-- 个人中心 -->
      <div class="grzx">
        <i data-v-a83bd3b0 class="van-icon van-icon-manager-o" @click="$router.push({name:'personal'})"></i>
      </div>
    </div>
    <!-- van -->
    <van-tabs v-model="active" sticky swipeable>
      <van-tab :title="value.name" v-for="value in cateList" :key="value.id">内容 1</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { lanmu,wenzhang } from "@/apis/wenzhang.js";
export default {
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0, //根据用户登陆选择默认标签
      cateList: [] //栏目列表
    };
  },
  async mounted() {
    let res = await lanmu();
    console.log(res);
    this.cateList = res.data.data;

  }
};
</script>

<style lang="less" scoped>
.tou {
  color: #fff;
  width: 100vw;
  height: 50px;
  padding: 10px 0px;
  background-color: red;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo {
    span {
      font-size: 50px;
    }
  }
  .sousuo {
    background-color: pink;
    flex: 0.8;
    border-radius: 25px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
  }
  .grzx {
    i {
      font-size: 30px;
    }
  }
}
</style>