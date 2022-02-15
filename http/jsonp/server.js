/*
 * @Author: ylyu
 * @Date: 2022-02-15 21:48:42
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-15 22:29:48
 * @Description:
 */

const http = require('http')
const url = require('url')
http
  .createServer((req, res) => {
    let pathname = req.url
    const urlObj = url.parse(pathname, true)
    // const urlObj = new URL(pathname, 'http:localhost:8080')
    console.log('===', urlObj)

    switch (urlObj.pathname) {
      case '/api/data':
        res.write(`${urlObj.query.cb}("Hello Jsonp")`)
        break
      default:
        res.write('Page Not Found.')
    }
    res.end()
  })
  .listen(8080)

console.log('Server running at http://localhost:8080')
