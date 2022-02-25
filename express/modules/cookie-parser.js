/*
 * @Author: ylyu
 * @Date: 2022-02-25 16:04:59
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-25 17:05:18
 * @Description: 第三方中间件cookie-parser用法
 */
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
// 配置cookieparser中间件

app.use(cookieParser('miyao'))

app.get('/', (req, res) => {
  // 设置cookie 6s过期
  /**
   * cookie加密：
   * 1、配置中间件时传入加密的参数app.use(cookieParser("miyao"))
   * 2、res.cookie('userName', 'zzs', {sign:true})
   * 3、获取cookie：req.signedCookies.userName
   */
  res.cookie('userName', 'zzs', {
    maxAge: 1000 * 60,
    sign: true,
    // domain: '.cnabs.com',
    // path: '/news'
  })
  res.send('hello express')
})

app.get('/news', (req, res) => {
  // 获取cookie
  // let userName = req.cookies.userName

  let userName = req.signedCookies.userName
  console.log(userName)
  res.send('hello news')
})

app.get('/user', (req, res) => {
  // 获取cookie
  // let userName = req.cookies.userName

  let userName = req.signedCookies.userName
  console.log(userName)
  res.send('hello user')
})

// 调用app.listen启动服务器
app.listen(3000, () => {
  console.log('Express server running at http://localhost:3000')
})
