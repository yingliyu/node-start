# mongoose

> Mongoose 是在 nodejs 异步环境下对 mongodb 进行便捷操作的对象模型工具。Mongoose 是 nodejs 的驱动，不能作为其他语言的驱动。

特点：

-通过关系型数据库的思想来设计非关系型数据库

-基于 mongodb 驱动，简化操作

## 安装

[https://mongoosejs.com](https://mongoosejs.com)

```js
npm i mongoose --save
```

## 使用

1. 引入 mongoose 并连接数据库。

建立连接方式：

`mongoose.connect( 'mongodb://localhost:27017/dbname' )`

or

`mongoose.connect( 'mongodb://username:password@localhost:27017/dbname?authSource=username' )`

其中 username 是登录数据库的用户名，password 是密码，dbname 是要连接的数据库名称。

```js
// 1、引入mongoose包
const mongoose = require('mongoose')
// 2、与数据库建立连接
mongoose.connect('mongodb://localhost/dbname')
// or
// 有账号密码采用下面的连接方式
mongoose.connect('mongodb://admin:admin@localhost:27017/mydb?authSource=admin')
```

1. 定义 Schema

数据库中的 Schema，为数据库对象的集合。schema 是 mongoose 中会用到的一种数据模式，可以理解为表结构的定义，每个 schema 会映射到 mongodb 中的一个 collection，它不具备操作数据库的能力。

```js
const userSchema = mongoose.Schema({
  name: String,
  age: Number | String,
})
```

3. 创建数据模型

定义好 schema 之后，生成 Model。model 是由 schema 生成的模型，可对数据库操作。

`mongoose.model('ModelName', mySchema)`

参数说明：

-ModelName- 模型名称（首字母大写）

-mySchema- schema

模型会和模型名称相同的复数的数据库建立连接，如：ModelName 是 User，则该模型会和 users 这个集合。

```js
const UserModel = mongoose.model('User', userSchema, 'user')
```

4. 查询操作

```js
UserModel.find({}, (err, docs) => {
  if (err) {
    return console.log(err)
  }
  console.log(docs)
})
```

## 增加

```js
// 通过实例化User Model创建增加的数据
const userDoc = new UserModel({ name: '王五', age: 30 })
userDoc.save((err) => {
  if (err) {
    return console.log(err)
  }
  console.log('增加数据成功')
})
```

## 修改

```js
UserModel.updateOne(
  { _id: '621c8fba4401f1279e6e43e8' },
  { age: 500 },
  (err, res) => {
    if (err) {
      return console.log(err)
    }
    console.log('数据修改成功')
  }
)
```

## 删除

```js
UserModel.deleteOne({ _id: '621ee9f9bc7c71ddfb7c0176' }, (err, res) => {
  if (err) {
    return console.log(err)
  }
  console.log('删除成功')
})
```

## 最后

参考：[https://mongoosejs.com/docs/api/model.html](https://mongoosejs.com/docs/api/model.html)
