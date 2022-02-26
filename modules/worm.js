/*
 * @Author: ylyu
 * @Date: 2022-02-17 22:17:04
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-17 22:30:12
 * @Description:
 */
const http = require('http')
const https = require('https')
const cheerio = require('cheerio')

const filterData = (data) => {
  console.log(data)
  const $ = cheerio.load(data)
  $('.section-item-box p').each((index, item) => {
    console.log($(item).text())
  })
}

http
  .createServer((req, res) => {
    let data
    https.get('https://www.meizu.com', (res) => {
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        filterData(data)
      })
    })
  })
  .listen(8080)
console.log('Server running at http://localhost:8080')
