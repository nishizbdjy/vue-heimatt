<template>
  <div class="btn" @click="wbdl" :class="{hong : type=='hong',pink : type=='pink'}">
<slot>插槽</slot>
  </div>
</template>

<script>
export default {
    props:['type'],
data(){
    return{

    }
},
//点击事件
methods : {
    wbdl(e){
      this.$emit('click',e)
    }
}
}
</script>

<style lang="less" scoped>
.btn{
    text-align: center;
    border-radius: 25px;
    line-height: 40px;
    background-color: rgb(43, 7, 248);
    height: 40px;
    width: 318/360*100vw;
    font-size: 15px;
    color: #fff;
    font-weight: 700;
}
.hong{
 background-color: red;
}
.pink{
background-color:pink;
}
</style>