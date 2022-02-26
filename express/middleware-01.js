/*
 * @Author: ylyu
 * @Date: 2022-02-18 17:37:52
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-19 20:57:32
 * @Description: Express 中间件
 */

const express = require('express')
const app = express()
// 4、内置中间件
app.use(express.static('./public'))

// 自定义中间件
// const custonMW = (req, res, next) => {
//   console.log('这是一个简单的自定义中间件函数')
//   // 把流转关系转交给下一个中间件或路由
//   next()
// }
// // 将custonMW中间件注册为全局生效的中间件
// app.use(custonMW)

// 1、应用级中间件（用于权限判断）
// app.use((req, res, next) => {
//   console.log('这是一个简单的自定义中间件函数1')
//   const time = Date.now()
//   // 为req对象挂载自定义属性，从而把时间共享给后面的所有路由
//   req.startTime = time
//   next()
// })

// app.use((req, res, next) => {
//   console.log('这是一个简单的自定义中间件函数2')
//   next()
// })

app.get('/', (req, res) => {
  console.log(req.startTime ? req.startTime : '')
  res.send('Home page.')
})

app.get('/login', (req, res) => {
  res.send('login...')
})
// 2、路由级中间件(不常用)
app.get('/user/add', (req, res, next) => {
  console.log('add user.')
  // res.send('User page.' + req.startTime)
  next()
})

app.get('/user/:id', (req, res) => {
  res.send('user动态路由')
})
// 3、错误处理中间件
app.use((req, res, next) => {
  res.status(404).send('404')
  next()
})

app.listen(8000, () => {
  console.log('Server running at http://localhost:8000')
})
