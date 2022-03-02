# mongoose 索引与内置 CRUD 方法、扩展 mongoose Model 的静态方法和实例方法

mongoose 中除了以前创建索引的方式，还可以在定义 Schema 的时候创建指定索引。

用法：

```js
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    index: true, // 指定为普通索引
  },
  userid: {
    type: String,
    unique: true, // 指定为唯一索引
  },
})
```

> 注意：没有必要设置索引的时候尽量不设，因为设置索引后虽然查询速度加快，但是新增速度会减慢。

## 内置 CRUD

- Model.create()
- Model.deleteOne()
- Model.updateOnde()
- Model.find()

## 静态方法

定义：

```js
//静态方法（注意这里不能用箭头函数，this指向丢失）
NewsSchema.statics.findByUuid = function (uuid, callback) {
  // console.log(this)
  // 通过find方法获取uuid的数据
  this.find({ uuid: uuid }, (err, docs) => {
    callback(err, docs)
  })
}
```

上面代码等价于：

```js
NewsSchema.static('findByUuid', function (uuid, cb) {
  this.find({ uuid: uuid }, (err, docs) => {
    cb(err, docs)
  })
})
```

使用：

```js
NewsModel.findByUuid('ASLKJK-879879898987', (err, res) => {
  if (err) {
    return console.log(err)
  }
  console.log(res)
})
```

## 实例方法

定义：

```js
实例方法（基本不用）
NewsSchema.methods.print = function () {
  console.log(this)
  console.log('这是一个实例方法')
}
```

使用：

```js
const newsModel = new NewsModel({
  uuid: 'KJDSD-945849',
  title: '新闻007',
  content: '新闻内容内容...',
})

// newsModel.save()
newsModel.print()
```

## 最后

参考：

-[Mongoose 索引](https://mongoosejs.com/docs/guide.html#indexes)

-[Mongoose 静态方法](https://mongoosejs.com/docs/guide.html#statics)

-[Mongoose 实例方法](https://mongoosejs.com/docs/api.html#schema_Schema-method)
