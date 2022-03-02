/*
 * @Author: ylyu
 * @Date: 2022-03-02 13:30:23
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 14:26:35
 * @Description:
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
  name: { type: String, trim: true },
  age: Number,
  avator: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
})

// mydb数据库的managers集合
const userModel = mongoose.model('User', UserSchema, 'managers')

// 查询
userModel.find({}, (err, res) => {
  if (err) {
    return console.log(err)
  }
  console.log(res)
})

// 增加
const user = new userModel({
  name: '   zhangSan  ',
  age: 20,
  avator: 'aaa.png', // 处理为：http://www.xxx.com/imgs/aaa.png
})

// const user = new userModel()
// user.name = 'zss'
// user.age = 90

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
