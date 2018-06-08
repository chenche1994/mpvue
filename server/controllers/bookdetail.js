const {mysql} = require('../qcloud')

module.exports= async (ctx) => {
  const {id} = ctx.request.query
  const detail =  await mysql('books')
                        .select()
                        .where('id', id)
  console.log(detail)
  await mysql('books').where('id', id)
                      .increment('count', 1)
}