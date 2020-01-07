<template>
<!-- 封装列表 -->
  <div class="cell" @click="dianjil">
  <div class="left">{{title}}</div>
  <!-- <div class="center"></div> -->
  <div class="right">{{value}}<span class="iconfont iconjiantou1 ziti"></span></div>
  </div>
</template>

<script>
export default {
props:['title','value'],
methods:{
    dianjil(e){
   this.$emit('click',e)
    }
}
}

</script>

<style lang="less" scoped>
.cell{
    border-bottom: 1px solid #ccc;
    padding: 15px 15px;
    display :flex;
    justify-content: space-between;
    >.right{
        color: #888;
        font-size : 13px
    }
    >.ziti{
        color: #888;
    }
}
</style>