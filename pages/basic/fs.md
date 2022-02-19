# Nodejs 基础——fs 模块

🚀 欢迎`Star`与分享，后续会不断更新。[gitee 版本阅读更流畅，点击阅读](https://gitee.com/ylyubook/node-start)

## 前言

Node.js 内置的 fs 模块就是文件系统模块，负责读写文件。
和所有其它 JavaScript 模块不同的是，fs 模块同时提供了异步和同步的方法。例如读取文件内容的函数有异步的 `fs.readFile()` 和同步的 `fs.readFileSync()`。异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。

注意：注释代码也会被读取到。

## API 实践

### fs.readFile()

异步读取文件

```javascript
fs.readFile(filename[, options], callback)
```

参数说明：

- `path`：必选参数，字符串，表示文件路径
- `options`：可选参数，字符串，表示已什么编码格式读取文件
- `callback`：必选参数，回调函数，文件读取完成后，通过回调函数拿到读取的结果。callback，Node.js 标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。

**以 utf-8 的编码格式读取指定文本文件的内容：**

```javascript
// fs.js
const fs = require('fs')
// demo.txt在当前目录且文件编码是utf-8

fs.readFile('demo.txt', 'utf-8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(data)
})
```

同级目录创建 demo.txt 内容如图：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643364527508-61ad1957-9f25-4843-8785-d2052f857493.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=188&id=ufd578a91&margin=%5Bobject%20Object%5D&name=image.png&originHeight=188&originWidth=494&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13361&status=done&style=none&taskId=u596b609d-15ae-415a-a6f8-2e5c5cb0b17&title=&width=494)

执行`node fs.js`打印结果如下：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643364437627-0ae52c32-be5a-4dce-9813-964898b9ff78.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=69&id=u50c7c3d8&margin=%5Bobject%20Object%5D&name=image.png&originHeight=69&originWidth=329&originalType=binary&ratio=1&rotation=0&showTitle=false&size=2495&status=done&style=none&taskId=u6fd996fb-6ee1-470a-a299-fefe6dfd172&title=&width=329)
​

**读取二进制文件流：**

```javascript
// 读取二进制文件
fs.readFile('01.png', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log(data)
  // Buffer -> String
  var text = data.toString('utf-8')
  // console.log(text)
  // String -> Buffer
  var buf = Buffer.from(text, 'utf-8')
  console.log(buf)
})
```

执行：`node fs.js`终端打印结果如下：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643418884715-4c0a5711-9db1-46dc-8afb-80874d202d57.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=104&id=u558e55f6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=104&originWidth=763&originalType=binary&ratio=1&rotation=0&showTitle=false&size=12387&status=done&style=none&taskId=u909fbc9c-d1f6-49bd-8a56-1bc8f8a3b13&title=&width=763)

### fs.readFileSync()

同步读取文件

```javascript
fs.readFileSync(path[, options])
```

同步读取的函数和异步函数相比，多了一个 Sync 后缀，并且不接收回调函数，函数直接返回结果。

```javascript
// fs.js
/*同步读取*/
var data = fs.readFileSync('demo.txt')
console.log('同步读取: ' + data.toString())
console.log('--程序执行完毕--')
```

以上代码执行结果如下：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643419529828-bfd35efa-e213-44b2-b3e0-7555bb1e156d.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=124&id=u7bf77d0f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=124&originWidth=319&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5465&status=done&style=none&taskId=u8c517fab-fd35-46c4-a266-7632ccdb8e0&title=&width=319)

### fs.writeFile()

创建写入文件。

```javascript
	fs.writeFile(file, data[, options], callback)
```

**参数说明：**

- `file` - 必选参数，指定一个文件路径的字符串，表示文件的存放路径（如果是文件名，表示是当前路径）。
- `data` - 必选参数，要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
- `options` - 可选参数，表示以什么格式写入文件内容，该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, mode 默认模式为 0o666 ， flag 默认为 'w'
- `callback` - 必选参数，写入文件后的回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

> 当 file 是文件名时，将数据异步地写入文件，如果文件已存在则替换该文件。 data 可以是字符串或缓冲区。

当 file 是文件描述符时，其行为类似于直接调用 fs.write()（推荐）。

