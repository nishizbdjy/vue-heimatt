<template>
  <div class="comment">
    <hmheader title="精彩评论"></hmheader>
    <!-- 精彩跟帖 -->
    <div class="keeps" v-if="pinglun.length!==0">
      <div class="item" v-for="(value) in pinglun" :key="value.id">
        <div class="head">
          <img :src="'http://127.0.0.1:3000'+value.user.head_img" alt />
          <div>
            <p>{{value.user.nickname}}</p>
            <span>{{value.create_date.substring(0,10)}}</span>
          </div>
          <span>回复</span>
        </div>
        <diguipl :post="value.parent" v-if="value.parent"></diguipl>
        <div class="text">{{value.content}}</div>
      </div>
    </div>
    <!-- 占位符 -->
    <div class="ZWF"></div>
    <!-- 底部 -->
    <pinglunlan :post="user"></pinglunlan>
  </div>
</template>

<script>
//头部
import hmheader from "@/components/header.vue";
//评论列表
import { pinglunliebiao, wenzhangxiangqing } from "@/apis/wenzhang.js";
//递归评论
import diguipl from "@/components/diguipinglun.vue";
//评论底部
import pinglunlan from "@/components/pinglunlan.vue";
export default {
  data() {
    return {
      pinglun: {}, //评论
      user: {} //评论底部文章信息
    };
  },
  components: {
    hmheader,
    diguipl,
    pinglunlan
  },
  async mounted() {
    //评论
    let res = await pinglunliebiao(this.$route.params.id);
    if (res.data.data) {
      this.pinglun = res.data.data;
    }
    //底部文章
    let res1 = await wenzhangxiangqing(this.$route.params.id);
    if (res1.data.data) {
      this.user = res1.data.data;
      //告诉他隐藏评论图标
      this.user.pinglun = "这是评论页";
      console.log(this.user);
    }
  }
};
</script>

<style lang="less" scoped>
.ZWF {
  height: 60px;
}
/deep/.addcomment {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
    margin-bottom: 65px;
  }
}
</style>