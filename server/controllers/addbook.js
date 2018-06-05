const https = require('https')
const {mysql} = require('../qcloud')
//新增图书
// 获取图书信息
// https://developers.douban.com/wiki/?title=book_v2#get_isbn_book
// https://api.douban.com/v2/book/isbn/9787536692930
// 入库
module.exports = async (ctx) => {
  const {isbn, openid} = ctx.request.body
  if (isbn && openid) {
    const findRes = await mysql('books').select().where('isbn',isbn)
    if (findRes.length) {
      ctx.state = {
        code: -1,
        data:{
          msg: '图书已存在'
        }
      }
      return
    }
    const url = `https://api.douban.com/v2/book/isbn/${isbn}`
    const bookinfo = await getJSON(url)
    const rate = bookinfo.rating.average
    const {title, image, alt, publisher, summary, price} = bookinfo
    const tags = bookinfo.tags.map(v => {
      return `${v.title} ${v.count}`
    }).join(',')
    const author = bookinfo.author.join(',')
    try{
      await mysql('books').insert({
        isbn, openid, rate,title,image,alt,publisher,summary,price,tags,author
      })
      ctx.state.data = {
        title,
        msg:'success'
      }
    }catch(e){
      ctx.state = {
        code: -1,
        data: {
          msg: '新增失败' + e.sqlMessage
        }
      }
    }
  }
}

function getJSON(url) {
  return new Promise((resolve, reject) => {
    // 流的形式存在，并不能直接返回结果
    https.get(url, res => {
      let urlData = ''
      // 每次获取新数据的时候，累加
      res.on('data', data => {
        urlData += data
      })
      // 获取结束时
      res.on('end', data => {
        const bookinfo = JSON.parse(urlData)
        // 图书不存在时，bookinfo的title不存在
        if (bookinfo.title) {
          resolve(bookinfo)
        }
        reject(bookinfo)
      })
    })
  })
}