```javascript
// write-file.js
const fs = require('fs')

fs.writeFile('demo1.txt', '123123', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('写入成功！')
})
```

若当前目录不存在要写入的文件，将创建文件并写入内容；若写入一个不存在的盘，将写入失败。
以上代码执行结果：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643421378425-5a0815a5-87f1-493e-b484-afea25cd3ab9.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=165&id=ud44971c6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=165&originWidth=573&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15262&status=done&style=none&taskId=uab3aef61-955f-4a4e-b362-c3da1e446ac&title=&width=573)

注意：在使用 fs 模块操作文件时，如果提供的操作路径是以 ./ 或 ../ 开头的路径，注意路径的动态拼接。代码运行时会以执行 node 命令时所处的目录动态拼接出被操作文件的完整路径，或者可以直接使用绝对路径，这时可以使用`__dirname`（表示当前文件所处目录）

```javascript
fs.readFile(__dirname + '/demo.txt', 'utf-8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log('异步读取: ' + data)
})
```

更多关于路径的内容，可移步[《path 模块》](./path.md)查看。

### fs.appendFile()

异步地将数据追加到文件，如果该文件尚不存在，则创建该文件。 data 可以是字符串或 <Buffer>。

```js
fs.appendFile(path, data[, options], callback)
```

参数说明：

- `path`: <string | Buffer | URL | number> 文件名或文件描述符
- `data`: <string | Buffer>
- `options`: <Object | string>
  - `encoding`: <string | null> 默认值: 'utf8'
  - `mode`: <integer>默认值: 0o666
  - `flag`: <string>请参阅对文件系统 flags 的支持。 默认值: 'a'。
- `callback`: <Function>
  - `err`: <Error>

```js
fs.appendFile(__dirname + '/demo1.txt', '哈哈哈\n我想要一个冰墩墩', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('appendFile成功')
})
```

### fs.stat()

```js
fs.stat(path[, options], callback)
```

判断是文件还是目录

```js
const fs = require('fs')
fs.stat(__dirname + '/demo.txt', (err, data) => {
  if (err) {
    return console.log(err)
  }
  console.log(`是文件，${data.isFile()}`)
  console.log(`是目录，${data.isDirectory()}`)
})
```

执行`node ./fs/demo.js`,终端输出：

```bash
是文件，true
是目录，false
```

### fs.mkdir()

异步地创建目录。如果同级目录下存在相同的目录名，则报错并提示`file already exists`，如果不存在则创建。

```js
fs.mkdir(path[, options], callback)
```

参数说明：

- `path`：将创建的目录路径

- `options`
  - `mode`：目录权限（读写权限），默认 777

`callback`：回调，传递异常参数 err

```JS
const fs = require('fs')
fs.mkdir(__dirname + '/css', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('创建成功')
})
```

### fs.rmdir()

```js
fs.rmdir(path[, options], callback)
```

删除空目录，如果目录中存在文件，则提示异常`Error: ENOTEMPTY: directory not empty`

```js
const fs = require('fs')
fs.rmdir(__dirname + '/aaa', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('删除目录成功')
})
```

### fs.readdir()

```js
fs.readdir(path[, options], callback)
```

读取目录

```js
const fs = require('fs')
fs.readdir('./fs', (err, data) => {
  if (err) {
    return console.log(err)
  }
  console.log(data)
})
```

执行后，终端输出：

```bash
[
  '01.png',
  'css',
  'demo.js',
  'demo.txt',
  'demo1.txt',
  'fs.js',
  'score-result.txt',
  'score.txt',
  'task01.js',
  'write-file.js'
]
```

### fs.rename()

```js
fs.rename(oldPath, newPath, callback)
```

重命名或移动文件。

> 将 oldPath 处的文件异步重命名为作为 newPath 提供的路径名。 如果 newPath 已经存在，则它将被覆盖。 如果在 newPath 中有目录，则会引发错误。 除了可能的异常之外，没有为完成回调提供任何参数。

```js
const fs = require('fs')
fs.rename('./fs/01.png', './fs/123.png', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('重命名成功')
})

fs.rename('./fs/123.png', './fs/css/123.png', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('移动成功')
})
```

