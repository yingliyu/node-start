/*
 * @Author: ylyu
 * @Date: 2022-02-11 11:12:39
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-11 17:53:37
 * @Description:
 */
// 1、fs.stat()
const fs = require('fs')

// fs.stat(__dirname + '/demo.txt', (err, data) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(`是文件，${data.isFile()}`)
//   console.log(`是目录，${data.isDirectory()}`)
// })

// 2、fs.mkdir() 创建目录

// fs.mkdir(__dirname + '/aaa', (err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('创建成功')
// })

// 3、fs.rmdir删除目录

// fs.rmdir(__dirname + '/css', (err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('删除目录成功')
// })

// 4、fs.unlink()删除文件

// fs.unlink(__dirname + '/css/demo.txt', (err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('文件删除成功')
// })

// 练习1
// const path = __dirname + '/download'
// const mkdir = (path) => {
//   fs.mkdir(path, (err) => {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('创建download目录成功')
//   })
// }

// fs.stat(path, (err, data) => {
//   if (err) {
//     mkdir(path)
//     return
//   }
//   if (data.isDirectory()) {
//     console.log('download目录已存在')
//   } else {
//     fs.unlink(path, (err) => {
//       if (!err) {
//         mkdir(path)
//       } else {
//         return console.log('创建失败，请检查数据')
//       }
//     })
//   }
// })

/** 题目：/practice 目录下有 imgs、css、js、index.html，找出/practice
 * 下所有的目录然后放在一个数组中。
 * 实现思路：使用 fs.readdir() 读目录，拿到一个包含目录中的文件和目录的数组。
 * 然后，遍历这个数组并用 fs.stat()判断如果是目录放到新数组中，最后返回新数组。
 */
// 注意：fs里面的方法是异步

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

function main() {
  const path = __dirname + '/practice'
  fs.readdir(path, async (err, data) => {
    if (err) {
      console.log(err)
      return
    }
    console.log('所有的文件/目录:', data)

    let result = data.filter(async (item) => {
      console.log(item)
      let temp = await isDir(item)
      console.log('temp ===', temp)
      return temp ? 1 : 0
    })

    // let result = data.filter((item) => !item.includes('.'))

    console.log('最终的得到的数组：', result)
  })
}

main()
