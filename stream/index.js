/*
 * @Author: ylyu
 * @Date: 2022-02-08 16:47:45
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-08 18:02:24
 * @Description: 大文件的复制
 */
const fs = require('fs')
// fs.readFile('./stream/ASZX.cx', (err, data) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(data.length)
// })

const reader = fs.createReadStream('./stream/ASZX.cx')
const writer = fs.createWriteStream('./stream/ASZX-copy.cx')
// let len = 0
// reader.on('data', (chunk) => {
//   // chunk是每次读取到的一小块字节
//   console.log(chunk.length)
//   len += chunk.length
//   writer.write(chunk, () => {
//     console.log('写入了一个chunk')
//   })
// })

// reader.on('end', () => {
//   console.log('读取完毕，总大小：', len)
// })

reader.pipe(writer)

// const Stream = require('stream')

// const readableStream = new Stream.Readable({
//   read() {},
// })
// const writableStream = new Stream.Writable()

// writableStream._write = (chunk, encoding, next) => {
//   console.log(chunk.toString())
//   next()
// }

// readableStream.pipe(writableStream)

// readableStream.push('hi!')
// readableStream.push('ho!')

// writableStream.end()
