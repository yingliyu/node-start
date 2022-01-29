# Nodejs 全栈之路(node-start)

🚀 欢迎`Star`与分享，后续会不断更新。[gitee 版本阅读更流畅，点击阅读](https://gitee.com/ylyubook/node-start)

## 目录

<b><details><summary>💡 前言</summary></b>

对于前端同学来说想学习全栈开发，Nodejs 无疑是一个很好的选择，学习了 Nodejs 我们就可以不依赖后端同学，自己开发一些东西，是的最近在学习小程序开发，但是想模拟一下登录授权的流程，这得依赖于后端同学，所以只能搁置或者在网上看一些相关文章，不能上手调试是非常之无奈的一件事，所以期望学习 nodejs 可以让我自己也可以玩很多东西~💪

### 开篇

浏览器中 javascript 包括：`JS核心语法`和`WEBAPI`。

![1643355178(1).png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643355188881-b8b5a51a-4262-4717-99bd-6eab5b2cc95e.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=278&id=u29d4c2f4&margin=%5Bobject%20Object%5D&name=1643355178%281%29.png&originHeight=278&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13899&status=done&style=none&taskId=uc8300d6e-6c97-4880-b044-fa63f6bcf54&title=&width=561)

> Javascript 为什么可以在浏览器中被执行？

浏览器中有 Javascript 解析引擎专门用来解析执行 javascript 代码。不同的浏览器使用不同的 Javascript 解析引擎，Chrome 浏览器使用 V8 解析引擎，FireFox 使用 OdinMonkey，Safri 使用 JSCore，IE 使用 Chakra 等等，其中 Chrome 浏览器的 V8 引擎性能最好。
​

> 为什么 Javascript 可以操作 DOM 和 BOM？

每个浏览器都内置了 DOM、BOM 的 API 函数，因此浏览器中的 js 才可以调用它们。

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643357260386-6de0a9e5-f899-42dd-a653-2e0f3d198ef8.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=307&id=udb7abf50&margin=%5Bobject%20Object%5D&name=image.png&originHeight=307&originWidth=558&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16925&status=done&style=none&taskId=ua35f828d-d0b2-40eb-9ae3-fb6549e17dc&title=&width=558)

**浏览器中的 Javascript 运行环境**
运行环境是指代码正常运行所需的必要环境，包括 V8 引擎和内置 API。
以 chrome 浏览器为例：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643357480788-51c57409-6cf9-4cc2-9ce9-bf219f380f2f.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=316&id=uddbda63d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=316&originWidth=556&originalType=binary&ratio=1&rotation=0&showTitle=false&size=69871&status=done&style=none&taskId=u8ff1ceae-8343-45c6-9320-909a45ab263&title=&width=556)

**总结：**

1. V8 引擎负责解析和执行 JS 代码。
1. 内置 API 是由运行环境提供的特殊接口，只能在所运行环境中被调用。

> Javascript 可以做后端开发吗？

是的，可以。常见的后端开发语言有 JAVA、Python、PHP，而我们知道 JS 在前端是运行在浏览器中的，但是如果做后端开发它的运行环境是什么呢? 这时候大名鼎鼎的 Nodejs 就闪亮登场啦。
​

### 了解 node.js

Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
[Node.js](https://nodejs.org/zh-cn/)® 是一个基于 Chrome V8 引擎 的 JavaScript 运行时环境。
​

**Nodejs 中的 Javascript 运行环境**

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643358640971-6be9ff9e-1da3-44e4-bfab-f3aebc2e3b45.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=344&id=u4c4d4fa0&margin=%5Bobject%20Object%5D&name=image.png&originHeight=344&originWidth=563&originalType=binary&ratio=1&rotation=0&showTitle=false&size=61923&status=done&style=none&taskId=u4f04cf8e-4afa-4bf2-b86e-38339a8f8ea&title=&width=563)

注意：

1. 浏览器是 JS 的前端运行环境，
1. Nodejs 是 JS 的后端运行环境，
1. Nodejs 是独立的运行环境，Nodejs 中无法调用 DOM 和 BOM 等浏览器内置 API。

​

Nodejs 作为 js 的运行环境，仅仅提供了基础的功能和 API，然而基于 Nodejs 提供的这些基础功能，很多强大的工具和框架如雨后春笋层出不穷，那么 Nodejs 可以做哪些事情呢？

