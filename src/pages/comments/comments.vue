<template>
  <div class="container">
    <comment-list v-if="userinfo.openId" :comments='comments' type="user"></comment-list>
    <div v-if="userinfo.openId">
      <div class="page-title">我的图书</div>
      <card v-for="book in books" :key="book.id" :book='book'></card>
      <div v-if="!books.length">暂时还没有图书</div>
    </div>
  </div>
</template>
<script>
import CommentList from '@/components/commentlist'
import Card from '@/components/card'
import {get} from '@/util'
export default{
  data() {
    return {
      comments: [],
      userinfo:{},
      books:[]
    }
  },
  components: {
    CommentList,
    Card
  },
  methods: {
    init(){
      wx.showNavigationBarLoading()
      this.getComments()
      this.getBooks()
      wx.hideNavigationBarLoading()
    },
    async getComments() {
      const comments =await get('/weapp/commentlist',{
        openid: this.userinfo.openId
      })
      this.comments = comments.list
    },
    async getBooks() {
      const books = await get('/weapp/booklist',{
        openid: this.userinfo.openId
      })
      this.books = books.list
    }
  },
  onPullDownRefresh() {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow(){
    if (!this.userinfo.openid) {
      let userinfo = wx.getStorageSync('userinfo')
      if (userinfo) {
        this.userinfo = userinfo
        this.init()
      }
    }
  }
}
</script>
<style scoped>
</style>
