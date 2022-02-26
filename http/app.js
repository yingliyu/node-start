/*
 * @Author: ylyu
 * @Date: 2022-02-24 15:59:02
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-24 16:01:27
 * @Description:
 */

const http = require('http')

http
  .createServer((req, res) => {
    console.log(require.extensions)
    res.end('hello world!')
  })
  .listen(8001)
