# Nodejs 基础——stream 模块

## 前言

以前总是对学习全栈开发嗤之以鼻，觉得做前端就学好前端就 ok，毕竟术业有专攻，况且前端的技术内容繁杂且日新月异，但今时不同往日现在觉得以前的自己还是太年轻，以前的想法被完全颠覆了。近几年大前端、低代码、微前端、Serverless 等众多技术思想如雨后春笋般涌出，前端发展大好，想要更好的做好前端，学习全栈开发只会锦上添花。最重要的是不再依赖于后端小伙伴，可以自由地调试实践，把自己的想法变成现实或者一个完整的产品（这会是一件有趣的事情），那么就现在从学习 Nodejs 开始吧，再出发 🏄

## 系列

🌈Nodejs 基础系列，欢迎你来 🍭 多多交流，技术始于需求源于分享~

- [《Nodejs 基础——fs 模块》](https://juejin.cn/post/7058459564626149389)
- [《Nodejs 基础——path 模块》](https://juejin.cn/post/7059311448891228167/)
- [《Nodejs 基础——http 模块》](https://juejin.cn/post/7062239625699393567)

## 概念

> 流（stream）是为 Node.js 应用程序提供动力的基本概念之一。它是一种以高效的方式处理读/写文件、网络通信、或任何类型的端到端的信息交换。使用流，则可以逐个片段地读取并处理（而无需全部保存在内存中）。Node.js 的 stream 模块 提供了构建所有流 API 的基础。 所有的流都是 EventEmitter 的实例。

## 为什么使用流

🎯 优点：

- 内存效率: 无需加载大量的数据到内存中即可进行处理。
- 时间效率: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始。

通过[Nodejs 基础开端篇](https://juejin.cn/post/7058459564626149389)的学习我们知道 Nodejs 从磁盘中读取文件，可以使用`fs.readFile()`方法实现。而`fs.readFile()`的原理是与 http 服务器建立新连接时通过 http 提供文件，读取的是文件的全部内容放到缓存区，并在完成时调用回调函数。

那么基于以上，我们试想，如果读取一个超大的文件会如何？

```js
const fs = require('fs')
fs.readFile('./stream/ASZX.cx', (err, data) => {
  if (err) {
    return console.log(err)
  }
  console.log(data.length)
})
```

终端执行命令:`node ./stream/index.js`
错误信息如下：大概意思就是告诉我们文件大小超过了 2GB，抛出了异常

```bash
$ node ./stream/index.js
RangeError [ERR_FS_FILE_TOO_LARGE]: File size (8972128477) is greater than 2 GB
    at FSReqCallback.readFileAfterStat [as oncomplete] (fs.js:303:11) {
  code: 'ERR_FS_FILE_TOO_LARGE'
}
```

实践证明，会抛出异常！！！
也就是说，如果读取的文件大小超过 2GB，那么`fs.readFile()`就无法满足需要，这时候`stream `流就诞生了。

## 普通大文件复制

文件很大，则该操作会花费较多的时间。

```js
const fs = require('fs')
const reader = fs.createReadStream('./stream/ASZX.cx')
const writer = fs.createWriteStream('./stream/ASZX-copy.cx')
let len = 0
reader.on('data', (chunk) => {
  // chunk是每次读取到的一小块字节
  console.log(chunk.length)
  len += chunk.length
  writer.write(chunk, () => {
    console.log('写入了一个chunk')
  })
})

reader.on('end', () => {
  console.log('读取完毕，总大小：', len)
})
```

终端执行命令:`node ./stream/index.js`

会发现最终当前目录会多一个复制出的文件。

## 流大文件复制

文件很大，则该操作会花费较多的时间。

```js
const fs = require('fs')
const reader = fs.createReadStream('./stream/ASZX.cx')
const writer = fs.createWriteStream('./stream/ASZX-copy.cx')
reader.pipe(writer)
```

终端执行命令:`node ./stream/index.js`
终端打印如下：

```bash
65536
写入了一个chunk
...
65536
写入了一个chunk
39527
写入了一个chunk
读取完毕，总大小： 2990709351
```

会发现最终当前目录会多一个复制出的文件。

普通大文件复制和流大文件复制相比实现的功能基本一样，但是后者代码更加精简。

## pipe()

获取来源流，并将其通过管道传输到目标流。
pipe() 方法的返回值是目标流，这使得它可链式调用。

```js
src.pipe(dest1).pipe(dest2)
```

相当于

```js
src.pipe(dest1)
dest1.pipe(dest2)
```

## 最后

参考：[Nodejs 官网](http://nodejs.cn/learn/nodejs-streams)

> 如果有错别字或者不对的地方欢迎指出，将在第一时间改正，有更好的实现或想法希望留下你的评论 🔥
