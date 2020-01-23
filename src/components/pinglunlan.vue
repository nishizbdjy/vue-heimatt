<template>
  <div class="comment">
    <div class="addcomment" v-show="!isFocus">
      <input type="text" placeholder="写跟帖" @focus="handlerFocus" />
      <span
        class="comment"
        @click="$router.push({path:`/comment/${post.id}`})"
        v-if="!post.pinglun"
      >
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" :class="{hong:post.has_star}" @click="shoucang"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show="isFocus">
      <textarea ref="commtext" rows="5"></textarea>
      <div>
        <span @click="pinglun">发送</span>
        <span @click="quxiao">取消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { shoucang, fabiaopl } from "@/apis/wenzhang.js";
export default {
  props: ["post", "obj"],
  data() {
    return {
      isFocus: false
    };
  },
  mounted() {
    // console.log(this.post);
  },
  //监听父级的评论
  watch: {
    obj() {
      //显示输入框
      if (this.obj) {
        this.isFocus = true;
      }
    }
  },
  methods: {
    //   获取焦点时触发
    handlerFocus() {
      this.isFocus = !this.isFocus;
      setTimeout(() => {
        this.$refs.commtext.focus();
      }, 10);
    },
    //收藏
    async shoucang() {
      let res = await shoucang(this.$route.params.id);
      // console.log(res);
      this.$toast.success(res.data.message);
      this.post.has_star = !this.post.has_star;
    },
    //发表评论
    async pinglun() {
      let data = {};
      let id = this.post.id;
      if (this.obj) {
        data.parent_id = this.obj.id;
      }
      //获取内容
      data.content = this.$refs.commtext.value;
      if (data.content.length !== 0) {
        let res = await fabiaopl(id, data);
        this.$toast.success(res.data.message);
        window.scrollTo(0, 0); //内容滚动到指定的坐标
        location.reload(); //刷新页面
        this.$refs.commtext.value = ""; //清除文本框
      } else {
        //内容为空
        this.$toast.fail("评论不能为空!");
      }
    },
    //取消
    quxiao() {
      this.isFocus = false;
      this.$refs.commtext.value = ""; //清除文本框
      //发送事件给父元素重置
      this.$emit("quxiaol");
      console.log(this.isFocus);
    }
  }
};
</script>

<style lang='less' scoped>
.hong {
  color: rgb(240, 78, 3);
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
    &:nth-child(1) {
      display: inline-block;
      margin-bottom: 20px;
      background-color: rgb(21, 255, 0);
    }
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
