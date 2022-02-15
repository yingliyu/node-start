/*
 * @Author: ylyu
 * @Date: 2022-02-14 16:02:30
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-15 14:14:12
 * @Description: 封装类似express路由
 */
const fs = require('fs')
const path = require('path')
const url = require('url')

// 扩展res
const changeRes = (res) => {
  res.send = (data) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset="utf-8"' })
    res.end(data)
  }
}

// 根据后缀名获取文件类型
const getFileMime = (extname) => {
  let data = fs.readFileSync(__dirname + '/../data/mime.json')
  let mimeObj = JSON.parse(data.toString())
  return mimeObj[extname]
}

// 静态web服务的方法
const initStatic = (req, res, staticPath) => {
  let pathname = url.parse(req.url).pathname
  pathname = pathname === '/' ? '/index.html' : pathname
  // 2、获取后缀名
  let extname = path.extname(pathname)
  // 3、通过fs模块读取文件
  try {
    const data = fs.readFileSync(__dirname + '/../' + staticPath + pathname)
    let mine = getFileMime(extname) // 同步
    res.writeHead(200, { 'Content-Type': `${mine};charset="utf-8"` })
    res.end(data)
  } catch (error) {}
}

let server = () => {
  let G = {
    _get: {},
    _post: {},
    staticPath: 'static', // 默认静态web目录
  }

  let app = (req, res) => {
    // 扩展res方法
    changeRes(res)
    // 配置静态web服务
    initStatic(req, res, G.staticPath)

    let pathname = url.parse(req.url).pathname
    // 获取请求类型
    let method = req.method.toLowerCase()

    if (G['_' + method][pathname]) {
      if (method === 'get') {
        G._get[pathname](req, res)
      } else {
        // 获取post的数据，绑定到req.body
        let postData = ''
        req.on('data', (chunk) => {
          postData += chunk
        })
        req.on('end', () => {
          req.body = postData
          G['_' + method][pathname](req, res) // 执行方法
        })
      }
    } else {
      console.log('404')
      res.writeHead(404, { 'Content-Type': 'text/html;charset="utf-8"' })
      res.end('Page Not Found')
    }
  }
  // 配置get请求
  app.get = (name, callback) => {
    G._get[name] = callback // 注册方法
  }

  app.post = (name, callback) => {
    G._post[name] = callback // 注册方法
  }

  // 配置静态web服务
  app.static = (staticPath) => {
    G.staticPath = staticPath
  }
  return app
}

module.exports = server()
