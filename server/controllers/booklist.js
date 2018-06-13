const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    const {page, openid} = ctx.request.query // 这里为什么page要加{}。ctx.request.query是什么？
    const size = 5
    const mysqlSelect = mysql('books')
        .select('books.*', 'cSessionInfo.user_info')// books表下面的所有数据和cSessionInfo的user_info数据
        .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')// 设置和哪个表连，后面的参数是限制的条件:books.openid = cSessionInfo.open_id
        .orderBy('books.id', 'desc')// 按照book的id从后到前排序
    let books
    if(openid){
        books =await mysqlSelect.where('books.openid', openid)
    } else{
        books = await mysqlSelect.limit(size).offset(Number(page) * size)// limit设置每次查询的数量
                                 // offset查询的起点
    }
    ctx.state.data = {
        list: books.map(v => {
            const info = JSON.parse(v.user_info)
            return Object.assign({}, v, {
                user_info: {
                    nickName: info.nickName
                }
            })
        })
    }
}
