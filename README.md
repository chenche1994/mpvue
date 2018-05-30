# mpvue

> A Mpvue project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
## 问题记录

> mpvue无法支持axios
> 有一种说法是：微信小程序采用web开发技术栈，使用JavaScript语言开发，但是JavaScript运行时和浏览器又有所不同，导致axios、jQuery等库无法在微信小程序中使用，而flyio可以。

### 使用Fly.js

``` bash
# npm安装
npm install flyio

# main.js中挂在vue原型上
var Fly = require("flyio/dist/npm/wx")
var fly = new Fly()
Vue.prototype.$http = fly

# 组件中调用
this.$http.get(url).then(res => { 
}).catch(err => { 
})
```
### 另有一篇博主给出mpvue支持axios的方法
> 参考地址：http://www.poorren.com/mpvue-mini-program-ajax-axios
> --链接来自朴人博客

``` bash
# main.js中引入axios，注册
import axios from 'axios'
Vue.prototype.$axios = axios

# 因为小程序环境和浏览器会报错，写adapter（目前还不理解这个）
axios.defaults.adapter = function (config) {
  return new Promise((resolve, reject) => {
    console.log(config)
    wx.request({
      url: config.url, // 测试用的mock地址
      success: function (res) {
        console.log(res)
      }
    })
  })
}

？？这里有一个问题，我在index.vue中使用
const url = 'https://www.easy-mock.com/mock/5b0789678d62b64f5a835a5c/test'
this.$axios.get(url).then((res, rej) => {
  console.log(res, rej)
})
这里console没有输出，但是上面main.js定义的config输出一系列东西其中获得了在组件中定义的url，通过wx.request取得接口数据。
```
