<template>
  <!-- 编辑资料顶部栏的封装 -->
  <div class="header">
    <div class="left">
      <span class="iconfont iconjiantou2"></span>
      {{left}}
    </div>
    <div class="center">{{title}}</div>
    <div class="right">{{right}}</div>
  </div>
</template>

<script>
export default {
  props: ["title", "right", "left"],
  data() {
    return {};
  }
};
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  >.center{
   font-weight: bold;
  }
  >.left {
      >span{
          color: #888
      }
  }
}
</style>
