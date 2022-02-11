/*
 * @Author: ylyu
 * @Date: 2022-01-28 18:01:26
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-11 17:27:03
 * @Description:
 */
var fs = require('fs')

/*异步读取*/

// 读取文本文件
// fs.readFile(__dirname + '/demo.txt', 'utf-8', (err, data) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('异步读取: ' + data)
//   console.log('异步读取: ' + data.toString())
// })

// 读取目录
// fs.readdir('./fs', (err, data) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(data)
// })

// 重命名或移动文件
// fs.rename('./fs/01.png', './fs/123.png', (err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('重命名成功')
// })

// fs.rename('./fs/css/123.png', './fs/123.png', (err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('移动成功')
// })

// 读取二进制文件
// fs.readFile('01.png', function (err, data) {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(data)
//   // Buffer -> String
//   var text = data.toString('utf-8')
//   // console.log(text)
//   // String -> Buffer
//   var buf = Buffer.from(text, 'utf-8')
//   console.log(buf)
// })

/*同步读取*/
// var data = fs.readFileSync('demo.txt')
// console.log('同步读取: ' + data.toString())

// console.log('--程序执行完毕--')

/** 题目：/practice 目录下有 imgs、css、js、index.html，找出/practice
 * 下所有的目录然后放在一个数组中。
 */
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
