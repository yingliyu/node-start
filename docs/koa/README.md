# Koa 基础

安装：

```js
npm install koa --save
```

## 洋葱模型

中间件洋葱模型：中间件执行顺序

中间件就是类似于一个过滤器的东西，在客户端和应用程序之间的一个处理请求和响应的方法。

Koa 是洋葱中间件模式，执行到 next()的时候，就会去调用下一个中间件，下个中间件执行完再接着执行上个中间件 next()后面的代码。

Koa 的中间件都是异步函数。

```js
const Koa = require('koa')

const app = new Koa()

// ctx是上下文context，koa将response和request封装到ctx中了
app.use(async (ctx, next) => {
  console.log(1)
  await next()
  console.log(2)
})

// response
app.use(async (ctx, next) => {
  console.log(3)
  await next()
  console.log(4)
})

// response
app.use(async (ctx) => {
  console.log('Hello world')
  ctx.body = 'Hello Koa'
})

app.listen(8000)
console.log('Server running at http://localhost:8000')
```

我们看到打印结果：

```js
1
3
Hello world
4
2
```

> 外层中间件进行前期处理（next 前的逻辑）
> 调用 next，将控制流交给下个中间件，并 await 其完成，直到后面没有中间件或者没有 next 函数执行为止，
> 完成后一层层回溯执行各个中间件的后期处理（next 后的逻辑）

## 路由

安装：

```js
npm install koa-router --save
```

ctx.body 响应给前端，返回接口数据给前端开发者
