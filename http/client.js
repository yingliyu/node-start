/*
 * @Author: ylyu
 * @Date: 2022-02-08 14:39:22
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-08 14:42:08
 * @Description:
 */
const http = require('http')

const options = {
  host: 'localhost',
  port: '8080',
  path: '/index.html',
}

// 处理响应的回调函数
const callback = (res) => {
  let body = ''
  res.on('data', (data) => {
    body += data
  })
  res.on('end', () => {
    console.log('数据接收完成...', body)
  })
}
const req = http.request(options, callback)
req.end()
