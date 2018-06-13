const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {bookid,openid} = ctx.request.query
    const mysqlSelect = mysql('comment')
        .select('comment.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'comment.openid', 'cSessionInfo.open_id')
    let comments
    // 根据bookid和openid返回comments
    if(bookid){
        comments = await mysqlSelect.where('bookid',bookid)
    }else if (openid) {
        comments = await mysqlSelect.where('openid',openid)
    }
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
