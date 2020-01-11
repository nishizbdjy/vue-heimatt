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
        <i
          data-v-a83bd3b0
          class="van-icon van-icon-manager-o"
          @click="$router.push({name:'personal'})"
        ></i>
      </div>
    </div>
    <!-- van -->
    <van-tabs v-model="active" sticky swipeable>
      <!-- 循环栏目 -->
      <van-tab :title="value.name" v-for="value in cateList" :key="value.id">
        <!-- <van-list v-model="loading" :finished="finished" :immediate-check="false" :offset="10" finished-text="没有更多了" @load="onLoad"> -->
          <xinwenliebiao v-for="v in value.postList" :key="v.id" :post="v"></xinwenliebiao>
        <!-- </van-list> -->
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { lanmu, wenzhang } from "@/apis/wenzhang.js";
import xinwenliebiao from '@/components/hmxinwenliebiao.vue'
export default {
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0, //根据用户登陆选择默认标签
      cateList: [] //栏目列表
    };
  },
  components:{
    xinwenliebiao
  },
  async mounted() {
    let res = await lanmu();
    console.log(res);
    this.cateList = res.data.data;
    //改造数据
    this.cateList = this.cateList.map(value => {
      return {
        ...value,
        pageInde: 1, //文章当前页
        pageSize: 5, //文章显示数
        postList: [], //当前文章
        finished:false,//是否加载完成
        loading:false//当前加载状态
      };
    });
    //获取文章
    let res1 = await wenzhang({
      pageSize: this.cateList[this.active].pageSize, //当前显示数量
      pageInde: this.cateList[this.active].pageInde, //当前页数
      category: this.cateList[this.active].id //栏目id
    });
    this.cateList[this.active].postList.push(...res1.data.data)
        console.log(this.cateList);
  },
  methods:{
    load(){
   
    }
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