<template>
<div class="swiper">
  <swiper indicator-dots="indicatorDots" autoplay="autoplay" :circular = 'true'>
    <!-- <div v-for="(imgAarray,index) in imgUrls" :key="index">
      <swiper-item>
        <img class="sider-image" v-for="img in imgAarray" :key="img.id" 
                :src= img.image :mode='aspectFit'>
      </swiper-item>
    </div> -->
    <div v-for="(top,imgindex) in imgUrls" :key="imgindex">
      <swiper-item class="swiper-item">
        <img class="sider-image" v-for="img in top" :key="img.id" :src= img.image :mode='aspectFit' @click="bookDetail(img)">
      </swiper-item>
    </div>
  </swiper>
</div>
</template>
<script>
export default {
  props: {
    tops: {
      type: Array
    }
  },
  methods: {
    bookDetail(item) {
      // 微信类普通页面的跳转用wx.navigateTo
      wx.navigateTo({
        url: '/pages/detail/main?id=' + item.id
      })
    }
  },
  computed: {
    imgUrls() {
      let res = this.tops
      // 变成一个3*3的数组，chunk.
      return [res.slice(0,3), res.slice(3,6), res.slice(6)]
    }
  }
}
</script>
<style scoped lang='sass'>
.swiper
  margin-top: 5px
  .swiper-item
    display: flex
    justify-content: space-between
    .sider-image 
      width: 30%
      height: 280rpx
</style>
