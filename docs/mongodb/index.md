# mongodb 大数据查询优化——索引

## 前言

索引是对数据库表中一列或多列的值进行排序的一种结构，可以让我们查询数据库变得更快。MongoDB 的索引几乎与传统的关系型数据库一样，这其中包括一些基本的查询优化技巧。

## 案例

### 普通查询（无索引）

首先在本机创建一个 bigData 数据库，在该数据库中创建一个 user 集合，在 user 集合中批量插入 10w 条数据。

```js
// 1、创建一个 bigData 数据库
use mydb

// 2、在当前数据库中创建一个 user 集合，并批量插入10w条数据（这里要耐心等一会）
for(var i=0;i<100000;i++){
  db.user.insert({name:'zhangsan'+i,phone:'123'+i,status:1})
}

// 3、查询具体的执行时间33毫秒，关注explain.executionStats.executionTimeMillis:33
db.user.find().explain("executionStats") // 33ms
db.user.find({name:'zhangsan0'}).explain("executionStats") // 49ms
```

### 索引基础

- 获取当前集合的索引
  ```js
  db.user.getIndexes()
  ```
- 创建索引

```js
db.user.createIndex({ name: 1 })
```

此时再看以下查询操作的执行时间：

```js
db.user.find({ name: 'zhangsan0' }).explain('executionStats') // 0ms
```

可以明显看到，设置索引前后查询执行时间相差很大，设置索引后查询速度很快。

- 删除索引

```js
db.user.dropIndex({ name: 1 })
```

## 多个索引

createIndex() 方法中你也可以设置使用多个字段创建索引，
关系型数据库中称作复合索引。

```js
db.user.createIndex({ name: 1, phone: 1 })
```

创建索引时，指定索引名：

```js
db.user.createIndex({ name: 1 }, { name: 'name_index' })
```

> 随着集合的增长，需要针对查询中大量的排序做索引。如果没有对索引的键调用 sort，MongoDB 需要将所有数据提取到内存并排序。因此在做无索引排序时，如果数据量过大以致无法内存中进行排序，此时 MongoDB 将报错。

## 唯一索引

不能重复的索引。如果唯一索引重复将报错，以提示插入重复键。

```js
// 1、建立一个唯一索引
db.user.createIndex({ name: 1 }, { unique: true })
// 2、插入一条已有name的数据，{ name: 'zhangsan1', phone: '11123849827' }
db.user.insert({ name: 'zhangsan1', phone: '11123849827' })
```

此时报错：

```js
WriteResult({
  nInserted: 0,
  writeError: {
    code: 11000,
    errmsg:
      'E11000 duplicate key error collection: bigData.user index: name_1 dup key: { name: "zhangsan1" }',
  },
})
```

```js
// 插入一条不存在的name的数据，{ name: 'zhangsan01', phone: '11123849827' }
db.user.insert({ name: 'zhangsan01', phone: '11123849827' })
```
