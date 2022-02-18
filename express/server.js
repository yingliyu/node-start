const express = require('express')
// 创建web服务器
const app = express()
const useRouter = require('./router/user')

// 使用app
app.use('/api', useRouter)

app.listen(8081, () => {
  console.log('App running at http://localhost:8081')
})
