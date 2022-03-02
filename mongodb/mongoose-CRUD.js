/*
 * @Author: ylyu
 * @Date: 2022-03-02 11:06:29
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 13:26:34
 * @Description:
 */
const mongoose = require('mongoose')
// 建立连接
// mongoose.connect('mongodb://localhost:27017/mydb')
mongoose.connect('mongodb://admin:admin@localhost:27017/mydb?authSource=admin')

const userSchema = mongoose.Schema({
  name: String,
  age: Number | String,
})

const UserModel = mongoose.model('User', userSchema, 'user')

// 1、查询
UserModel.find({}, (err, docs) => {
  if (err) {
    return console.log(err)
  }
  console.log(docs)
})

// 2、增加
// 通过实例化User Model创建增加的数据
// const userDoc = new UserModel({ name: '王五', age: 30 })
// userDoc.save((err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('增加数据成功')
// })

// 3、修改
// UserModel.updateOne(
//   { _id: '621ee9fb34264138ba69775f' },
//   { age: 50 },
//   (err, res) => {
//     if (err) {
//       return console.log(err)
//     }
//     console.log('数据修改成功')
//   }
// )

// 4、删除
// UserModel.deleteOne({ _id: '621ee9f9bc7c71ddfb7c0176' }, (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('删除成功')
// })
