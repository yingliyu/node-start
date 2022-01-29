/*
 * @Author: ylyu
 * @Date: 2022-01-29 15:31:43
 * @LastEditors: ylyu
 * @LastEditTime: 2022-01-29 16:04:19
 * @Description:
 */

const path = require('path')

const pathStr1 = path.join('/a', '/b/c/d', '../e')

// console.log(pathStr1) //\a\b\c\e

const pathStr2 = path.join(__dirname, './demo.js')
// console.log('当前文件所处目录：', pathStr2) // D:\lemon\Node\node-start\path\demo.js

// 读取文件

const fs = require('fs')

fs.readFile(path.join(__dirname, '../fs/demo.txt'), 'utf-8', (err, data) => {
  if (err) {
    return console.log('读取文件失败：', err)
  }
  // console.log('读取文件成功：', data)
})

const filePath = '/a/b/c/index.html'

const fullFileName = path.basename(filePath)
// console.log(fullFileName) // 输出：index.html
const fileNameWithoutExt = path.basename(filePath, '.html')
// console.log(fileNameWithoutExt) // 输出：index

const fileExtName = path.extname(filePath)
// console.log(fileExtName)
console.log(path.dirname(filePath))
