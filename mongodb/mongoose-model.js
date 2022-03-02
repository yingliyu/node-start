/*
 * @Author: ylyu
 * @Date: 2022-03-02 13:42:31
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 16:05:05
 * @Description: mongoose模块化
 */
// console.time('user') // 测试性能
const UserModel = require('./model/user')
// console.timeEnd('user') // 单例模式，user: 466.247ms

// console.time('news')
const NewsModel = require('./model/news')
// console.timeEnd('news') // news: 9.438ms

// 查询用户
// UserModel.find({}, (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(res)
// })

// 查询新闻
// NewsModel.find({}, (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(res)
// })

// 使用静态方法
// NewsModel.findByUuid('ASLKJK-879879898987', (err, res) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(res)
// })

// const newsModel = new NewsModel({
//   // uuid: 'KJDSD-945849',
//   title: '新闻007',
//   content: '新闻内容内容...',
// })

// newsModel.save((err) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log('增加新闻成功')
// })
// 使用实例方法
// newsModel.print()

const userModel = new UserModel({
  name: '阿拉蕾',
  age: 120,
  status: '2',
  phone: '11111122222',
  intro: '我就是我不一样的烟火',
})
userModel.save((err) => {
  if (err) {
    return console.log(err)
  }
  console.log('增加用户成功')
})
