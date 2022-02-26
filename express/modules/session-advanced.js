/*
 * @Author: ylyu
 * @Date: 2022-02-25 17:52:00
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-25 17:58:25
 * @Description: session高级用法：分布式架构造成session流失，负载均衡配置session，存数据库中。
 * 实现分布式架构共享session
 */

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const app = express()

app.use(
  session({
    name: 'sessionid',
    secret: 'keyboard cat', // 服务器端生成session的签名
    resave: false, // 强制保存session即使他并没有变化
    saveUninitialized: true, // 强制将未初始化的session存储
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false, // true只有https协议才能访问cookie
    },
    rolling: true, // 每次请求时强行设置cookie，这将重置cookie过期时间（默认false）
    store: MongoStore.create({
      mongoUrl: 'mongodb://127.0.0.1：27017/shop',
      // mongoOptions: advancedOptions, // See below for details
    }),
  })
)

app.get('/', (req, res) => {
  if (req.session.userName || req.session.age) {
    res.send(req.session.userName + '&' + req.session.age + '- 已登录')
  } else {
    res.send(req.session.userName + '- 登录失败或未登录')
  }
})

app.get('/login', (req, res) => {
  req.session.userName = '张三同学'
  req.session.age = 20
  res.send('执行登录')
})

app.get('/loginout', (req, res) => {
  // 1、将过期时间设置为0，或使用req.session.destory，会销毁所有的session
  // req.session.cookie.maxAge = 0
  // req.session.destroy()
  // 2、销毁指定的session
  req.session.userName = ''
  res.send('退出登录')
})

// 调用app.listen启动服务器
app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000')
})
