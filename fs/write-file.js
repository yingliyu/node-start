/*
 * @Author: ylyu
 * @Date: 2022-01-29 09:35:25
 * @LastEditors: ylyu
 * @LastEditTime: 2022-01-29 09:40:38
 * @Description:
 */
// 导入fs文件系统模块

const fs = require('fs')

fs.writeFile('demo1.txt', '123123', (err) => {
  if (err) {
    return console.log(err)
  }
  console.log('写入成功！')
})
