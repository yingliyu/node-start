/*
 * @Author: ylyu
 * @Date: 2022-03-02 16:07:15
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-03 10:02:07
 * @Description: mongoose populate
 */
const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://admin:admin@localhost:27017/library_db?authSource=admin'
)
const { Schema, model } = mongoose

// 文章 article collection
const ArticleSchema = Schema({
  // id: { type: Schema.Types.ObjectId },
  // cid: { type: String, ref: 'ArticleCate' },
  cid: { type: Schema.Types.ObjectId, ref: 'ArticleCate' }, //cid和文章分离建立关系。model
  author_id: { type: String }, //作者id
  title: { type: String, unique: true },
  author_name: String,
  summary: String,
  content: String,
  publish_time: Date,
})

// 文章分类 articlecate collection
const ArticleCateSchema = Schema({
  // id: { type: String },
  title: { type: String, unique: true },
  description: String,
  create_time: Date,
})

// 用户 users collection
const UsersSchema = Schema({
  // id: { type: Schema.Types.ObjectId },
  // id: { type: String },
  name: String,
  username: { type: String, unique: true },
  password: String,
  age: Number,
  tel: Number,
  reg_time: Date,
  sex: {
    type: String,
    enum: ['男', '女'],
  },
})

const ArticleModel = model('Article', ArticleSchema, 'article')
const ArticleCateModel = mongoose.model(
  'ArticleCate',
  ArticleCateSchema,
  'articlecate'
)
const UsersModel = model('User', UsersSchema, 'users')

// ArticleModel.find({}, (err, docs) => {
//   if (err) {
//     return console.log(err)
//   }
//   console.log(docs)
// })

ArticleModel.find({})
  .populate('cid')
  // .populate('author_id')
  .exec(function (err, docs) {
    if (err) {
      return console.log(err)
    }
    console.log(docs)
  })
