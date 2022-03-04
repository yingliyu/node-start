/*
 * @Author: ylyu
 * @Date: 2022-03-04 14:47:13
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-04 16:06:23
 * @Description:
 */
const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')()

// 启动路由
app.use(router.routes()).use(router.allowedMethods())

// 中间件
// app.use(async (ctx, next) => {
//   console.log(1)
//   await next()
//   console.log(2)
// })

// 中间件
// app.use(async (ctx, next) => {
//   console.log(3)
//   await next()
//   console.log(4)
// })

app.use(async (ctx) => {
  console.log('Hello world')
  ctx.body = 'Hello Koa'
})

router.get('/', async (ctx) => {
  // console.log(ctx)
  ctx.body = {
    data: {
      msg: '返回数据信息',
    },
  }
})

// GET:
/**
 * 在koa中get传值通过request接收，接受的格式有两种：query和querystring
 * query返回的是格式化后的参数对象，querystring返回的是请求字符串。
 */
router.get('/list', async (ctx) => {
  //调http://localhost:8000/list?name=lemon&age=19接口
  console.log(ctx.query) // { name: 'lemon', age: '19' }
  console.log(ctx.querystring) // name=lemon&age=19

  console.log(ctx.request)
  console.log(ctx.request.query) // { name: 'lemon', age: '19' }
  console.log(ctx.request.querystring) // name=lemon&age=19

  // ctx.body = 'hello world'
  ctx.body = {
    msg: 'hello world',
  }
})

app.listen(8000)

console.log('Server running at http://localhost:8000')
