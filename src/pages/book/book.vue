<template>
  <div>
    <TopSwiper :tops='tops'></TopSwiper>
    <Card v-for="book in books" :key="book.id" :book='book'></Card>
    <p class="text-footer" v-if="!more">没有更多数据了</p>
  </div>
</template>
<script>
import {get} from '@/util'
import Card from '@/components/card'
import TopSwiper from '@/components/topswiper'
export default {
  data () {
    return {
      books: [],
      page: 0, // 当前是第几页
      more: true,
      tops: []
    }
  },
  methods: {
    // 下拉刷新或者刚加载时都是加载第一页
    async getList (init) {
      if (init) {
        this.more = true
        this.page = 0
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {page: this.page})
      // this.books = books.list
      if (books.list.length < 10 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(books.list)
      }
      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getList(true)
    this.getTop()
  },
  // 触底上拉刷新
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page = this.page + 1
    this.getList()
  },
  mounted () {
    this.getList(true)
    this.getTop()
  },
  components: {
    Card,
    TopSwiper
  }
}
</script>
<style scoped>
</style>
