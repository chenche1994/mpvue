<template>
  <div class="bookinfo">
    <div class="thumb">
      <img :src="info.image" class="back" mode='scaleToFill'>
      <img :src="info.image" class="img" mode='aspectFit'>
      <div class="info">
        <div class="title">{{info.title}}</div>
        <div class="author">{{info.author}}</div>
      </div>
    </div>
    <div class="owner">
      <img :src="userinfo.image" class="avatar" mode='aspectfit'>{{userinfo.name}}
      <div class="right text-primary">{{info.rate}}分<rate :rate = 'info.rate'></rate></div>
    </div>
    <div class="detail">
      {{info.publisher}}
      <div class="right">{{info.price}}</div>
    </div>
    <div class="tags">
      <div class="badge" v-for="tag in info.tags" :key="tag">{{tag}}</div>
    </div>
    <div class="summary">
      <p v-for="(sum, index) in info.summary" :key="index">{{sum}}</p>
    </div>
  </div>
</template>
<script>
import Rate from '@/components/rate'
export default {
  props:{
    info: {
      type: Object
    }
  },
  computed: {
    userinfo() {
      return this.info.user_info || {}
    }
  },
  components: {
    Rate
  }
}
</script>
<style scoped lang='sass'>
.bookinfo
  font-size: 14px
  .right
    float: right
  .detail,.owner
    padding: 5px 10px
    .avatar
      width: 20px
      height: 20px
      border-radius: 50%
      vertical-align: middle
  .tags
    padding: 0 10px
    .badge
      display: inline-block
      margin: 5px
      padding: 5px
      border-radius: 10px
      border: 1px solid #ea5a49
      color: #ea5a49
  .summary
    margin-top: 10px
    padding: 0 15px
    p
      text-indent: 2em
      font-size: 14px
      margin-bottom: 4px 
  .thumb
    width: 750rpx
    height: 500rpx
    overflow: hidden
    position: relative
    .back
      filter: blur(15px)
      width: 100%
    .img
      position: absolute
      width: 100%
      height: 300rpx
      left: 0
      top: 30rpx
    .info
      position: absolute
      color: #fff
      width: 100%
      left: 0
      top: 340rpx
      text-align: center
      .title
        font-size: 20px
      .author
        font-size: 14px
</style>
