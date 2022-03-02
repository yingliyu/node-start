/*
 * @Author: ylyu
 * @Date: 2022-03-02 13:30:23
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 14:42:12
 * @Description: mongoose索引与内置CRUD方法
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

const UserSchema = mongoose.Schema({
  name: { type: String, index: true },
  age: Number,
})

// mydb数据库的managers集合
const userModel = mongoose.model('User', UserSchema, 'managers')

// 增加
const user = new userModel({
  name: '赵六',
  age: 36,
})

user.save((err) => {
  if (err) {
    return console.log(err)
  }
  console.log('增加成功')
  // 查询
  userModel.find({}, (err, res) => {
    if (err) {
      return console.log(err)
    }
    console.log(res)
  })
})
