const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {comment, openid, bookid, phone, location} = ctx.request.body
    try {
        await mysql('comment').insert({
            comment, openid, bookid, phone, location
        })
        ctx.state.data = {
            msg: 'success'
        }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '新增失败' + e.sqlMessage
            }
        }
    }
}
