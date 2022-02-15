/*
 * @Author: ylyu
 * @Date: 2022-02-14 11:21:09
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-14 16:12:56
 * @Description: 工具初步封装
 */
const fs = require('fs')
const path = require('path')
const url = require('url')

const app = {
  static: (req, res, staticPath) => {
    // 1、获取地址
    // let pathname = req.url //无法访问类似/js/data.json?2324379487394的url
    // 访问/js/data.json?2324379487394
    let pathname = url.parse(req.url).pathname
    // let pathname = new URL('http://localhost:8080' + req.url).pathname
    // console.log(pathname)

    pathname = pathname === '/' ? '/index.html' : pathname
    // 2、获取后缀名
    let extname = path.extname(pathname)
    // 3、通过fs模块读取文件
    if (pathname !== '/favicon.ico') {
      try {
        const data = fs.readFileSync(__dirname + '/../' + staticPath + pathname)
        // let mine = await getFileMime(extname) // 异步
        let mine = getFileMimeSync(extname) // 同步
        res.writeHead(200, { 'Content-Type': `${mine};charset="utf-8"` })
        res.end(data)
      } catch (error) {}
    }
  },
  login: (req, res) => {
    res.end('login')
  },
  news: (req, res) => {
    res.end('news')
  },
  doLogin: (req, res) => {
    res.end('doLogin')
  },
  error: (req, res) => {
    res.end('error')
  },
}

const getFileMime = (extname) => {
  return new Promise((resolve, reject) => {
    fs.readFile(__dirname + '/../data/mime.json', (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }
      let mimeObj = JSON.parse(data.toString())
      // console.log(mimeObj[extname])
      resolve(mimeObj[extname])
    })
  })
}

const getFileMimeSync = (extname) => {
  let data = fs.readFileSync(__dirname + '/../data/mime.json')
  let mimeObj = JSON.parse(data.toString())
  // console.log(mimeObj[extname])
  return mimeObj[extname]
}

module.exports = app
