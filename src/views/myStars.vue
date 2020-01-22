<template>
  <div class="myStars">
    <!-- 我的收藏页 -->
    <hmheader title="我的收藏"></hmheader>
    <hmxinwenliebiao
      v-for="value in wenzhang"
      :key="value.id"
      :post="value"
      @click="$router.push({path:`/articleDetail/${value.id}`})"
    ></hmxinwenliebiao>
  </div>
</template>

<script>
//头部
import hmheader from "@/components/header.vue";
import hmxinwenliebiao from "@/components/hmxinwenliebiao.vue";
import { usershoucang } from "@/apis/user.js";
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
  }
};
</script>

<style lang="less" scoped>
.header {
  border-bottom: 1px solid #ccc;
}
</style>