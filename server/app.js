/*
 * @Author: ylyu
 * @Date: 2022-02-14 15:52:26
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-15 15:32:29
 * @Description: 使用封装的express路由
 */
const http = require('http')
const app = require('./module/route')
const path = require('path')
const ejs = require('ejs')
// express

http.createServer(app).listen(3000)
app.static('static')

// 控制台会输出以下信息
console.log('Server running at http://localhost:3000')

// 配置路由
app.get('/', (req, res) => {
  res.send('首页')
})

// 配置路由
app.get('/login', (req, res) => {
  ejs.renderFile(path.join(__dirname, './views/form.ejs'), {}, (err, data) => {
    if (err) {
      return console.log(err)
    }
    res.send(data)
  })
})

// 配置路由
app.post('/doLogin', (req, res) => {
  console.log(req.body)
  res.send(req.body)
})
// 配置路由
app.get('/news', (req, res) => {
  res.send('资讯页面')
})
