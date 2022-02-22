/*
 * @Author: ylyu
 * @Date: 2022-01-29 10:05:51
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-21 16:18:56
 * @Description: 整理json格式数据
 */
'use strict'
const xlsx = require('node-xlsx')
const fs = require('fs')

// 读取xlsx
const sheets = xlsx.parse(`${__dirname}/files/help-desc.xlsx`)
// console.log(sheets[0])

// 获取xlsx第一个标签栏的数据
const sheetData = sheets[0].data
console.log(sheetData)
let result = { version: '1.0.0', content: [] }

// const res = sheetData.filter((item, index) => {
//   if (index !== 0) {
//     return {
//       id: item[0],
//       title: item[1],
//       content: item[2],
//     }
//   }
//   return null
// })
// console.log(res)
// 定义数据列表
let list = []

// 循环拼装数据
sheetData.forEach((item, index) => {
  if (index !== 0) {
    if (item[1]) {
      if (item[3]) {
        list.push({
          id: item[2],
          title: item[1],
          content: item[3],
        })
      } else {
        list.push({
          id: item[2],
          title: item[1],
          content: '',
          hide: true, // content为空时，默认隐藏
        })
      }
    } else {
      if (item[3]) {
        list.push({
          id: item[2],
          title: item[0],
          content: item[3],
        })
      } else {
        list.push({
          id: item[2],
          title: item[0],
          content: '',
          hide: true, // content为空时，默认隐藏
        })
      }
    }
  }
})
console.log(list)

fs.writeFileSync(
  `${__dirname}/files/result.json`,
  JSON.stringify(list),
  (err) => {
    if (err) {
      return console.log('写入文件失败：', err)
    }
    console.log('写入文件成功！')
  }
)
