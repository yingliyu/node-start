var fs = require('fs')

/*异步读取*/

// 读取文本文件
fs.readFile('demo.txt', 'utf-8', function (err, data) {
  if (err) {
    return console.log(err)
  }
  console.log('异步读取: ' + data)
})

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
var data = fs.readFileSync('demo.txt')
console.log('同步读取: ' + data.toString())

console.log('--程序执行完毕--')
