/*
 * @Author: ylyu
 * @Date: 2022-03-02 13:40:28
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 16:05:59
 * @Description:
 */
const mongoose = require('./db')

const UserSchema = mongoose.Schema({
  name: { type: String, required: [true, '用户名不能为空'] },
  age: { type: Number, min: 0, max: 120 },
  phone: {
    type: String,
    match: /^\d{11}$/,
  },
  status: {
    type: Number,
    default: 1,
    enum: [0, 1, 2],
  },
  intro: {
    type: String,
    // 自定义验证器，如果通过验证返回true，否则返回false
    validate: function (intro) {
      return intro.length >= 10
    },
  },
})

module.exports = mongoose.model('User', UserSchema, 'user')
