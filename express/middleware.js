/*
 * @Author: ylyu
 * @Date: 2022-02-18 17:37:52
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-18 18:07:38
 * @Description: 自定义中间件
 */

const express = require('express')
const app = express()

// 自定义中间件
// const custonMW = (req, res, next) => {
//   console.log('这是一个简单的自定义中间件函数')
//   // 把流转关系转交给下一个中间件或路由
//   next()
// }
// // 将custonMW中间件注册为全局生效的中间件
// app.use(custonMW)

app.use((req, res, next) => {
  console.log('这是一个简单的自定义中间件函数1')
  const time = Date.now()
  // 为req对象挂载自定义属性，从而把时间共享给后面的所有路由
  req.startTime = time
  next()
})

app.use((req, res, next) => {
  console.log('这是一个简单的自定义中间件函数2')
  next()
})

app.get('/', (req, res) => {
  res.send('Home page.' + req.startTime)
})

app.get('/user', (req, res) => {
  res.send('User page.' + req.startTime)
})

app.listen(8080, () => {
  console.log('Server running at http://localhost:8080')
})
