/*
 * @Author: ylyu
 * @Date: 2022-03-02 13:40:28
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 15:40:38
 * @Description:
 */
const mongoose = require('./db')

const NewsSchema = mongoose.Schema({
  uuid: { type: String, required: [true, 'uuid不能为空'] },
  title: String,
  content: String,
  status: {
    type: Number,
    default: 1,
  },
})

//1、静态方法（注意这里不能用箭头函数，this指向丢失）
// NewsSchema.statics.findByUuid = function (uuid, callback) {
//   // console.log(this)
//   // 通过find方法获取uuid的数据
//   this.find({ uuid: uuid }, (err, docs) => {
//     callback(err, docs)
//   })
// }

// 上面代码等价于
NewsSchema.static('findByUuid', function (uuid, cb) {
  this.find({ uuid: uuid }, (err, docs) => {
    cb(err, docs)
  })
})
// 2、实例方法（基本不用）
NewsSchema.methods.print = function () {
  console.log(this)
  console.log('这是一个实例方法')
}

module.exports = mongoose.model('News', NewsSchema, 'news')
