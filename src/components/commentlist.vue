<template>
  <div class="commentlist">
    <div class="page-title" v-if="comments.length">我的评论</div>
    <div class="comment" v-for="comment in comments" :key="comment.id" @click="handleClick(comment)">
      <div class="userimg">
        <img :src="comment.user_info.image" class="avatar" mode='aspectFit'>
      </div>
      <div class="content">
        <div class="username">{{comment.user_info.title}}</div>
        <div class="text">{{comment.comment}}</div>
        <div class="bottom">
          <span>{{comment.location || '未知地点'}}</span><span>{{comment.phone || '未知手机型号'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    comments: {
      type: Object
    },
    type: {
      type:''
    }
  },
  methods: {
    // 页面跳转
    handleClick(item){
      if(this.type === 'user') {
        wx.navigateTo({
          url:'/pages/detail/main?id=' + item.bookid
        })
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.commentlist
  font-size: 14px
  .comment
    background: #fff
    padding: 5px 20px
    margin-bottom: 10px
    display: flex
    .userimg
      margin-right: 10px;
      .avatar
        width: 20px
        height: 20px
        border-radius: 50%
        margin-right: 5px
        vertical-align: middle
    .content
      flex: 1
      .username
        color: #333;
        margin-bottom: 5px
        font-size: 12px
      .text
        color:#555
        margin-bottom: 5px
      .bottom
        display: flex
        justify-content: space-between
        span
          font-size: 12px;
          color:#999
</style>
