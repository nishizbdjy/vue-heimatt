<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="guanzhu" :class="{hong:user.has_follow}">{{user.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{user.title}}</div>
      <div class="desc">
        <span>{{user.user&&user.user.nickname}}</span> &nbsp;&nbsp;
        <span>{{user.create_date&&user.create_date.substring(0,10)}}</span>
      </div>
      <!-- 文章 -->
      <div class="content" v-html="user.content" v-if="user.type===1"></div>
      <!-- 视频 -->
      <video
        :src="user.content"
        v-if="user.type===2"
        poster="http://127.0.0.1:3000\uploads\image/1111.jpg"
        controls
      ></video>
      <div class="opt">
        <span class="like" :class="{dianz:user.has_like}" @click="dianzhan">
          <van-icon name="good-job-o" />
          {{user.like_length}}点赞
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img :src="user.user.head_img" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 评论 -->
    <pinglunlan :post="user"></pinglunlan>
  </div>
  <!-- 访问一个不存在的变量，则报错：** is not defined
  访问一个对象不存在的属性，则返回undefined-->
  <!-- controls:是否显示控制面板，默认不显示
      src:路径
      controls:是否显示控制面板
      autoplay:自动播放，在chrome是有问题，不会响应
      loop:是否循环播放
  poster:首帧画面-->
  <!-- <video src="" controls></video> -->
</template>

<script>
//获取文章详情
import {
  wenzhangxiangqing,
  guanzhu,
  quxiaoguanzhu,
  dianzan,
  shoucang
} from "@/apis/wenzhang.js";
//底部评论
import pinglunlan from "@/components/pinglunlan.vue";
export default {
  data() {
    return {
      user: {
        user: {} //防止异步请求未完成加载
      }
    };
  },
  components: {
    pinglunlan
  },
  async mounted() {
    // 根据id获取文章的详情，实现文章详情的动态渲染
    let id = this.$route.params.id;
    let res = await wenzhangxiangqing(id);
    if (res.status == "200") {
      res.data.data.user.head_img =
        "http://127.0.0.1:3000" + res.data.data.user.head_img;
      this.user = res.data.data;
    }
    console.log(res);
  },
  methods: {
    //关注
    async guanzhu() {
      console.log(this.user);
      let res;
      //判断是否已经登录
      let id = this.user.user.id;
      console.log(id);
      if (this.user.has_follow) {
        //如果关注就取消关注
        res = await quxiaoguanzhu(id);
      } else {
        res = await guanzhu(this.user.user.id);
      }
      this.$toast.success(res.data.message);
      //取反
      this.user.has_follow = !this.user.has_follow;
    },
    //点赞
    async dianzhan() {
      let res = await dianzan(this.$route.params.id);
      // console.log(res);
      if (res.data.message === "点赞成功") {
        ++this.user.like_length;
        this.$toast.success("点赞成功");
        this.user.has_like = !this.user.has_like;
      } else {
        --this.user.like_length;
        this.$toast.success("取消成功");
        this.user.has_like = !this.user.has_like;
      }
    },

  }
};
</script>

<style lang='less' scoped>
/deep/.addcomment {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #fff;
}
.hong {
  background-color: #f00;
  color: #fff !important ;
}
.dianz {
  color: rgb(252, 84, 6);
}
video {
  width: 100%;
}
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    color: #000;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    border: 1px solid #888;
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/.photo {
      img {
        width: 100%;
        display: block;
      }
    }
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
  }
  .w {
    color: rgb(84, 163, 5);
  }
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
