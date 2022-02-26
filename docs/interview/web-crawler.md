<!-- 爬虫 -->

const http = require('http')

http.createServer((req,res)=>{
let data
req.get('http://www.meizu.com',(res)=>{
res.on('data',chunk=>{
data+=chunk
})
})
})
