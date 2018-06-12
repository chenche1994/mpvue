<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <CommentList :comments="comments"></CommentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model="comment" class="textarea" :maxlength="100" placeholder="请输入图书评论，100字以内"/>
      <div class="location">
        地理位置
        <switch color='#ea5a49' @change="getGeo($event)"></switch><span>{{location}}</span>
      </div>
      <div class="phone">
        手机型号<switch color='#ea5a49' @change="getPhone($event)"></switch><span>{{phone}}</span>
      </div>
      <button class="btn" @click="addComment">评论</button>
    </div>
    <div v-else class="tips">您还没有登录或者已经评论过这本书了</div>
    <button class="btn" open-type='share'>分享给好友</button>
  </div>
</template>
<script>
import {get, post, showModal, showToast} from '@/util.js'
import BookInfo from '@/components/bookinfo'
import CommentList from '@/components/commentlist'
export default {
  data () {
    return {
      userinfo: '',
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: '',
      comments: []
    }
  },
  computed: {
    // 是否显示添加评论输入框
    showAdd () {
      // 没有登录
      if (!this.userinfo.openId) {
        return false
      }
      // 评论列表里已经存在这个id对这本书的评论
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods: {
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = comments.list
    },
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    getGeo (e) {
      // 高德地图key
      const mapkey = '2a92f6957790322eec1772ca77bcdd8d'
      let url = 'http://restapi.amap.com/v3/geocode/regeo?parameters'
      if (e.target.value) {
        wx.getLocation({
          success: geo => {
            wx.request({
              url,
              data: {
                key: mapkey,
                location: `${geo.longitude},${geo.latitude}`,
                output: 'json'
              },
              success: res => {
                console.log(res)
                if (res.data.status) {
                  this.location = res.data.regeocode.addressComponent.city
                } else {
                  this.location = '未知地点'
                }
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    getPhone (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    async addComment () {
      // debugger
      if (!this.comment) {
        return
      }
      // 获取评论内容，定位，手机型号，图书id，用户id
      const data = {
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookid: this.bookid,
        openid: this.userinfo.openId
      }
      try {
        await post('/weapp/addcomment', data)
        this.getComments()
        showToast('评论成功')
        this.comment = ''
      } catch (e) {
        showModal('失败', e.message)
      }
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    this.getComments()
  },
  components: {
    BookInfo,
    CommentList
  }
}
</script>
<style scoped lang='sass'>
  .textarea
    padding: 10px
    width: 730rpx
    height: 200rpx
    background: #f2f2f2
  .location,.phone
    padding: 0 10px
    margin-top: 10px
    font-size: 14px
    span
      color: #ea5a49
  .btn
    margin: 10rpx 20rpx
    width: 710rpx
  .tips
    color:#ea5a49
    font-size: 12px
    text-align: center
</style>
