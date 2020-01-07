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
    <cell title="昵称" :value="user.nickname"></cell>
    <cell title="密码" :value="user.password"></cell>
    <cell title="性别" :value="user.gender==0?'女':'男'"></cell>
  </div>
</template>

<script>
//引入封装的顶部栏
import hmheader from "@/components/header.vue";
//列表栏
import cell from "@/components/cell.vue";
//获取用户信息 上传文件 编辑
import { user, upload,bianji } from "@/apis/user.js";
export default {
  data() {
    return {
      user: {}
    };
  },
  components: {
    hmheader, //封装的顶部栏
    cell //列表栏
  },
  methods: {
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      let files = new FormData();
      files.append("file", file.file);
      let res1 = await upload(files);
      if (res1.data.message == "文件上传成功") {
          //预览
          this.user.head_img = 'http://127.0.0.1:3000' +res1.data.data.url
          //修改图片
          let id = this.$route.params.id
          let res2 = await bianji(id,{head_img:res1.data.data.url})
          console.log(res2)
          if(res2.data.message ==='修改成功'){
           //提示用户
           this.$toast.success('修改成功')
          }else{
              //修改失败
              this.$toast.file(res2.data.message)
          }
      }
    }
  },
  async mounted() {
    //获取用户信息
    let id = this.$route.params.id;
    let res = await user(id);
    console.log(res);
    if (res.data.message === "获取成功") {
      //赋值
      this.user = res.data.data;
      this.user.head_img = "http://127.0.0.1:3000" + this.user.head_img;
    }
  }
};
</script>

<style lang="less" scoped>
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
