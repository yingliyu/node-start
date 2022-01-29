/*
 * @Author: ylyu
 * @Date: 2022-01-29 10:05:51
 * @LastEditors: ylyu
 * @LastEditTime: 2022-01-29 10:44:20
 * @Description: 整理成绩
 */
'use strict'

const fs = require('fs')

console.log(__dirname)

fs.readFile(__dirname + '/score.txt', 'utf-8', (err, data) => {
  if (err) {
    return console.log('读取文件失败：', err)
  }
  console.log('读取文件成功！', data)
  const list = data.split(' ')
  const result = list.map((item) => item.replace(/=/g, ':')).join('\r\n')
  // const result = data.toString().replaceAll(' ', '\n')
  fs.writeFile(__dirname + '/score-result.txt', result, (err) => {
    if (err) {
      return console.log('写入文件失败：', err)
    }
    console.log('写入文件成功！')
  })
})
