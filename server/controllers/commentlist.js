const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid} = ctx.request.query
    const comments = await mysql('comment')
        .select('comment.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comment.openid', 'cSessionInfo.open_id')
        .where('bookid', bookid)
    ctx.state.data = {
        list: comments.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    title: info.nickName,
                    image: info.avatarUrl
                }
            })
        })
    }
}
