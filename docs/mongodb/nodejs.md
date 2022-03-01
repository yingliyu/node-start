# Nodejs 中使用 mongodb

## 前言

在 nodejs 中使用 mongodb 进行增（create）删（delete）改（update）查（read）操作，即 CRUD。

## 安装 mongodb 包

```js
// 1、初始化package.json
npm init
// 2、安装依赖
npm install mongodb --save
```

## 建立连接

与 mydb 数据库建立连接，账号密码：admin/admin

```js
const { MongoClient } = require('mongodb')
const assert = require('assert')

// Connection URL
const url = 'mongodb://admin:admin@localhost:27017'

// Database Name
const dbName = 'mydb'

// Create a new MongoClient
const client = new MongoClient(url)

// Use connect method to connect to the Server
client.connect((err) => {
  if (err) {
    return console.log(err)
  }
  assert.equal(null, err)
  console.log('Connected successfully to server.')
  client.close() // 操作数据库完毕后，关闭数据库
})
```

## 查询操作

完整代码如下：

```js
const { MongoClient } = require('mongodb')
const assert = require('assert')

const url = 'mongodb://admin:admin@localhost:27017'
const dbName = 'mydb'
const client = new MongoClient(url)

client.connect((err) => {
  if (err) {
    return console.log(err)
  }
  assert.equal(null, err)
  console.log('Connected successfully to server.')
  const db = client.db(dbName)
  const collection = db.collection('user')

  // 查找数据
  collection.find({}).toArray((err, docs) => {
    if (err) {
      return console.log(err)
    }
    assert.equal(err, null)
    console.log('Found the following records')
    console.log(docs)

    client.close()
  })
})
```

## 增加操作

主要代码片段如下：

```js
collection.insertOne(
  {
    name: '李4',
    sex: '男',
  },
  (err, res) => {
    if (err) {
      return console.log(err)
    }
    console.log('增加成功')
    console.log(res) // {acknowledged: true,insertedId: new ObjectId("621de7887ed50f90f146f38d")}
    client.close()
  }
)
```

## 修改操作

主要代码片段如下：

```js
collection.updateOne(
  {
    name: 'lemon',
  },
  { $set: { age: 100 } },
  (err, res) => {
    if (err) {
      return console.log(err)
    }
    console.log('修改成功')
    console.log(res) // {acknowledged: true, modifiedCount: 1,upsertedId: null,upsertedCount: 0,matchedCount: 1}
    client.close()
  }
)
```

## 删除操作

主要代码片段如下：

```js
// 4、删除一条数据
collection.deleteOne(
  {
    name: 'yuyu',
  },
  (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('删除一条数据成功')
    client.close()
  }
)

// 5、批量删除数据
collection.deleteMany(
  {
    age: { $lt: 5 },
  },
  (err) => {
    if (err) {
      return console.log(err)
    }
    console.log('批量删除数据成功')
    client.close()
  }
)
```

## 最后

参考：

[https://mongodb.github.io/node-mongodb-native/3.5/quick-start/quick-start/](https://mongodb.github.io/node-mongodb-native/3.5/quick-start/quick-start/)
