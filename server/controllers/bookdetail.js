const {mysql} = require('../qcloud')

module.exports= async (ctx) => {
  const {id} = ctx.request.query
  const detail =  await mysql('books')
                        .select('books.*','cSessionInfo.user_info')// books表下面的所有数据和cSessionInfo的user_info数据
                        .join('cSessionInfo','books.openid','cSessionInfo.open_id')// 设置和哪个表连，后面的参数是限制的条件:books.openid = 
                        .where('id', id)
                        .first()
  const info = JSON.parse(detail.user_info)                     
  ctx.state.data = Object.assign({},detail, {
    tags: detail.tags.split(','),
    summary: detail.summary.split('\n'),
    user_info: {
      name: info.nickName,
      image: info.avatarUrl
    }
  })
  await mysql('books').where('id', id)
                      .increment('count', 1)
}
