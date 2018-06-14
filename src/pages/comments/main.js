import Vue from 'vue'
import Comments from './comments.vue'

const app = new Vue(Comments)
app.$mount()

// 修改默认windows配置
export default{
  config: {
    navigationBarTitleText: '评论列表',
    enablePullDownRefresh: true
  }
}
