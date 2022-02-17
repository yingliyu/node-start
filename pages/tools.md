# Nodejs 相关工具应用

## 前言

本文主要介绍内容：

- 命令行及常用指令
- nodejs REPL 用法
- nodejs 监控工具 `nodemon`

## 命令行窗口

在 windows 环境下命令行程序为 cmd.exe，是一个 32 位的命令行程序，微软 Window 系统基于 windows 上的命令程序，类似于早期的 DOS 操作系统。

命令行窗口、终端、shell，打开命令行窗口快捷键：`Win + R` ,输入框输入 cmd 点击确定。

### 常用的指令

- `dir` - 列出当前目录下的所有文件
- `cd 目录名` - 进入到指定的目录
- `md 目录名` - 创建一个文件夹
- `rd 目录名` - 删除一个文件夹

### 目录

. 表示当前目录
.. 表示上一级目录

### 环境变量（window 系统中变量）

`path`

当我们在命令行窗口打开一个文件或调用一个程序，系统会首先在当前目录下寻找文件程序，如果找到了则直接打开，否则依次到环境变量 path 路径中寻找，直到找到位置，如果没找到则报错。

所以，可以将一些经常访问的程序和文件的路径添加到 path 中，然后就可以在任意位置访问这些文件和程序了。

## Nodejs REPL

Node.js REPL(Read Eval Print Loop:交互式解释器) 表示一个电脑的环境，类似 Window 系统的终端或 Unix/Linux shell，我们可以在终端中输入命令，并接收系统的响应。

Node 自带了交互式解释器，可以执行以下任务：

-读取 - 读取用户输入，解析输入的 Javascript 数据结构并存储在内存中。

-执行 - 执行输入的数据结构

-打印 - 输出结果

-循环 - 循环操作以上步骤直到用户两次按下 ctrl-c 按钮退出。

Node 的交互式解释器可以很好的调试 Javascript 代码。

### 使用方法

在终端中输入`node`，按 enter 键，则会出现

```js
node
Welcome to Node.js v14.17.0.
Type ".help" for more information.
>
```

该命令保持空闲状态，等待输入内容（js 代码）。

```js
>console.log('Hello REPL')
Hello REPL
undefined //输出的是console.log()的返回值
>2+3
5
> var a = 1
undefined
> console.log(a)
1
undefined //输出的是console.log()的返回值
```

### REPL 点命令

- `.help` - 显示点命令的帮助。
- `.editor` - 启用编辑器模式，可以轻松地编写多行 JavaScript 代码。当处于此模式时，按下 ctrl-D 可以运行编写的代码。
- `.break` - 当输入多行的表达式时，输入 .break 命令可以中止进一步的输入。相当于按下 ctrl-C。
- `.clear` - 将 REPL 上下文重置为空对象，并清除当前正在输入的任何多行的表达式。
- `.load` - 加载 JavaScript 文件（相对于当前工作目录）。
- `.save` - 将在 REPL 会话中输入的所有内容保存到文件（需指定文件名）。
- `.exit` - 退出 REPL（相当于按下两次 ctrl-C）。
- `.save filename` - 保存当前的 Node REPL 会话到指定文件

- `.load filename` - 载入当前 Node REPL 会话的文件内容

### REPL 其他命令

- `tab 键` - 列出当前命令

- `global.` tab 键 - 列出可访问的全局变量

- `Number.` tab 键 - 列出该类上可访问的属性和方法(输入 `JavaScript 对象名称 . `按下 tab)

- 向上/向下 键 - 查看输入的历史命令

- `ctrl + c` - 退出当前终端。

- `ctrl + c` 按下两次 - 退出 Node REPL。

- `ctrl + d` - 退出 Node REPL.

### REPL 特殊变量 `_`

在某些代码之后输入 `_`，则会打印最后一次操作的结果。

```js
>var a = 10
undefined
> var b = 20
undefined
> a + b
30
> var c = _
undefined
> console.log(c)
30
undefined
```

## nodemon

> Nodemon 是一款非常实用的工具，用来监控你 node.js 源代码的任何变化和自动重启你的服务器。 Nodemon 是一款完美的开发工具，可以使用 npm 安装。

```js
npm install -g nodemon  // 推荐全局安装 or using yarn: yarn global add nodemon
// or
npm install --save-dev nodemon // 非全局安装 or using yarn: yarn add nodemon -D
```

安装完成就可以通过`nodemon [your node app]`启动服务。

然后在每次更改 nodejs 代码之后会自动被监控到，不需要手动重启服务。更多配置参考-[nodemon](https://www.npmjs.com/package/nodemon)

## 最后

🌈Nodejs 基础系列，欢迎你来 🍭 多多交流，技术始于需求源于分享~

- [《Nodejs 基础学习开端篇》](https://juejin.cn/post/7058459564626149389)
- [《Nodejs 基础——fs 模块》](https://juejin.cn/post/7063382395344388110/)
- [《Nodejs 基础——path 模块》](https://juejin.cn/post/7059311448891228167/)
- [《Nodejs 基础——http 模块》](https://juejin.cn/post/7062239625699393567)
- [《Nodejs 基础——stream 模块》](https://juejin.cn/post/7062541118121967647)
- [《Nodejs 基础——模块化》](https://juejin.cn/post/7063000384758874126)

参考：

-[Nodejs REPL](http://nodejs.cn/learn/how-to-use-the-nodejs-repl)

-[Nodejs 教程](https://www.runoob.com/nodejs/nodejs-repl.html)

> 如果有错别字或者不对的地方欢迎指出，将在第一时间改正，有更好的实现或想法希望留下你的评论 🔥
