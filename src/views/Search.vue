<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search placeholder="请输入搜索关键词" v-model="guanjianzi" shape="round"></van-search>
      <div @click="sousuo(guanjianzi)">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <a
        href="javascript:;"
        v-for="(value,index) in lishi"
        :key="index"
        @click="ssls(value)"
      >{{value}}</a>
    </div>
    <!-- <keep-alive> -->
    <div class="historyList">
      <h2>搜索结果</h2>
      <hmxinwenliebiao
        v-for="value in post"
        :key="value.id"
        :post="value"
        @click="$router.push({path:`/articleDetail/${value.id}`})"
      ></hmxinwenliebiao>
    </div>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
//搜索
import { search } from "@/apis/wenzhang.js";
//文章列表
import hmxinwenliebiao from "@/components/hmxinwenliebiao.vue";
export default {
  data() {
    return {
      guanjianzi: "", //关键字
      post: "", //列表内容
      lishi: [] //历史记录
    };
  },
  components: {
    hmxinwenliebiao
  },
  mounted() {
    this.lishi = this.init();
  },
  methods: {
    //获取搜索文章
    sousuo(key) {
      this.fzsousuo(key);
    },
    //封装搜索
    async fzsousuo(key) {
      if (key.length !== 0) {
        let res = await search({ keyword: key });
        let arr = this.init();
        //找到有的索引
        let index = arr.indexOf(key);
        if (index !== -1) {
          //删除之前的
          arr.splice(index, 1);
        }
        //从前面添加
        arr.unshift(key);
        //存储的本地
        localStorage.setItem("sslishi", JSON.stringify(arr));
        if (res.data.data.length !== 0) {
          this.post = res.data.data;
        } else {
          this.$toast.fail("暂无文章");
        }
      } else {
        this.$toast.fail("搜索内容不能为空");
      }
    },
    //获取搜索历史
    init() {
      return JSON.parse(localStorage.getItem("sslishi") || "[]");
    },
    //搜索历史
    ssls(value) {
        //调用封装的搜索
        this.fzsousuo(value)
    }
  }
};
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 50px;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  border-bottom: 1px solid #ccc;
  .van-search {
    flex: 1;
    padding: 5px 12px;
  }
}
.historyList {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>