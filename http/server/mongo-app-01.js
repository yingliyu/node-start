/*
 * @Author: ylyu
 * @Date: 2022-02-14 15:52:26
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 09:54:10
 * @Description: 使用封装的express路由
 */
const http = require('http')
const app = require('./module/route')
const path = require('path')
const ejs = require('ejs')
const { MongoClient } = require('mongodb')

const url = 'mongodb://admin:admin@localhost:27017'
const dbName = 'mydb'
const client = new MongoClient(url)

http.createServer(app).listen(3000)
app.static('static')

// 配置路由
app.get('/', (req, res) => {
  client.connect((err) => {
    if (err) {
      return console.log(err)
    }
    console.log('Connected successfully to server.')

    const db = client.db(dbName)
    db.collection('user')
      .find({})
      .limit(10)
      .toArray((err, result) => {
        if (err) {
          return console.log(err)
        }
        console.log(result)
        client.close()
        ejs.renderFile(
          path.join(__dirname, './views/index.ejs'),
          { list: result },
          (err, data) => {
            res.send(data)
          }
        )
        // res.send('首页')
      })
  })
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

// 控制台会输出以下信息
console.log('Server running at http://localhost:3000')
