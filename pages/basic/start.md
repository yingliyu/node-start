# Nodejs 基础——fs 模块

🚀 欢迎`Star`与分享，后续会不断更新。[gitee 版本阅读更流畅，点击阅读](https://gitee.com/ylyubook/node-start)

## 前言

以前总是对学习全栈开发嗤之以鼻，觉得做前端就学好前端就 ok，毕竟术业有专攻，况且前端的技术内容繁杂且日新月异，但今时不同往日现在觉得以前的自己还是太年轻，以前的想法被完全颠覆了。近几年大前端、低代码、微前端、Serverless 等众多技术思想如雨后春笋般涌出，前端发展大好，想要更好的做好前端，学习全栈开发只会锦上添花。最重要的是不再依赖于后端小伙伴，可以自由地调试实践，把自己的想法变成现实或者一个完整的产品（这会是一件有趣的事情），那么就现在从学习 Nodejs 开始吧，再出发 🏄

### 开篇

浏览器中 javascript 包括：`JS核心语法`和`WEBAPI`。

![1643355178(1).png](https://cdn.nlark.com/yuque/0/2022/png/638436/1643355188881-b8b5a51a-4262-4717-99bd-6eab5b2cc95e.png#clientId=u3f2999ed-4c80-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=278&id=u29d4c2f4&margin=%5Bobject%20Object%5D&name=1643355178%281%29.png&originHeight=278&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13899&status=done&style=none&taskId=uc8300d6e-6c97-4880-b044-fa63f6bcf54&title=&width=561)

> Javascript 为什么可以在浏览器中被执行？

浏览器中有 Javascript 解析引擎专门用来解析执行 javascript 代码。不同的浏览器使用不同的 Javascript 解析引擎，Chrome 浏览器使用 V8 解析引擎，FireFox 使用 OdinMonkey，Safri 使用 JSCore，IE 使用 Chakra 等等，其中 Chrome 浏览器的 V8 引擎性能最好。

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

> V8 是为 Google Chrome 提供支持的 JavaScript 引擎的名称。 当使用 Chrome 进行浏览时，它负责处理并执行 JavaScript。

Nodejs 最擅长的是处理高并发，在 JAVA、PHP 等服务的语言中会为每个客户端连接创建一个新的线程，而每个线程需要耗费大约 2MB 内存，那么理论上一个 8GB 的服务器可同时连接的最大用户数为 4000 个左右，要让 web 应用程序服务更多的用户需要增加服务器的数量，那么 web 应用程序的硬件成本也会随之增加。Nodejs 不是为每个客户端连接创建一个新的线程，而仅仅使用一个线程，当有用户连接时就触发一个内部事件通过非阻塞 I/O、事件驱动机制让 Nodejs 程序宏观上并行，使用 Nodejs，一个 8GB 内存的服务器，可以同时处理超过 4 万用户的连接。

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

## 最后

🌈Nodejs 基础系列，欢迎你来 🍭 多多交流，技术始于需求源于分享~

- [《Nodejs 基础学习开端篇》](https://juejin.cn/post/7058459564626149389)
- [《Nodejs 基础——fs 模块》](https://juejin.cn/post/7063382395344388110/)
- [《Nodejs 基础——path 模块》](https://juejin.cn/post/7059311448891228167/)
- [《Nodejs 基础——http 模块》](https://juejin.cn/post/7062239625699393567)
- [《Nodejs 基础——stream 模块》](https://juejin.cn/post/7062541118121967647)
- [《Nodejs 基础——模块化》](https://juejin.cn/post/7063000384758874126)

参考：
[Nodejs 官方](http://nodejs.cn/learn/expose-functionality-from-a-nodejs-file-using-exports)、[Nodejs 模块系统教程](https://www.runoob.com/nodejs/nodejs-module-system.html)

> 如果有错别字或者不对的地方欢迎指出，将在第一时间改正，有更好的实现或想法希望留下你的评论 🔥
