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
    <van-tabs v-model="active" sticky>
      <!-- 循环栏目 -->
      <van-tab :title="value.name" v-for="value in cateList" :key="value.id">
        <van-list
          v-model="value.loading"
          :finished="value.finished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-pull-refresh v-model="value.isLoading" @refresh="onRefresh" success-text="刷新成功">
            <xinwenliebiao v-for="v in value.postList" :key="v.id" :post="v"></xinwenliebiao>
          </van-pull-refresh>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { lanmu, wenzhang } from "@/apis/wenzhang.js";
import xinwenliebiao from "@/components/hmxinwenliebiao.vue";
export default {
  data() {
    return {
      active: localStorage.getItem("token") ? 1 : 0, //根据用户登陆选择默认标签
      cateList: [] //栏目列表
    };
  },
  components: {
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
        pageIndex: 1, //文章当前页
        pageSize: 5, //文章显示数
        postList: [], //当前文章
        finished: false, //是否加载完成
        loading: false, //当前加载状态
        isLoading: false //下拉刷新状态
      };
    });
    this.init();
  },
  //侦听栏目索引变化
  watch: {
    active() {
      //防止二次加载
      if (this.cateList[this.active].postList.length === 0) {
        this.init();
      }
    }
  },
  methods: {
    async init() {
      //获取文章
      let res1 = await wenzhang({
        pageSize: this.cateList[this.active].pageSize, //当前显示数量
        pageIndex: this.cateList[this.active].pageIndex, //当前页数
        category: this.cateList[this.active].id //栏目id
      });
      // console.log(res1);
      //将文章添加到当前栏目中
      this.cateList[this.active].postList.push(...res1.data.data);
      //当前栏目文章加载完成
      if (res1.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true; //加载完成
      }
      //加载状态
      if (this.cateList[this.active].loading) {
        this.cateList[this.active].loading = false; //加载完成
      }
      //下拉刷新
      if (this.cateList[this.active].isLoading) {
        this.cateList[this.active].isLoading = false; //刷新完成
      }
      // console.log(this.cateList[this.active].postList);
    },
    //下拉加载
    onLoad() {
      //页面没在下刷新才执行
      if (this.cateList[this.active].isLoading === false) {
        //页数加加
        ++this.cateList[this.active].pageIndex;
        //模拟异步
        setTimeout(() => {
          this.init();
        }, 1000);
      }
    },
    //下拉刷新
    onRefresh() {
      this.cateList[this.active].pageIndex = 1; //重置页数
      this.cateList[this.active].postList.length = 0; //重置文章
      //模拟异步
      setTimeout(() => {
        this.init();
      }, 1000);
      this.cateList[this.active].finished = false;//告诉上拉加载可以继续上拉加载
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