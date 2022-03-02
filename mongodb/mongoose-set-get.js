/*
 * @Author: ylyu
 * @Date: 2022-03-02 13:30:23
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 14:27:27
 * @Description: 自定义操作符get(不建议使用)、set用法
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
  age: {
    type: Number,
    get(params) {
      return `A001-${params}`
    },
  },
  avator: {
    type: String,
    set(params) {
      if (!params) {
        return ''
      }
      // 增加数据的时候对avator字段进行处理，params是avator的值,返回的数据是avator实际保存至数据库的值
      return params.indexOf('http://') !== 0 && params.indexOf('https://') !== 0
        ? `http://www.xxx.com/imgs/${params}`
        : params
    },
  },
  status: {
    type: Number,
    default: 1,
  },
})

// mydb数据库的managers集合
const userModel = mongoose.model('User', UserSchema, 'managers')

// 增加
const user = new userModel({
  name: 'zhangSan  ',
  age: 20,
  avator: 'aaa.png', // 处理为：http://www.xxx.com/imgs/aaa.png
})
console.log(user.age)

// const user = new userModel()
// user.name = 'zss'
// user.age = 90

// user.save((err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('增加成功')
//   // 查询
//   userModel.find({}, (err, res) => {
//     if (err) {
//       return console.log(err)
//     }
//     console.log(res)
//   })
// })