执行之后，./fs/01.png 被重命名为 123.png，然后被移动到./fs/css/123.png。

### fs.unlink()

删除文件

```js
fs.unlink(path, callback)
```

> 异步地删除文件或符号链接。 除了可能的异常之外，没有为完成回调提供任何参数。

```js
const fs = require('fs')
fs.unlink(__dirname + '/css/demo.txt', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('文件删除成功')
})
```

## 综合实践

1. 判断服务器上是否有 download 目录，如果没有创建这个目录，如果有不操作。

```js
const fs = require('fs')
const path = __dirname + '/download'
// 创建目录的方法
const mkdir = (path) => {
  fs.mkdir(path, (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('创建download目录成功')
  })
}

fs.stat(path, (err, data) => {
  if (err) {
    mkdir(path)
    return
  }
  if (data.isDirectory()) {
    console.log('download目录已存在')
  } else {
    mkdir(path)
  }
})
```

此时，基本满足需求，但是如果目录下已存在一个名为 download 的文件，则终端提示异常：`Error: EEXIST: file already exists` ，所以判断 download 目录如果不存在时，我们在创建之前要先删除同名的 download 文件。

```js
fs.stat(path, (err, data) => {
  if (err) {
    mkdir(path)
    return
  }
  if (data.isDirectory()) {
    console.log('download目录已存在')
  } else {
    fs.unlink(path, (err) => {
      if (!err) {
        mkdir(path)
      } else {
        return console.log('创建失败，请检查数据')
      }
    })
  }
})
```

当然这还是一个很基础的版本，我们还可以使用[第三方模块 mkdirp ](https://www.npmjs.com/package/mkdirp)来实现。

2. /fs/practice 目录下有 imgs、css、js、index.html，找出/fs/practice 下所有的目录然后放在一个数组中。

实现思路：使用 fs.readdir() 读目录，拿到一个包含目录中的文件和目录的数组。然后，遍历这个数组并用 fs.stat()判断如果是目录放到新数组中，最后返回新数组。

> 注意： 用到的 fs 里面的方法是异步的

```js
// 用来判断是否是目录，是则返回true，否则返回false
async function isDir(name) {
  const path = __dirname + '/practice/' + name
  return new Promise((resolve, reject) => {
    fs.stat(path, (err, data) => {
      if (err) {
        console.log(err)
        reject(err)
        return
      }

      if (data.isDirectory()) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  })
}

function getDirArr() {
  const path = __dirname + '/practice'
  let dirArr = []
  fs.readdir(path, async (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    for (let i = 0; i < data.length; i++) {
      if (await isDir(data[i])) {
        dirArr.push(data[i])
      }
    }
    console.log('最终的得到的数组：', dirArr)
  })
}
getDirArr()
```

# 回顾

回顾一下学到的 API 加深印象

- `fs.readFile()` 异步读文件
- `fs.readFileSync()` 同步读文件
- `fs.readdir()` 读目录
- `fs.writeFile()` 创建写入文件
- `fs.appendFile()` 追加文件
- `fs.mkdir()` 创建目录
- `fs.stat()` 检测是文件还是目录
- `fs.rename()` 重命名或移动文件
- `fs.unlink()` 删除文件
- `fs.rmdir()` 删除目录

更改 API 参考：[Nodejs 官网](http://nodejs.cn/api/fs.html#fsreadfilesyncpath-options)

# 最后

🌈Nodejs 基础系列，欢迎你来 🍭 多多交流，技术始于需求源于分享~

- [《Nodejs 基础学习开端篇》](https://juejin.cn/post/7058459564626149389)
- [《Nodejs 基础——path 模块》](https://juejin.cn/post/7059311448891228167/)
- [《Nodejs 基础——http 模块》](https://juejin.cn/post/7062239625699393567)
- [《Nodejs 基础——stream 模块》](https://juejin.cn/post/7062541118121967647)
- [《Nodejs 基础——模块化》](https://juejin.cn/post/7063000384758874126)

> 如果有错别字或者不对的地方欢迎指出，将在第一时间改正，如果有更好的实现或想法希望留下你的评论 🔥
