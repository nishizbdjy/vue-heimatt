<template>
  <div class="cate">
    <myheader title="频道管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="mycate">
      <p>点击删除频道</p>
      <span v-for="(value,index) in lanmu" :key="value.id" @click="remove(index)">{{value.name}}</span>
    </div>
    <div class="mycate">
      <p>点击删除频道</p>
      <span v-for="(value,index) in shanchu" :key="value.id" @click="add(index)">{{value.name}}</span>
    </div>
  </div>
</template>

<script>
import myheader from "@/components/header.vue";
//获取栏目
import { huoqulanmu } from "@/apis/wenzhang.js";
export default {
  components: {
    myheader
  },
  data() {
    return {
      lanmu: [], //栏目
      shanchu: [] //删除的
    };
  },
  async mounted() {
    //栏目
    let lanmu = localStorage.getItem("lanmu");
    //删除的栏目
    let shanchu = localStorage.getItem("remove_lanmu");
    if (shanchu) {
      this.shanchu = JSON.parse(shanchu);
    } else {
      lanmu = false;
    }
    if (lanmu) {
      this.lanmu = JSON.parse(lanmu);
    } else {
      //删除清零
      this.shanchu = [];
      //获取用户登陆
      let token = localStorage.getItem("token");
      //发送请求
      let res = await huoqulanmu();
      if (res.data.data) {
        //如果用户有登陆
        if (token) {
          this.lanmu = res.data.data.splice(2);
          console.log(this.lanmu);
        } else {
          this.lanmu = res.data.data.splice(1);
        }
      }
    }
  },
  methods: {
    remove(index) {
      //添加到删除
      this.shanchu.push(this.lanmu[index]);
      localStorage.setItem("remove_lanmu", JSON.stringify(this.shanchu));
      //删除
      this.lanmu.splice(index, 1);
      localStorage.setItem("lanmu", JSON.stringify(this.lanmu));
    },
    add(index) {
      this.lanmu.push(this.shanchu[index]);
      localStorage.setItem("lanmu", JSON.stringify(this.lanmu));
      this.shanchu.splice(index, 1);
      localStorage.setItem("remove_lanmu", JSON.stringify(this.shanchu));
    }
  }
};
</script>

<style lang='less' scoped>
.mycate {
  padding: 15px;
  clear: both;
  > p {
    font-size: 16px;
    color: #888;
    line-height: 30px;
  }
  > span {
    float: left;
    padding: 10px 20px;
    border: 1px solid #ccc;
    margin-left: 12px;
    margin-top: 10px;
    font-size: 14px;
  }
}
</style>