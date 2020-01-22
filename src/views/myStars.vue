<template>
  <div class="myStars">
    <!-- 我的收藏页 -->
    <hmheader title="我的收藏"></hmheader>
    <div v-if="wenzhang.length!==0">
      <van-swipe-cell v-for="(value,index) in wenzhang" :key="value.id">
        <hmxinwenliebiao :post="value" @click="$router.push({path:`/articleDetail/${value.id}`})"></hmxinwenliebiao>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="shanchu(index,value.id)" />
        </template>
      </van-swipe-cell>
    </div>
    <div class="fz" v-else>还没有收藏哦，去收藏吧ψ(*｀ー´)ψ</div>
  </div>
</template>

<script>
//头部
import hmheader from "@/components/header.vue";
import hmxinwenliebiao from "@/components/hmxinwenliebiao.vue";
import { usershoucang } from "@/apis/user.js";
import { shoucang } from "@/apis/wenzhang.js";
export default {
  data() {
    return {
      wenzhang: {}
    };
  },
  components: {
    hmheader,
    hmxinwenliebiao
  },
  async mounted() {
    let res = await usershoucang();
    console.log(res);
    if (res.data.data) {
      this.wenzhang = res.data.data;
      for (let i = 0; i < this.wenzhang.length; i++) {
        for (let j = 0; j < this.wenzhang[i].cover.length; j++) {
          if (this.wenzhang[i].cover[j].url.indexOf("http") == -1) {
            this.wenzhang[i].cover[j].url =
              "http://127.0.0.1:3000" + this.wenzhang[i].cover[j].url;
          }
        }
      }
    }
  },
  methods: {
    async shanchu(index, id) {
      this.wenzhang.splice(index, 1);
      let res = await shoucang(id);
      if (res.data.message === "取消成功") {
        this.$toast.success("取消成功");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid #ccc;
}
/deep/.van-swipe-cell__right {
  display: flex;
  align-items: center;
}
.fz {
  text-align: center;
  width: 50vw;
  color: red;
  font-size: 15px;
  margin: 30px auto;
}
</style>