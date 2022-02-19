# Express 路由

> Express 是基于 Nodejs 平台，快速、开放、极简的 Web 开发框架。

Express 的本质就是一个 npm 上的第三方包，提供快速创建 web 服务器的便捷方法。他的作用和 Nodejs 内置的 http 模块类似，专门用来创建 web 服务器。

## 安装

```js
npm i express --save
```

这里使用的是express@4.17.1

## Express 路由

在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系。

Express 中的路由分为 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数，格式如下：

```js
app.METHOD(path, callback [, callback ...])
```

参数说明：

- path - 请求的 url 地址
- callback - 请求的回调

_Demo:_

```js
// 挂载路由，匹配GET请求，请求url为 /
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// 挂载路由，匹配POST请求，请求url为 /user
app.post('/user', (req, res) => {
  res.send('Send a POST Request.')
})
```

那么路由是怎么匹配的呢？我们来了解一下它的匹配过程。

每当一个请求到达服务器之后，需要先经过路由的匹配，只有匹配成功，才会调用对应的回调函数。在匹配时，会按照路由的`先后顺序`进行匹配，如果`请求类型`和`请求 URL 地址`同时匹配成功，则 Express 会将这次请求转交给对应的 callback 函数处理并响应此次请求。

## 监听 GET 请求

```js
app.get(path, callback [, callback ...])
```

参数说明：

- path - 客户端请求的 url 地址，默认'/'
- callback - 请求对应的回调函数
  - req - 请求对象，包含了与请求相关的属性与方法
  - res - 响应对象，包含了与响应相关的属性和方法

```js
const express = require('express')

// 创建web服务器
const app = express()

// 监听客户端的GET和POST请求，并向客户端响应具体的内容
app.get('/user', (req, res) => {
  // 调用express提供的res.send方法向客户端响应一个json对象
  res.send({ name: 'Tom', age: 18, gender: '男' })
})

app.post('/user', (req, res) => {
  // 调用express提供的res.send方法向客户端响应一个文本字符串
  res.send('请求成功')
})

app.get('/', (req, res) => {
  // 通过req.query可以获取到客户端发送过来的查询参数，默认是空对象
  res.send(req.query)
})

// 调用app.listen启动服务器
app.listen(8080, () => {
  console.log('Express server running at http://localhost:8080')
})
```

启动服务，可以在 postman 中发请求查看结果。

## 获取 url 中的动态参数

通过 req.params 对象，可以访问到 url 中通过`:`符号匹配到的动态参数，例如：/user/:id 中的 id。

```js
app.get('/user/:id', (req, res) => {
  // 通过req.query可以获取到客户端发送过来的查询参数，默认是空对象
  res.send(req.params)
  console.log(req.params)
})
```

## Express 托管静态资源

Express 提供了一个非常好用的函数，express.static()，用它可以非常方便的创建一个静态资源服务器。

```js
express.static(root, [options])
```

参数说明：

- root - 指定提供静态资源的根目录
- options - [其他配置项](https://www.expressjs.com.cn/4x/api.html#express.static)

通常我们的单页面应用中在项目的 public 目录放一些静态资源、index.html，那么通过如下代码就可以将 public 目录内资源对外访问。

```js
app.use(express.static('./public'))
```

然后，可以通过 http://localhost:8080/`[filename]` 访问 public 目录下的所有文件。

_挂载路径前缀_

如果希望在托管的静态资源访问路径前挂载路径前缀，可以使用如下方式：

```js
app.use('/static', express.static('./public'))
```

然后，可以通过 http://localhost:8080/`static`/`[filename]` 访问 public 目录下的所有文件。

## 模块化路由

实际项目中业务模块比较多的时候，路由文件就会很庞大，不利于维护。那么为了更好的解决这个问题，可以使用模块化路由，方便对路由进行模块化管理，Express 不建议直接将路由挂载到 app 上，而是推荐将路由抽离为单独的模块。

将路由抽离为单独模块的步骤;

1. 创建路由模块对应的`.js` 文件
2. 调用 express.Router()函数创建路由对象
3. 向路由对象上挂载具体的路由
4. 使用 module.exports 向外共享路由对象
5. 使用 app.use()函数注册路由模块

> app.use()函数的作用就是，注册全局中间件

_挂载路由模块前缀_

类似于托管的静态资源时，为静态资源统一挂载访问路径前缀一样，路由模块添加前缀的方式如下：

1. 导入路由模块
2. 使用 app.use()注册路由模块并添加统一的访问前缀

```js
// 1. 导入路由模块
const useRouter = require('.router/user.js')
// 2. 使用 app.use()注册路由模块并添加统一的访问前缀/api
app.use('/api', useRouter)
```

然后，可以通过 http://localhost:8080/`static`/`[filename]` 访问。

## 最后

参考：[Express](https://www.expressjs.com.cn/)

> 如果有错别字或者不对的地方欢迎指出，将在第一时间改正，如果有更好的实现或想法希望留下你的评论 🔥
