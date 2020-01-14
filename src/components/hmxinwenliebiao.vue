<template>
  <!-- 新闻列表 -->
  <div class="single" v-if="post.type===1&&post.cover.length <=2" @click="xiangqing">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
    <img :src="post.cover[0].url" alt />
  </div>
  <!-- 视频结构 -->
  <div class="singlesp" v-else-if="post.type===2" @click="xiangqing">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <div class="img">
        <img :src="post.cover[0].url" alt />
        <i data-v-4b4388d1 class="van-icon van-icon-play">
          <!---->
        </i>
      </div>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
  <!-- 三图 -->
  <div class="santu" v-else-if="post.type===1&&post.cover.length >=3" @click="xiangqing">
    <div class="left">
      <p class="content">{{post.title}}</p>
      <div class="san">
        <img :src="post.cover[0].url" alt />
        <img :src="post.cover[1].url" alt />
        <img :src="post.cover[2].url" alt />
      </div>
      <p class="info">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["post"],
  methods:{
    xiangqing(e){
        this.$emit('click',e)
    }
  }
};
</script>

<style lang='less' scoped>
.santu {
  border-bottom: 1px solid #ccc;
  span {
    display: inline-block;
    padding: 10px 0;
  }
}
.san {
  display: flex;
  height: 123px;
  img {
    flex: 33.33;
    width: 30.33%;
    margin: 5px 2px;
  }
}
.content {
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
}
.info {
  font-size: 12px;
  padding-left: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
  .imgs {
    display: flex;
    padding: 10px 0 0 0;
    > img {
      flex: 1;
      padding: 0 5px;
      box-sizing: border-box;
      display: block;
    }
  }
  .video {
    width: 100%;
    height: 170/360 * 100vw;
    padding: 10px;
    box-sizing: border-box;
    > img {
      width: 100%;
      height: 100%;
    }
  }
}
.singlesp {
  border-bottom: 1px solid #ccc;
  height: 100%;
  width: 100vw;
  .img {
    position: relative;
    width: 100%;
    .van-icon-play {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 55px;
      color: #fff;
      width: 15vw;
      height: 15vw;
      text-align: center;
      line-height: 60.5px;
      border-radius: 50%;
      box-shadow: 0px 0px 15px #fff;
    }
  }
  p {
    padding: 10px 0; 
  }
  span {
    display: inline-block;
    padding: 2px 0;
  }
  img {
    width: 100%;
  }
}
</style>
