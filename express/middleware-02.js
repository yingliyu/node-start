/*
 * @Author: ylyu
 * @Date: 2022-02-18 17:37:52
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-19 21:28:01
 * @Description: Express 第三方中间件
 */

const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const app = express()

app.engine('html', ejs.__express)
app.set('view engine', 'html')
app.use('/public', express.static('./public'))

// 配置第三方中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Home page.')
})

app.get('/login', (req, res) => {
  res.render('login', {})
})

app.post('/doLogin', (req, res) => {
  let body = req.body
  console.log(body)
  res.send('post doLogin')
})

app.use((req, res, next) => {
  res.status(404).send('404')
  next()
})

app.listen(8000, () => {
  console.log('Server running at http://localhost:8000')
})
