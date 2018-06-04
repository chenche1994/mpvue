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

> 腾讯官方文档升级说为：优化用户体验，使用 wx.getUserInfo 接口直接弹出授权框的开发方式将逐步不再支持
> https://developers.weixin.qq.com/blogdetail?action=get_post_info&lang=zh_CN&token=1888356107&docid=0000a26e1aca6012e896a517556c01&devtools=1
> 解决方案是使用button组件，给open-type指定getUserInfo类型

### mpvue中不支持在 template 内使用 methods 中的函数。

> 调用computed里面的方法可以不用带（）
> 调用methods里面的方法一定要带（）