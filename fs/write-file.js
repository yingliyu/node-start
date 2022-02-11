/*
 * @Author: ylyu
 * @Date: 2022-01-29 09:35:25
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-11 13:57:02
 * @Description:
 */
// 导入fs文件系统模块

const fs = require('fs')

fs.writeFile(__dirname + '/css/demo.txt', '你说的啥我听不见~', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('写入成功！')
})

fs.appendFile(
  __dirname + '/css/demo.txt',
  '哈哈哈\n我想要一个冰墩墩',
  (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('appendFile成功')
  }
)
