// 导入express
const express = require('express')

// 创建web服务器
const app = express()

// 监听客户端的GET和POST请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用express提供的res.send方法向客户端响应一个json对象
  res.send({ name: 'Tom', age: 18, gender: '男' })
})

app.post('/user', (req, res) => {
  // 调用express提供的res.send方法向客户端响应一个文本字符串
  res.send('请求成功')
})

app.get('/', (req, res) => {
  // 通过req.query可以获取到客户端发送过来的查询参数，默认是空对象
  res.send(req.query)
})

app.get('/user/:id/:name', (req, res) => {
  res.send(req.params)
  console.log(req.params)
})

// app.use(express.static('./public'))
app.use('/static', express.static('./public'))

// 调用app.listen启动服务器
app.listen(8080, () => {
  console.log('Express server running at http://localhost:8080')
})
