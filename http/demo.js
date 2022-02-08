// 1. 导入 http模块
const http = require('http')
// 2. 创建 web 服务器实例
const server = http.createServer()

// 3. 为服务器实例绑定request事件，监听客户端的请求
server.on('request', (req, res) => {
  console.log('Someone visit our web server.')
  // req是请求对象，包含了与客户端相关的数据和属性
  // req.url是客户端请求的URL地址
  // req.method 是客户端请求的method类型
  const { url, method } = req
  const str = `请求地址是： ${url}, 请求类型是： ${method}`
  console.log(str)

  let content = '<h1>404 Not Found!</h1>'
  // 调用res.setHeader()方法设置Content-Type响应头解决中文乱码问题
  res.setHeader('Content-Type', 'text/html;charset=utf-8')
  if (url === '/' || url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h1>关于页面</h1>'
  }
  // 调用res.end()方法向客户端响应一些内容
  res.end(content)
})
// 4. 启动服务器
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080')
})
