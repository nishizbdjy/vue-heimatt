<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>

      <div class="inputs">
        <!-- v-model写法 -->
        <hminput  placeholder="用户名/手机号" v-model="obj.username" :panduan="/(^\d{5,6}$)|^1{11}$/" msg="用户名或手机号错误"></hminput>
        <!-- 双向绑定原生写法 -->
        <hminput  placeholder="密码" @input="value" :value="obj.password" :panduan="/^\S{3,13}$/" msg="密码错误"></hminput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hmbutton type="hong" @bdl="btndian">登陆</hmbutton>
    </div>
  </div>
</template>

<script>
//引入按钮
import hmbutton from "@/components/button.vue";
//引入input
import hminput from '@/components/input.vue'
export default {
  data(){
    return{
     obj :{
         username: '',
         password: ''
         }
    }
  },
  //注册
  components: {
    hmbutton, //按钮
    hminput//input
  },
  //按钮事件
  methods: {
    btndian(data) {
      console.log(data);
      console.log(this.obj.username)
    },
    //input
    value(data){
    //赋值
     this.obj.password = data
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



