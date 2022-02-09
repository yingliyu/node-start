# Nodejs 基础——http 模块

<!-- 127.0.0.1 -->

## 前言

以前总是对全栈嗤之以鼻，觉得做前端就学好前端就可以了，毕竟术业有专攻，况且前端的内容也很多而且日新月异，但是今天我的想法被颠覆了，变得青睐于全栈。可能是一次次依赖于后端过于束手束脚，不能自由把自己的想法变成现实/产品，那么就现在从学习 Nodejs 开始吧，再出发！💪

Node.js 开发的目的就是为了用 JavaScript 编写 Web 服务器程序，HTTP 模块是 JS 编写 Web 服务器程序的核心模块。正是如此，相信大部分前端 er 已经掌握了 js 前端的开发，那么再学会如何将 js 应用在后端开发，那你就是名副其实的全栈了。

## http 相关概念

http 模块是 Nodejs 官方提供的用来创建 web 服务器的模块。通过 http 模块提供的 http.createServer()方法就能方便的把一台普通的电脑变成一台 web 服务器，从而对外提供 web 资源服务。可以使用`phpstudy`进行开发调试。

### IP

我们知道 IP（Internet Protocol Address）地址指互联网协议地址，就是互联网上每台计算机的唯一地址，因此 IP 地址具有唯一性。电脑和 IP，相当于手机和手机号，只有在知道对方 IP 地址的前提下才能与对应的电脑之间进行通信。

> 互联网中每台 web 服务器都有自己的 IP 地址。

### 域名

> 域名（Domain Name）是由一串用点分隔的名字组成的 Internet 上某一台计算机或计算机组的名称，用于在数据传输时对计算机的定位标识（有时也指地理位置）。

尽管 IP 地址能够唯一地标记网络上的计算机，但由于 IP 地址采用了数字化的形式，不方便记忆并且不能显示地址组织的名称和性质等缺点，人们设计出了域名，IP 地址和域名存在对应关系，通过域名系统（DNS，Domain Name System）来将域名和 IP 地址相互映射，使用者只需通过好记得域名更方便地访问互联网，对应得转换工作由 DNS 实现。

域名系统就是提供 IP 地址和域名之间转换服务的服务器。

使用 phpstudy Apache 服务器开发测试期间，127.0.0.1 对应的域名是 localhost，它们都代表自己的电脑。

### 端口号

在一台电脑中可运行成百上千个 web 服务，每个 web 服务都对应一个唯一的端口号。客户端发送过来的网络请求通过端口号可以被准确的交给对应的 web 服务器进行处理。
也就是说，ip 地址代表了服务器的具体地址，端口号代表了服务器中所提供的服务。

同一台服务器，一个端口号只能对应一个 web 服务。

## 搭建 Http 服务器

搭建 Http 服务器的基本步骤：

1. 导入 `http` 模块
2. 创建 web 服务器实例
3. 为服务器实例绑定 `request` 事件，监听客户端的请求
4. 启动服务器

> 该模块提供了一些属性、方法、以及类。

```js
// 1. 导入 http模块
const http = require('http')
// 2. 创建 web 服务器实例
const server = http.createServer()
// 3. 为服务器实例绑定request事件，监听客户端的请求
server.on('request', (req, res) => {
  console.log('Someone visit our web server.')
})
// 4. 启动服务器
server.listen(8080, () => {
  console.log('Server running at http://localhost:8080')
})
```

在命令行运行`node ./http/server.js`，然后在浏览器中输入`http://localhost:8080`、`http://localhost:8080/home.html`

```js
$ node ./http/demo.js
Server running at http://localhost:8080
Someone visit our web server.
Your request url is /, request method is GET
Your request url is /home.html, request method is GET
Someone visit our web server.
```

> 要开发 HTTP 服务器程序，从头处理 TCP 连接，解析 HTTP 是不现实的。这些工作实际上已经由 Node.js 自带的 http 模块完成了。应用程序并不直接和 HTTP 协议打交道，而是操作 http 模块提供的 request 和 response 对象。

## req 请求对象

服务器接收到客户端的请求就会调用 server.on()为服务器绑定 req 事件处理函数，通过 req 可以访问与客户端相关的数据或属性。

- req 是请求对象，包含了与客户端相关的数据和属性；
- req.url 是客户端请求的 URL 地址；
- req.method 是客户端请求的 method 类型，例如 GET、POST 等等；

## res 响应对象

在服务器的 request 事件处理函数中，可通过 res 访问与服务器相关的数据或属性。

## 方法

### http.createServer()

返回 http.Server 类的新实例

### http.request()

发送 Http 请求到服务器，并创建 http.ClientRequest 类的实例。

### server.on()

服务器接收到客户端的请求就会调用 server.on()方法

### server.listen()

启动 HTTP 服务器监听连接。

### res.setHeader()

res.setHeader(name,value)

- name <string>
- value <any>
  返回: <http.ServerResponse>
  返回响应对象。

调用 res.setHeader()方法设置 Content-Type 响应头解决中文乱码问题

```js
res.setHeader('Content-Type', 'text/html;charset=utf-8')
```

### res.end()

调用 res.end()方法将内容响应给客户端，并结束此次请求的处理过程。

## 搭建一个文件服务器

http 模块主要用于搭建 HTTP 服务端和客户端。

### 创建 Web 服务器:

```js
// server.js
const http = require('http')
const fs = require('fs')
const path = require('path')

// 创建服务器
http
  .createServer((request, response) => {
    // 解析请求，包括文件名
    const url = request.url
    console.log('=====', url)

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
```

在同级目录下创建一个 index.html 文件

```html
<html>
  <head>
    <meta charset="utf-8" />
    <title>Nodejs Http</title>
  </head>
  <body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
  </body>
</html>
```

命令行执行：`node ./http/server.js`，终端输出：

```bash
Server running at http://localhost:8080/
Request for home.html received.
```

在浏览器中访问 http://localhost:8080/index.html

### 创建 Web 客户端:

```js
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
```

命令行执行：`node ./http/client.js`，终端输出：

```bash
数据接收完成... <html>
  <head>
    <meta charset="utf-8" />
    <title>Nodejs Http</title>
  </head>
  <body>
    <h1>我的第一个标题</h1>
    <p>我的第一个段落。</p>
  </body>
</html>
```

## 最后

更多 API 参考：[Nodejs 官方](http://nodejs.cn/learn/the-nodejs-http-module)、[Nodejs 教程](https://www.runoob.com/nodejs/nodejs-web-module.html)

> 文章有误解的地方，欢迎指出，将在第一时间改正，有更好的实现方式希望留下你的评论
