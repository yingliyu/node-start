/*
 * @Author: ylyu
 * @Date: 2022-02-18 14:02:11
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-18 14:08:32
 * @Description: 并发
 */
const async = require('async')

let currencyCountMax = 0

const fetchUrl = (url, callback) => {
  let delay = parseInt((Math.random() * 10000000) % 2000, 10)
  currencyCountMax++
  console.log(
    '现在的并发数是',
    currencyCountMax,
    '，正在抓取的是',
    url,
    '，耗时' + delay + '毫秒'
  )
  setTimeout(function () {
    currencyCountMax--
    callback(null, url + ' html content')
  }, delay)
}

let urls = []
for (let i = 0; i < 30; i++) {
  urls.push('http://www.datasource_' + i + '.conxxx')
}

async.mapLimit(
  urls,
  5,
  (url, callback) => {
    fetchUrl(url, callback)
  },
  (err, res) => {
    console.log('final:', res)
  }
)
