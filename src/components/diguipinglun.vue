<template>
  <div class="diguipinglun">
      <dg :post="post.parent" v-if="post.parent"></dg>
    <div class="name">
      <div class="zuo">
        <span>{{post.user.nickname}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
        <span>{{post.create_date.substring(0,10)}}</span>
      </div>
      <span>回复</span>
    </div>
    <div class="neirong">{{post.content}}</div>
  </div>
</template>

<script>
export default {
props:['post'],
name: 'dg',
data(){
        return{

        }
    }
};
</script>

<style lang="less" scoped>
.diguipinglun {
  font-size: 12px;
  border: 1px solid #ccc;
  padding: 5px;
  .name {
    font-size: 10px;
    display: flex;
    justify-content: space-between;
    color: #aaa;
  }
  .neirong {
    height: 35px;
    line-height: 35px;
  }
}
</style>