<template>
  <div>
    <swiper indicator-dots="indicatorDots" autoplay="autoplay">
      <block v-for="(url,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src= url />
        </swiper-item>
      </block>
    </swiper>
    <Card v-for="book in books" :key="book.id" :book='book'></Card>
    <p class="text-footer" v-if="!more">没有更多数据了</p>
  </div>
</template>
<script>
import {get} from '@/util'
import Card from '@/components/card'
export default {
  data(){
    return {
      books: [],
      page: 0,// 当前是第几页
      more: true,
      tops: [],
      imgUrls: [
        'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
        'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
      ],
    }
  },
  methods: {
    // 下拉刷新或者刚加载时都是加载第一页
    async getList(init) {
      if (init) {
        this.more = true
        this.page = 0
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist',{page: this.page})
      this.books = books.list
      if (books.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (inint) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop() {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.getList(true)
    this.getTop()
  },
  // 触底上拉刷新
  onReachBottom() {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getList()
  },
  mounted() {
    this.getList(true)
    this.getTop()
  },
  components: {
    Card
  }
}
</script>
<style scoped>
</style>
