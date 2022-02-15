const http = require('http')
const url = require('url')
const routes = require('./module/route-demo')

http
  .createServer((req, res) => {
    // 创建静态web服务
    routes.static(req, res, 'static')

    let pathname = url.parse(req.url).pathname.replace('/', '')
    // http://127.0.0.1/login  pathname = login
    // http://127.0.0.1/news  pathname = news
    try {
      routes[pathname](req, res)
    } catch (error) {
      routes.error(req, res)
    }
  })
  .listen(8080)

// // 控制台会输出以下信息
console.log('Server running at http://localhost:8080')
