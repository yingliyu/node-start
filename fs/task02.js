/*
 * @Author: ylyu
 * @Date: 2022-01-29 10:05:51
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-21 10:52:22
 * @Description: 整理json格式数据
 */
'use strict'

const fs = require('fs')

console.log(__dirname)

fs.readFile(__dirname + '/files/help.json', 'utf-8', (err, data) => {
  if (err) {
    return console.log('读取文件失败：', err)
  }
  console.log('读取文件成功！', data)
  const list = data.split('\r\n').join('')
  console.log(list)

  // const result = list.map((item) => item.replace(/=/g, ':')).join('\r\n')
  // const result = data.toString().replaceAll(' ', '\n')
  // const result = data.replace(/\r\n/g, '\n')

  fs.writeFile(__dirname + '/files/help-result.json', list, (err) => {
    if (err) {
      return console.log('写入文件失败：', err)
    }
    console.log('写入文件成功！')
  })
})
