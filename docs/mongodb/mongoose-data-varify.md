# Mongoose 数据校验

mongoose 数据校验：用户通过 mongoose 给 mongodb 数据库增加数据的时候，对数据的合法性进行的校验。

mongoose Schema 中定义的属性包括：字段类型、修饰符、默认值、数据校验都是为了数据的一致性。

mongoose Schema 是数据对象的集合，每个 schema 会映射到 mongodb 数据库中的一个 collection，定义 schema 可以理解为表结构的定义。

## Mongoose 校验参数

常见的 SchemaType Options：

- required：<Boolean|Function> 如果是 true，则为该属性添加所需的验证提示语
- validate：Function 类型，添加一个自定义校验函数
- max：最大值，用于 Number 类型数据
- min：最小值，用于 Number 类型数据
- enum：枚举类型，要求数据必须满足枚举值
- match：增加的数据必须符合 match(正则)的规则
- maxlength：最大长度
- minlength：最小长度

## 使用

```js
const UserSchema = mongoose.Schema({
  name: { type: String, required: [true, '用户名不能为空'] },
  age: { type: Number, min: 0, max: 120 },
  phone: {
    type: Number,
    match: /^\d{11}$/,
  },
  status: {
    type: Number,
    default: 1,
    enum: [0, 1, 2],
  },
  intro: {
    type: String,
    // 自定义验证器，如果通过验证返回true，否则返回false
    validate: function (intro) {
      return intro.length >= 10
    },
  },
})
```

## 最后

参考：

[https://mongoosejs.com/docs/schematypes.html#schematype-options](https://mongoosejs.com/docs/schematypes.html#schematype-options)