- 基于[express 框架](http:///www.expressjs.com.cn)快速构建 web 应用
- 基于[Electron 框架](https://electronjs.org)可构建跨平台桌面应用
- 基于[restify 框架](http://restify.com)可快速构架 API 接口项目
- ......

​

对于前端开发者来说有了 js 的功底，学习 nodejs 的成本相对较低。借鉴 js 的学习路径 JS 基础语法 ---> 浏览器内置 API（DOM、BOM）---> 第三方库/框架（JQuery、vue、React 等）。那么 Nodejs 的学习路径大致如下：JS 基础语法 ---> Nodejs 内置 API 模块（fs、path、http 等）---> 第三方 API 模块（express、egg、mysql 等）。
​

### 安装&第一个 Node 程序

建议下载安装稳定版，LTS 为长期维护版，Current 为最新尝鲜版（含最新功能，不推荐企业级项目使用）。
[更多关于 Nodejs 安装和配置...](https://www.runoob.com/nodejs/nodejs-install-setup.html)

```shell
node -v // 查看Nodejs版本号
```

在 Nodejs 环境中执行 js 代码

```shell
// D:lemon/Node/website/hello.js (后面的文件也都以此为目录D:lemon/Node/website)
console.log('Hello Nodejs!')
```

在 app.js 文件所在目录打开终端执行：`node hello.js`

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643362356063-41afa5d0-635c-4770-b719-f071303ba4a7.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=218&id=u925fb5ee&margin=%5Bobject%20Object%5D&name=image.png&originHeight=218&originWidth=395&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6874&status=done&style=none&taskId=ud2fac54a-9440-4cb5-9369-4b267dae8db&title=&width=395)

终端快捷键：

1. `tab`键快速补全路径
2. `esc`键快速清空当前已输入命令
3. 输入`cls`可以情况终端面板

### Nodejs 模块

为了让 Node.js 的文件可以相互调用，Node.js 提供了一个简单的模块系统。
模块是 Node.js 应用程序的基本组成部分，文件和模块是一一对应的。一个.js 文件就称之为一个模块（module）。

使用模块的好处：
最大的好处是大大提高了代码的可维护性。
避免函数名和变量名冲突。
**引入模块：**
**我们有了一个 hello.js**

```shell
// hello.js
function greet(name) {
    console.log('Hello, ' + name + '!');
}

module.exports = greet;
```

**再创建一个 app.js**

```shell
// 引入hello模块:
const greet = require('./hello');

const friend = 'Lemon';
greet(friend); // Hello, Lemon!
```

执行`node app.js`

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643363414388-4c57fd46-f690-4cf0-8f70-c755879174d6.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=91&id=ufb3b674a&margin=%5Bobject%20Object%5D&name=image.png&originHeight=91&originWidth=359&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7494&status=done&style=none&taskId=u0271592d-8e73-4f2b-bc22-5f790d0d1ea&title=&width=359)

在使用`require()`引入模块的时候，请注意模块的相对路径。这种模块加载机制被称为 CommonJS 规范。在这个规范下，每个.js 文件都是一个模块，它们内部各自使用的变量名和函数名都互不冲突。

### fs 文件系统模块

Node.js 内置的 fs 模块就是文件系统模块，负责读写文件。
和所有其它 JavaScript 模块不同的是，fs 模块同时提供了异步和同步的方法。例如读取文件内容的函数有异步的 `fs.readFile()` 和同步的 `fs.readFileSync()`。异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
建议大家使用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。
注意：注释代码也会被读取到。

#### 异步读取文件

```javascript
fs.readFile(filename[, options], callback)
```

参数说明：

- 参数 1，path：必选参数，字符串，表示文件路径
- 参数 2，options：可选参数，字符串，表示已什么编码格式读取文件
- 参数 3，callback：必选参数，回调函数，文件读取完成后，通过回调函数拿到读取的结果。callback，Node.js 标准的回调函数：第一个参数代表错误信息，第二个参数代表结果。

#### ​

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

#### 同步读取文件

```javascript
fs.writeFileSync(filename, data[, options])
```

同步读取的函数和异步函数相比，多了一个 Sync 后缀，并且不接收回调函数，函数直接返回结果。

```javascript
// fs.js
/*异步读取*/
fs.readFile('demo.txt', 'utf-8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log('异步读取: ' + data)
})

/*同步读取*/
var data = fs.readFileSync('demo.txt')
console.log('同步读取: ' + data.toString())
console.log('--程序执行完毕--')
```

以上代码执行结果如下：

![image.png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643419529828-bfd35efa-e213-44b2-b3e0-7555bb1e156d.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=124&id=u7bf77d0f&margin=%5Bobject%20Object%5D&name=image.png&originHeight=124&originWidth=319&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5465&status=done&style=none&taskId=u8c517fab-fd35-46c4-a266-7632ccdb8e0&title=&width=319)

#### 写文件

```javascript
	fs.writeFile(filename, data[, options], callback)
```

如果文件存在，该方法写入的内容会覆盖旧的文件内容。
**参数说明：**
`file` - 必选参数，指定一个文件路径的字符串，表示文件的存放路径（如果是文件名，表示是当前路径）。
`data` - 必选参数，要写入文件的数据，可以是 String(字符串) 或 Buffer(缓冲) 对象。
`options` - 可选参数，表示以什么格式写入文件内容，该参数是一个对象，包含 {encoding, mode, flag}。默认编码为 utf8, 模式为 0666 ， flag 为 'w'
`callback` - 必选参数，写入文件后的回调函数，回调函数只包含错误信息参数(err)，在写入失败时返回。

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

### 最后

参考：[https://www.liaoxuefeng.com/wiki/1022910821149312/1023025235359040](https://www.liaoxuefeng.com/wiki/1022910821149312/1023025235359040)、[https://www.runoob.com/nodejs/nodejs-fs.html](https://www.runoob.com/nodejs/nodejs-fs.html)
​
