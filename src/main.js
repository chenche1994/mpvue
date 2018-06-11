import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    // 配置tabBar里面的图标路径不需要加../
    pages: ['^pages/book/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#Ea5149',
      navigationBarTitleText: '我的图书',
      navigationBarTextStyle: 'white'
    },
    tabBar: {
      selectedColor: '#ea5149',
      list: [{
        pagePath: 'pages/book/main',
        text: '图书',
        iconPath: 'static/book.png',
        selectedIconPath: 'static/book-active.png'
      },
      {
        pagePath: 'pages/comments/main',
        text: '评论',
        iconPath: 'static/room.png',
        selectedIconPath: 'static/room-active.png'
      },
      {
        pagePath: 'pages/me/main',
        text: '我的',
        iconPath: 'static/me.png',
        selectedIconPath: 'static/me-active.png'
      }]
    }
  }
}
