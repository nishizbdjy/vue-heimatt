<template>
  <div class="index">
    <!-- 头部 -->
    <div class="tou">
      <!-- logo -->
      <div class="logo">
        <span data-v-a83bd3b0 class="iconfont iconnew"></span>
      </div>
      <!-- 搜索 -->
      <div class="sousuo">
        <i data-v-a83bd3b0="" class="van-icon van-icon-search"></i>
        <span>搜索新闻</span>
      </div>
      <!-- 个人中心 -->
      <div class="grzx">
        <i data-v-a83bd3b0 class="van-icon van-icon-manager-o"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.tou {
  color:#fff;
  width: 100vw;
  height: 50px;
  padding: 10px 10px;
  background-color: red;
  display:flex;
  justify-content: space-around;
  align-items: center;
  .logo{
    span{
      font-size:50px;
    }
  }
  .sousuo{
    background-color:pink;
    flex:0.8;
    border-radius: 25px;
    height: 100%;
    display:flex;
    align-items: center;
    justify-content: center;
    opacity: 0.6;
  }
  .grzx{
    i{
      font-size:30px
    }
  }
}
</style>