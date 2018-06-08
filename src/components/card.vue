<template>
<a :href="detailUrl">
  <div class="book-card">
    <div class="thumb" @click.stop='preview'>
      <img :src="book.image" class="images" mode="aspectFit">
    </div>
    <div class="detail">
      <div class="row">
        <div class="left text-primary">{{book.title}}</div>
        <div class="right text-primary">{{book.rate}}<rate :rate = 'book.rate'></rate></div>
      </div>
      <div class="row">
        <div class="left">{{book.author}}</div>
        <div class="right">浏览量{{book.count}}</div>
      </div>
      <div class="row">
        <div class="left">{{book.publisher}}</div>
        <div class="right">{{book.user_info.nickName}}</div>
      </div>
    </div>
  </div>
</a>
</template>
<script>
import Rate from './rate'
export default {
  props: {
    book: {
      type: Object
    }
  },
  methods: {
    preview() {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  },
  computed: {
    detailUrl() {
      return '/pages/detail/main?id=' + this.book.id
    }
  },
  components: {
    Rate
  }
}
</script>
<style scoped lang="sass">
.book-card
  padding: 5px;
  overflow: hidden
  margin: 5px 0
  display: flex
  justify-content: space-between
  font-size: 14px
  .thumb
    width: 90px
    height: 90px
    margin: 0 auto;
    overflow: hidden
    .images
      display: block
      width: 100%
      height: 100%
  .detail
    flex: 1
    margin-left 10px
    .row
      line-height: 20px
      margin-bottom: 3px
      display: flex
      justify-content: space-between
      .left
        flex: 1
      .right
        display: flex
        align-item: center
</style>
