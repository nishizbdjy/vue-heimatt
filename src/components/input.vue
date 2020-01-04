<template>
  <input type="text" class="input" @input="bianl " :class="{hong: !kg,lv:kg}" @blur="shijiao"/>
</template>

<script>
export default {
  //提示信息
  props: ['panduan',"msg"],
  data() {
    return {
      kg: true
    };
  },
  methods: {
    //value改变触发
    bianl(e) {
      let value = e.target.value;
      this.$emit("input", value);
      console.log(this.panduan)
      //判断 正则
      if (this.panduan.test(value)) {
          //绿色
          this.kg=true
      }else{
          //红色
          this.kg=false
      }
    },
    //失焦触发
    shijiao(){
        if(!this.kg){
         this.$toast.fail(this.msg)
        }
    }
  }
};
</script>

<style lang="less" scoped>
.input {
  border: none;
  outline: none;
  height: 40px;
  width: 318/360 * 100vw;
  border-bottom: 1.5px solid #ccc;
}
.hong {
  border-bottom-color: red;
}
.lv {
  border-bottom-color: rgb(51, 235, 5);
}
</style>