## MongoDB 聚合

MongoDB 的聚合管道将 MongoDB 文档在一个管道处理完毕后将结果传递给下一个管道处理。管道操作是可以重复的。

表达式：处理输入文档并输出。表达式是无状态的，只能用于计算当前聚合管道的文档，不能处理其它的文档。

> MongoDB 中聚合(aggregate)主要用于处理数据(诸如统计平均值，求和等)，并返回计算后的数据结果。
> MongoDB 中聚合的方法使用 aggregate()。

aggregate() 方法的基本语法格式如下所示：
`db.COLLECTION_NAME.aggregate(AGGREGATE_OPERATION)`

## 聚合管道操作符

- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。$match 使用 MongoDB 的标准查询操作。
- $limit：用来限制 MongoDB 聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $lookup: 用以引入其他集合的数据（表关联查询）。

## SQL 与 NOSQL 对比

| SQL      | NOSQL    |
| -------- | -------- |
| WHERE    | $match   |
| GROUP BY | $group   |
| HAVING   | $match   |
| SELECT   | $project |
| ORDER BY | $sort    |
| LIMIT    | $limit   |
| SUM()    | $sum     |
| COUNT()  | $sum     |
| JOIN     | $lookup  |

## 管道操作符使用

### 数据

创建数据库 shop，并插入以下数据：

```js
use shop

db.order.insert({
  order_id: '1',
  uid: 10,
  trade_no: '111',
  all_price: 100,
  all_num: 2,
})
db.order.insert({
  order_id: '2',
  uid: 7,
  trade_no: '222',
  all_price: 90,
  all_num: 2,
})
db.order.insert({
  order_id: '3',
  uid: 9,
  trade_no: '333',
  all_price: 20,
  all_num: 6,
})

db.order_item.insert({ order_id: '1', title: '商品鼠标1', price: 50, num: 1 })
db.order_item.insert({ order_id: '1', title: '商品键盘2', price: 50, num: 1 })
db.order_item.insert({ order_id: '1', title: '商品键盘3', price: 0, num: 1 })
db.order_item.insert({ order_id: '2', title: '牛奶', price: 50, num: 1 })
db.order_item.insert({ order_id: '2', title: '酸奶', price: 40, num: 1 })
db.order_item.insert({ order_id: '3', title: '矿泉水', price: 2, num: 5 })
db.order_item.insert({ order_id: '3', title: '毛巾', price: 10, num: 1 })
```

### $project

基于以上数据，要求查询 order 只返回文档中的`trade_no`和`all_price`字段。

```bash
#  普通方法实现
db.order.find({}, { trade_no: 1, all_price: 1 })
#  or
#  使用$project实现(还可以实现表关联)
db.order.aggregate([
  {
    $project: {
      "trade_no": 1,
      "all_price": 1,
    }
  }
])
```

### $match

用于过滤数据，只输出符合条件的文档。用法类似于 find()方法中的参数。

要求：查询 all_price 大于 60 的订单。

```bash
# 查询all_price大于60的订单
db.order.aggregate([
  {
    $project: {
      "trade_no": 1,
      "all_price": 1,
    }
  },
  {
    $match: {
      "all_price": { $gt: 60 },
    }
  }
])
```

### $group

- 要求：查询统计每个订单的商品数量。

```bash
db.order_item.aggregate([
  {
    $group: {_id: "$order_id", total:{$sum: "$num"}}
  }
])
```

输出：

```bash
{ "_id" : "2", "total" : 2 }
{ "_id" : "1", "total" : 3 }
{ "_id" : "3", "total" : 6 }
```

- 要求：查询每个订单的总价格。

```bash
db.order_item.aggregate([
  {
    $group: {_id: "$order_id", total:{$sum: "$price"}}
  }
])
```

输出：

```bash
{ "_id" : "2", "total" : 90 }
{ "_id" : "1", "total" : 100 }
{ "_id" : "3", "total" : 12 }
```

### $sort

要求：查询订单总额`all_price`大于等于 90 的订单，返回`trade_no`、`all_price`字段，并按`all_price`倒叙排序。

```bash
db.order.aggregate([
  {
    $project:{ trade_no:1, all_price:1 }
  },
  {
    $match:{"all_price":{$gte:90}}
  },
  {
    $sort:{"all_price":-1}
  }
])
```

输出：

```bash
{ "_id" : ObjectId("621dd15b1927df195f4d1c6a"), "trade_no" : "111", "all_price" : 100 }
{ "_id" : ObjectId("621dd1601927df195f4d1c6b"), "trade_no" : "222", "all_price" : 90 }
```

### $limit

要求：查询订单总额`all_price`大于等于 90 的订单，返回`trade_no`、`all_price`字段，并按`all_price`倒叙排序，返回一条数据。

```bash
db.order.aggregate([
  {
    $project:{ trade_no:1, all_price:1 }
  },
  {
  $match:{"all_price":{$gte:90}}
  },
  {
    $sort:{"all_price":-1}
  },
  {
    $limit:1
  }
])
```

输出：

