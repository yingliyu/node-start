/*
 * @Author: ylyu
 * @Date: 2022-02-14 15:52:26
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 10:30:22
 * @Description: 使用封装的express路由
 */
const http = require('http')
const app = require('./module/route')
const path = require('path')
const querystring = require('querystring')

const ejs = require('ejs')
const { MongoClient } = require('mongodb')

const url = 'mongodb://admin:admin@localhost:27017'
const dbName = 'mydb'

http.createServer(app).listen(3000)
app.static('static')

// 配置路由
app.get('/', (req, res) => {
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return console.log(err)
    }
    console.log('Connected successfully to server.')
    const db = client.db(dbName)
    db.collection('user')
      .find({})
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
      })
  })
})

// 注册
app.get('/reg', (req, res) => {
  ejs.renderFile(
    path.join(__dirname, './views/register.ejs'),
    {},
    (err, data) => {
      if (err) {
        return console.log(err)
      }
      res.send(data)
    }
  )
})

// 配置路由
app.post('/doRegister', (req, res) => {
  console.log(req.body) // username=zhangsan00&age=123
  const body = querystring.parse(req.body)
  console.log(body)
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return console.log(err)
    }
    const db = client.db(dbName)
    db.collection('user').insertOne(body, (err, result) => {
      if (err) {
        return console.log(err)
      }
      client.close()
      console.log('增加数据成功')
      res.send('增加数据成功')
    })
  })
})
// 控制台会输出以下信息
console.log('Server running at http://localhost:3000')
