<script>
import {get, showSuccess} from './util.js'
import qcloud from 'wafer2-client-sdk'
import config from './config.js'
export default {
  async created () {
    // 先从本地取出userinfo
    let user = wx.getStorageSync('userinfo')
    if (user) {
      // 如果user不存在的话，执行获取用户名操作
      // 设置登录地址
      qcloud.setLoginUrl(config.loginUrl);
      qcloud.login({
          login: true,
          success: function (userinfo) {
              wx.setStorageSync('userinfo', userinfo)
              showSuccess('成功')
          },
          fail: function (err) {
              console.log('登录失败', err);
          }
      });
    }
    
    // const res = await get('/weapp/demo')
    // wx.request({
    //   url: config.host + '/weapp/demo',
    //   success: function(res) {
    //     console.log(res.data)
    //   }
    // })
    // console.log(124, res)
    console.log('小程序请求')
  }
}
</script>

<style>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 200rpx 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