```bash
{ "_id" : ObjectId("621dd15b1927df195f4d1c6a"), "trade_no" : "111", "all_price" : 100 }
```

### $skip

要求：查询订单总额`all_price`大于等于 90 的订单，返回`trade_no`、`all_price`字段，并按`all_price`倒叙排序，跳过第一条数据。

```bash

db.order.aggregate([
  {
    $project:{ trade_no:1, all_price:1 }
  },
  {
    $match:{"all_price":{$gte:90}}
  },
  {
    $sort:{"all_price":-1}
  },
  {
    $skip:1
  }
])
```

输出：

```bash
{ "_id" : ObjectId("621dd1601927df195f4d1c6b"), "trade_no" : "222", "all_price" : 90 }
```

### $lookup

表的关联查询。

- 要求：关联 order 和 order_item 查询

```bash
db.order.aggregate([
  {
      $lookup:
        {
          from: "order_item", # order表要关联的表
          localField: "order_id", # 主表字段
          foreignField: "order_id", # 关联表字段
          as: "items" # 指定关联后的数据存放的字段名称
        }
    }
])
```

输出：

```bash
{ "_id" : ObjectId("621dd15b1927df195f4d1c6a"), "order_id" : "1", "uid" : 10, "trade_no" : "111", "all_price" : 100, "all_num" : 2, "items" : [ { "_id" : ObjectId("621dd1b11927df195f4d1c6d"), "order_id" : "1", "title" : "商品鼠标1", "price" : 50, "num" : 1 }, { "_id" : ObjectId("621dd1b71927df195f4d1c6e"), "order_id" : "1", "title" : "商品键盘2", "price" : 50, "num" : 1 }, { "_id" : ObjectId("621dd1be1927df195f4d1c6f"), "order_id" : "1", "title" : "商品键盘3", "price" : 0, "num" : 1 } ] }
{ "_id" : ObjectId("621dd1601927df195f4d1c6b"), "order_id" : "2", "uid" : 7, "trade_no" : "222", "all_price" : 90, "all_num" : 2, "items" : [ { "_id" : ObjectId("621dd1c41927df195f4d1c70"), "order_id" : "2", "title" : "牛奶", "price" : 50, "num" : 1 }, { "_id" : ObjectId("621dd1ca1927df195f4d1c71"), "order_id" : "2", "title" : "酸奶", "price" : 40, "num" : 1 } ] }
{ "_id" : ObjectId("621dd1651927df195f4d1c6c"), "order_id" : "3", "uid" : 9, "trade_no" : "333", "all_price" : 20, "all_num" : 6, "items" : [ { "_id" : ObjectId("621dd1cf1927df195f4d1c72"), "order_id" : "3", "title" : "矿泉水", "price" : 2, "num" : 5 }, { "_id" : ObjectId("621dd1d51927df195f4d1c73"), "order_id" : "3", "title" : "毛巾", "price" : 10, "num" : 1 } ] }
```

- 关联查询，增加查询条件并限制返回的字段：

```bash
db.order.aggregate([
  {
        $lookup:
          {
            from: "order_item",
            localField: "order_id",
            foreignField: "order_id",
            as: "items"
          }
    },
  {
    $project:{ trade_no:1, all_price:1, items:{order_id:1, title:1, price:1, num:1} }
  },
  {
    $match:{"all_price":{$gte:90}}
  },
  {
    $sort:{"all_price":-1}
  }
])
```

输出：

```bash
{ "_id" : ObjectId("621dd15b1927df195f4d1c6a"), "trade_no" : "111", "all_price" : 100, "items" : [ { "order_id" : "1", "title" : "商品鼠标1", "price" : 50, "num" : 1 }, { "order_id" : "1", "title" : "商品键盘2", "price" : 50, "num" : 1 }, { "order_id" : "1", "title" : "商品键盘3", "price" : 0, "num" : 1 } ] }
{ "_id" : ObjectId("621dd1601927df195f4d1c6b"), "trade_no" : "222", "all_price" : 90, "items" : [ { "order_id" : "2", "title" : "牛奶", "price" : 50, "num" : 1 }, { "order_id" : "2", "title" : "酸奶", "price" : 40, "num" : 1 } ] }
```

## 聚合的表达式

| 表达式    | 描述                                                                               | 实例                                                                                  |
| --------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| $sum      | 计算总和。                                                                         | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg      | 计算平均值                                                                         | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min      | 获取集合中所有文档对应值得最小值。                                                 | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      | 获取集合中所有文档对应值得最大值。                                                 | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $push     | 将值加入一个数组中，不会判断是否有重复的值。                                       | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}])            |
| $addToSet | 将值加入一个数组中，会判断是否有重复的值，若相同的值在数组中已经存在了，则不加入。 | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}])       |
| $first    | 根据资源文档的排序获取第一个文档数据。                                             | db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}])    |
| $last     | 根据资源文档的排序获取最后一个文档数据                                             | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}])      |

## 最后

参考

[https://www.runoob.com/mongodb/mongodb-aggregate.html](https://www.runoob.com/mongodb/mongodb-aggregate.html)
