/*
 * @Author: ylyu
 * @Date: 2022-02-08 14:45:46
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-08 16:00:08
 * @Description:
 */
const http = require('http')
const fs = require('fs')
const path = require('path')

// 创建服务器
http
  .createServer((request, response) => {
    // 解析请求，包括文件名
    const { url } = request

    const fpath = path.join(__dirname, url)
    // 输出请求的文件名
    console.log('Request for ' + url + ' received.')

    // 从文件系统中读取请求的文件内容
    fs.readFile(fpath, (err, data) => {
      if (err) {
        console.log(err)
        // HTTP 状态码: 404 : NOT FOUND
        // Content Type: text/html
        response.writeHead(404, { 'Content-Type': 'text/html' })
        return response.end('404 Not Found!')
      }
      // HTTP 状态码: 200 : OK
      // Content Type: text/html
      response.writeHead(200, { 'Content-Type': 'text/html' })

      // 响应文件内容
      response.write(data.toString())

      //  发送响应数据
      response.end()
    })
  })
  .listen(8080)

// 控制台会输出以下信息
console.log('Server running at http://localhost:8080/')
