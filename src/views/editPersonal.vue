<template>
  <!-- 编辑个人信息页面 -->
  <div class="editPersonal">
    <hmheader title="编辑资料"></hmheader>
    <!-- img -->
    <div class="img">
      <img :src="user.head_img" alt />
      <!-- 文件上传组件 -->
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 昵称弹出框 -->
    <van-dialog v-model="show" title="昵称" show-cancel-button @confirm="qrnc">
      <!-- 输入框 -->
      <van-field required label="昵称" placeholder="请输入昵称" ref="nicheng" :value="user.nickname" />
    </van-dialog>
    <cell title="昵称" :value="user.nickname" @click="show =!show"></cell>
    <!-- 密码 -->
    <van-dialog v-model="mima" title="密码" show-cancel-button :before-close="xiaoshi">
      <!-- 输入框 -->
      <van-field required label="旧密码" placeholder="请输入旧密码" ref="jiumima" />
      <van-field required label="新密码" placeholder="请输入新密码" ref="xinmima" />
    </van-dialog>
    <cell title="密码" :value="user.password" @click="mima =!mima"></cell>
    <!-- 性别 -->
    <van-dialog v-model="xingbie" title="性别" show-cancel-button @confirm="gender">
      <van-picker :columns="['女','男']" @change="onChange" :default-index="user.gender"/>
    </van-dialog>
    <cell title="性别" :value="user.gender==0?'女':'男'" @click="xingbie=!xingbie"></cell>
    <hmbottom type="hong">退出</hmbottom>
  </div>
</template>

<script>
//引入封装的顶部栏
import hmheader from "@/components/header.vue";
//列表栏
import cell from "@/components/cell.vue";
//button
import hmbottom from '@/components/button.vue'
//获取用户信息 上传文件 编辑
import { user, upload, bianji } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {},
      show: false, //昵称
      mima: false, //密码
      xingbie: false, //性别
      xb: '', //存用户选择的gender
    };
  },
  components: {
    hmheader, //封装的顶部栏
    cell, //列表栏
    hmbottom//button
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let files = new FormData();
      files.append("file", file.file);
      //上传服务器
      let res1 = await upload(files);
      if (res1.data.message == "文件上传成功") {
        //预览
        this.user.head_img = "http://127.0.0.1:3000" + res1.data.data.url;
        //修改图片
        let id = this.user.id;
        let res2 = await bianji(id, { head_img: res1.data.data.url });
        if (res2.data.message === "修改成功") {
          //提示用户
          this.$toast.success("修改成功");
        } else {
          //修改失败
          this.$toast.fail(res2.data.message);
        }
      }
    },
    //确认昵称
    async qrnc() {
      //获取input value
      let value = this.$refs.nicheng.$refs.input.value;
      //修改昵称
      let id = this.user.id;
      let res = await bianji(id, { nickname: value });
      if (res.data.message === "修改成功") {
        //预览
        this.user.nickname = value;
        //提示
        this.$toast.success("修改成功");
      } else {
        //失败
        this.$toast.fail(res.data.message);
      }
    },
    //提示消失时
    async xiaoshi(action, done) {
      if (action === "confirm") {
        let xinmima = this.$refs.xinmima.$refs.input.value; //新密码
        let jiumima = this.$refs.jiumima.$refs.input.value; //旧密码
        if (!/^\S{3,16}$/.test(xinmima)) {
          //判断是否合法
          this.$toast.fail("请输入正确的密码3-16位");
          done(false);
        } else if (jiumima !== this.user.password) {
          //旧密码是否一致
          this.$toast.fail("原密码不一致");
          //全选
          this.$refs.jiumima.$refs.input.select();
          //焦点
          this.$refs.jiumima.$refs.input.focus();
          done(false);
        } else {
          done();
          //都满足修改密码
          let id = this.user.id;
          let res = await bianji(id, { password: xinmima });
          if (res.data.message === "修改成功") {
            //修改成功
            this.$toast.success("修改成功");
            //改变当前密码
            this.user.password = xinmima;
          } else {
            this.$toast.fail(res.data.message);
          }
        }
      } else {
        done();
      }
    },
    //选择性别
    onChange(picker, value, index) {
      this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.xb = index; //存储性别
      console.log(this.xb);
      console.log(this.user)
    },
    //确认选择性别
    async gender() {
      let id = this.user.id;
      let res = await bianji(id, { gender: this.xb });
      if (res.data.message === "修改成功") {
        this.$toast.success("修改成功");
        //改变页面值
        this.user.gender = this.xb
      } else {
        this.$toast.success(res.data.message);
      }
    }
  },
  //页面一开始
  async mounted() {
    //获取用户信息
    let id = this.$route.params.id;
    let res = await user(id);
    if (res.data.message === "获取成功") {
      //赋值 渲染页面
      this.user = res.data.data;
      this.user.head_img = "http://127.0.0.1:3000" + this.user.head_img;
    }
  }
};
</script>

<style lang="less" scoped>
.btn{
    margin: 20px auto;
}
.editPersonal {
  background-color: #f2f2f2;
  height: 100%;
  width: 100%;

  > .img {
    width: 100%;
    height: 150px;
    position: relative;
    > img {
      width: 90/360 * 100vw;
      height: 90/360 * 100vw;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  /deep/.van-uploader {
    opacity: 0;
    // border-radius: 50%;
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /deep/.van-uploader__input {
    width: 90/360 * 100vw;
    height: 90/360 * 100vw;
  }
}
</style>
