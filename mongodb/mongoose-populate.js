/*
 * @Author: ylyu
 * @Date: 2022-03-02 16:07:15
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 18:06:06
 * @Description: mongoose populate
 */
const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://admin:admin@localhost:27017/library_db?authSource=admin'
)
const Schema = mongoose.Schema

// 文章 article collection
const ArticleSchema = mongoose.Schema({
  id: String,
  cid: { type: Schema.Types.ObjectId, ref: 'ArticleCate' }, //cid和文章分离建立关系。model
  author_id: { type: Schema.Types.ObjectId, ref: 'User' }, //作者id
  title: String,
  author_name: String,
  summary: String,
  content: String,
  publish_time: Date,
})

// 文章分类 articlecate collection
const ArticleCateSchema = mongoose.Schema({
  id: { type: Schema.Types.ObjectId },
  title: String,
  description: String,
  create_time: Date,
})

// 用户 users collection
const UsersSchema = mongoose.Schema({
  id: { type: Schema.Types.ObjectId },
  name: String,
  username: String,
  password: String,
  age: Number,
  tel: Number,
  reg_time: Date,
  sex: {
    type: String,
    enum: ['男', '女'],
  },
})

const ArticleModel = mongoose.model('Article', ArticleSchema, 'article')
const ArticleCateModel = mongoose.model(
  'ArticleCate',
  ArticleCateSchema,
  'articlecate'
)
const UsersModel = mongoose.model('User', UsersSchema, 'users')

ArticleModel.find({})
  .populate('cid')
  .populate('author_id')
  .exec(function (err, docs) {
    if (err) {
      return console.log(err)
    }
    console.log(docs)
  })
