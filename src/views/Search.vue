<template>
  <div class="search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="$router.back()"></span>
      <van-search placeholder="请输入搜索关键词" v-model="guanjianzi" shape="round"></van-search>
      <div @click="sousuo(guanjianzi)">搜索</div>
    </div>
    <div class="historyList">
      <h2>历史记录</h2>
      <a href="javascript:;"></a>
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
      post: ""
    };
  },
  components: {
    hmxinwenliebiao
  },
  mounted() {},
  methods: {
    //获取搜索文章
    async sousuo(key) {
      if (key.length !== 0) {
        let res = await search({ keyword: key });
        console.log(res);
        if (res.data.data.length !== 0) {
          this.post = res.data.data;
        } else {
          this.$toast.fail("暂无文章");
        }
      } else {
        this.$toast.fail("搜索内容不能为空");
      }
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