/*
 * @Author: ylyu
 * @Date: 2022-03-02 16:07:15
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 17:13:40
 * @Description: mongoose 聚合管道 aggregate
 */
const mongoose = require('mongoose')
mongoose.connect('mongodb://admin:admin@localhost:27017/shop?authSource=admin')

const OrderSchema = mongoose.Schema({
  order_id: String,
  uid: Number,
  trade_no: String,
  all_price: Number,
  all_num: Number,
})

const OrderItemSchema = mongoose.Schema({
  order_id: String,
  title: String,
  price: Number,
  num: Number,
})

const OrderModel = mongoose.model('Order', OrderSchema, 'order')
const OrderItemModel = mongoose.model(
  'OrderItem',
  OrderItemSchema,
  'order_item'
)

// 查询订单表order collection
/*
OrderModel.find({}, (err, docs) => {
  if (err) {
    return console.log(err)
  }
  console.log(docs)
})
*/

// 查询商品表order_item collection
/*
OrderItemModel.find({}, (err, docs) => {
  if (err) {
    return console.log(err)
  }
  console.log(docs)
})
*/

// 查询order订单号，找出order_item商品中相同订单号的商品，聚合到订单列表的item字段
OrderModel.aggregate(
  [
    {
      $lookup: {
        from: 'order_item',
        localField: 'order_id',
        foreignField: 'order_id',
        as: 'items',
      },
    },
  ],
  (err, docs) => {
    if (err) {
      return console.log(err)
    }
    // console.log(docs)
    // console.log(JSON.stringify(docs))
  }
)

// 查询order_item找出商品名称是牛奶的商品对应的订单的订单号以及订单的总价格
// 第一种实现方式
// OrderItemModel.find({ _id: '621dd1c41927df195f4d1c70' }, (err, docs) => {
//   // console.log(docs)
//   if (err) {
//     return console.log(err)
//   }
//   const { order_id } = docs && docs.length ? docs[0] : ''
//   OrderModel.find({ order_id: order_id }, (err, order) => {
//     if (err) {
//       return console.log(err)
//     }
//     let order_item = JSON.parse(JSON.stringify(docs[0]))
//     order_item.order_info = order[0]
//     console.log(order)
//     console.log(order_item)
//   })
// })

// 第二种实现方式
OrderItemModel.aggregate(
  [
    {
      $lookup: {
        from: 'order',
        localField: 'order_id',
        foreignField: 'order_id',
        as: 'order_info',
      },
    },
    {
      $match: {
        _id: mongoose.Types.ObjectId('621dd1c41927df195f4d1c70'),
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
