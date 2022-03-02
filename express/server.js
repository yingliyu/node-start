/*
 * @Author: ylyu
 * @Date: 2022-02-18 17:05:37
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 10:52:17
 * @Description:
 */
const express = require('express')
// 创建web服务器
const app = express()
const { useRouter, adminRouter } = require('./routes')

// 使用路由模块化
app.use('/user', useRouter)
app.use('/admin', adminRouter)

app.listen(8081, () => {
  console.log('App running at http://localhost:8081')
})
