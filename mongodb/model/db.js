/*
 * @Author: ylyu
 * @Date: 2022-03-02 13:39:33
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 13:39:33
 * @Description: Mongoose连接数据库
 */
const mongoose = require('mongoose')

mongoose.connect(
  'mongodb://admin:admin@localhost:27017/mydb?authSource=admin',
  (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('数据库连接成功...')
  }
)

module.exports = mongoose
