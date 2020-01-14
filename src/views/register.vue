<template>
  <!-- 注册页 -->
  <div class="register">
    <div id="app">
      <div class="container">
        <div class="close">
          <span class="iconfont iconicon-test"></span>
        </div>
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="inputs">
          <hminput
            placeholder="用户名/手机号"
            v-model="obj.username"
            :panduan="/(^\d{5,6}$)|^1{11}$/"
            msg="用户名或手机号错误"
          ></hminput>
          <hminput placeholder="昵称" v-model="obj.nickname" :panduan="/^\W+$/" msg="昵称错误"></hminput>
          <!-- 双向绑定原生写法 -->
          <hminput
            placeholder="密码"
            @input="value"
            :value="obj.password"
            :panduan="/^\S{3,16}$/"
            msg="密码错误"
          ></hminput>
        </div>
        <p class="tips">
          有账号？
          <a href="#/login" class>去登录</a>
        </p>
        <hmbutton class="button" @click="zhuce">注册</hmbutton>
      </div>
    </div>
  </div>
</template>

<script>
import hminput from "@/components/input.vue";
import hmbutton from "@/components/button.vue";
import { zhuce } from "@/apis/user.js";
export default {
  data() {
    return {
      obj: {
        username: "",
        password: "",
        nickname: ""
      }
    };
  },
  components: {
    hminput,
    hmbutton
  },
  methods: {
    //监听密码
    value(mima) {
      this.obj.password = mima;
    },
    async zhuce() {
      let res = await zhuce(this.obj);
      if (res.data.message === "注册成功") {
        this.$router.push("login");
      }
      this.$toast.success(res.data.message);
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  padding: 20px;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
}

.inputs {
  input {
    margin-bottom: 20px;
  }
}

.tips {
  text-align: right;
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>