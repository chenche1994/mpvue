<template>
  <div>
    <BookInfo :info='info'></BookInfo>
    <div class="comment">
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
  </div>
</template>
<script>
import {get} from '@/util.js'
import BookInfo from '@/components/bookinfo'
export default {
  data() {
    return {
      bookid: '',
      info: {},
      comment: '',
      location: '',
      phone: ''
    }
  },
  methods: {
    async getDetail() {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    getGeo(e) {
      // 高德地图key
      const mapkey = '2a92f6957790322eec1772ca77bcdd8d'
      let url = 'http://restapi.amap.com/v3/geocode/regeo?parameters'
      if(e.target.value) {
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
    getPhone(e) {
      if(e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        this.phone = phoneInfo.model
      } else {
        this.phone = ''
      }
    },
    addComment() {
      // 获取评论内容，定位，手机型号，图书id，用户id
      const data = {
        comment: this.comment,
        phone: this.phone,
        location: this.location,
        bookid: this.bookid
      }
    }
  },
  mounted() {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
  },
  components: {
    BookInfo
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
</style>
