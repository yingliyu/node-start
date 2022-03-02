/*
 * @Author: ylyu
 * @Date: 2022-03-01 17:10:40
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 11:03:42
 * @Description:
 */
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

  const db = client.db(dbName)
  const collection = db.collection('user')

  // 1、查找数据
  // collection.find({}).toArray((err, docs) => {
  //   if (err) {
  //     return console.log(err)
  //   }
  //   assert.equal(err, null)
  //   console.log('Found the following records')
  //   console.log(docs)
  //   // callback(docs)
  //   // 操作数据库完毕后，关闭数据库
  //   client.close()
  // })

  // 2、增加数据
  // collection.insertOne(
  //   {
  //     name: '李4',
  //     sex:'男'
  //   },
  //   (err, res) => {
  //     if (err) {
  //       return console.log(err)
  //     }
  //     console.log('增加成功')
  //     console.log(res) // {acknowledged: true,insertedId: new ObjectId("621de7887ed50f90f146f38d")}
  //     client.close()
  //   }
  // )

  // 3、修改数据
  // collection.updateOne(
  //   {
  //     name: 'lemon',
  //   },
  //   { $set: { age: 100 } },
  //   (err, res) => {
  //     if (err) {
  //       return console.log(err)
  //     }
  //     console.log('修改成功')
  //     console.log(res) // {acknowledged: true, modifiedCount: 1,upsertedId: null,upsertedCount: 0,matchedCount: 1}
  //     client.close()
  //   }
  // )

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
})
