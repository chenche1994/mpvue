<template>
  <div class="container">
    <div class="userinfo" @click="login">
      <img alt="" :src="userinfo.avatarUrl" class="userinfo-avatar">
      <p class="userinfo-nickname">{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button class="btn btn-addbook" v-if="userinfo.openId" @click="scanBook">添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="login">点击登录</button>
  </div>
</template>
<script>
import qcloud from 'wafer2-client-sdk'
import {showSuccess, post} from '@/util' 
import config from '@/config'
export default {
  data() {
    return {
      userinfo: {
        avataUrl: '',
        nickName: ''
      }
    }
  },
  methods: { 
    scanBook () { 
      wx.scanCode({ success: (res) => { 
        if(res.result){ 
          console.log(res.result) 
          } 
        } 
      }) 
    }, 
    login () { 
      let user = wx.getStorageSync('userinfo') 
      const self = this 
      if (!user) { 
        qcloud.setLoginUrl(config.loginUrl) 
        qcloud.login({ 
          success: function (userinfo) {
            qcloud.request({ 
              url: config.userUrl, 
              login: true, 
              success (userRes) { 
                showSuccess('登录成功') 
                wx.setStorageSync('userinfo', userRes.data.data)
                console.log(userRes.data.data) 
                self.userinfo = userRes.data.data 
              } 
            }) 
          } 
        }) 
      } 
    } 
  }, 
  onShow () { 
    let userinfo = wx.getStorageSync('userinfo') // console.log([userinfo]) 
    if (userinfo) { this.userinfo = userinfo } // console.log(this.userinfo) 
  }
}
</script>
<style scoped lang="sass">
.container
  padding: 0 30rpx;
  .userinfo
    margin-top: 100rpx
    text-align: center
    img
      width: 150px;
      height: 150px;
      margin: 20rpx;
      border-radius: 50%;
</style>
