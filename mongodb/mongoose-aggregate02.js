/*
 * @Author: ylyu
 * @Date: 2022-03-02 16:07:15
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 17:45:54
 * @Description: mongoose 聚合管道 aggregate
 */
const mongoose = require('mongoose')
mongoose.connect(
  'mongodb://admin:admin@localhost:27017/library_db?authSource=admin'
)
// 文章 article collection
const ArticleSchema = mongoose.Schema({
  id: String,
  // cid: { type: Schema.Types.ObjectId }, //分类id
  cid: { type: String }, //分类id
  author_id: String, //作者id
  title: String,
  author_name: String,
  summary: String,
  content: String,
  publish_time: Date,
})

// 文章分类 articlecate collection
const ArticleCateSchema = mongoose.Schema({
  id: String,
  title: String,
  description: String,
  create_time: Date,
})

// 用户 users collection
const UsersSchema = mongoose.Schema({
  id: String,
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

ArticleModel.aggregate(
  [
    {
      $lookup: {
        from: 'articlecate',
        localField: 'cid',
        foreignField: 'id',
        as: 'cate',
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author_id',
        foreignField: 'id',
        as: 'author_info',
      },
    },
  ],
  (err, docs) => {
    if (err) {
      return console.log(err)
    }
    console.log(JSON.stringify(docs))
  }
)

// 新增文章
/**
 new ArticleModel({
  id: '002',
  cid: 'c-002', //分类id
  author_id: 'u-002', //作者id
  title: '国际新闻-2022北京冬奥会',
  author_name: '李四',
  summary: '2022北京冬奥会，完美闭幕，此处省略100字...',
  content: '2022北京冬奥会，完美闭幕，此处省略600字...',
  publish_time: '2022-02-26',
}).save((err) => {
  if (err) {
    return console.log(err)
  }
  console.log('增加文章成功')
})
*/

// 新增文章分类
/**
 new ArticleCateModel({
  id: 'c-002',
  title: '国内新闻',
  description: '国内新闻...',
  create_time: '2022-01-15',
}).save((err) => {
  if (err) {
    return console.log(err)
  }
  console.log('增加文章分类成功')
})
*/

// 新增用户
/*
new UsersModel({
  id: 'u-002',
  name: '李四',
  username: 'lisi',
  password: '145fdfsoi',
  age: 24,
  tel: 17454566235,
  reg_time: '2020-10-02 20:34:28',
  sex: '男',
}).save((err) => {
  if (err) {
    return console.log(err)
  }
  console.log('增加用户成功')
})
*/
