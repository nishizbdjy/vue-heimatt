<template>
  <div class="focus">
    <myheader title="我的关注">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
    </myheader>
    <div class="list" v-if="liebiao.length!==0">
      <div class="box" v-for="(value,index) in liebiao" :key="value.id">
        <img :src="'http://127.0.0.1:3000'+value.head_img" alt />
        <div class="center">
          <p>{{value.nickname}}</p>
          <span>{{value.create_date.substring(0,10)}}</span>
        </div>
        <span @click="quxiaoguanzhu(value.id,index)">取消关注</span>
      </div>
    </div>
    <div class="fz" v-else>你还没有关注哦(^_−)☆</div>
  </div>
</template>

<script>
import myheader from "@/components/header.vue";
import { userguanzhu } from "@/apis/user.js";
import { quxiaoguanzhu } from "@/apis/wenzhang.js";
export default {
  data() {
    return {
      liebiao: {}
    };
  },
  components: {
    myheader
  },
  async mounted() {
    let res = await userguanzhu();
    if (res.data.data) {
      this.liebiao = res.data.data;
    }
  },
  methods: {
    async quxiaoguanzhu(id, index) {
      let res = await quxiaoguanzhu(id);
      console.log(res);
      if (res.data.message === "取消关注成功") {
        this.$toast.success("取消关注成功");
        //删除数据
        this.liebiao.splice(index, 1);
        console.log(this.liebiao);
        
      }
    }
  }
};
</script>

<style lang='less' scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: 50/360 * 100vw;
      height: 50/360 * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
.fz{
  text-align: center;
  width: 50vw;
  color: red;
  font-size:15px;
  margin:30px auto
}
</style>
