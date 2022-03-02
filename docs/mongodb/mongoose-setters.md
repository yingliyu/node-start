# Mongoose 预定义模式修饰符、 Getters 与 Setters 自定义修饰符

## Mongoose 预定义模式修饰符

mongoose 提供的预定义模式修饰符，可以对我们增加的数据进行一些格式化。mongoose 预定义的模式修饰符有：

1. lowercase
2. uppercase
3. trim

例如：

```js
const UserSchema = mongoose.Schema({
  name:{
    type:String,
    trim：true
  },
  age:Number,
  status:{
    type:Number,
    default:1
  }
})
```

## Getters 与 Setters 自定义修饰符

除了 mongoose 内置的修饰符意外，还可以通过 set（建议使用）修饰符增加数据的时候对数据进行格式化。也可以通过 get（不建议使用）在实例获取数据时对数据进行格式化。

```js
const UserSchema = mongoose.Schema({
  name: { type: String, trim: true },
  age: {
    type: Number,
    get(params) {
      return `A001-${params}`
    },
  },
  avator: {
    type: String,
    set(params) {
      if (!params) {
        return ''
      }
      // 增加数据的时候对avator字段进行处理，params是avator的值,返回的数据是avator实际保存至数据库的值
      return params.indexOf('http://') !== 0 && params.indexOf('https://') !== 0
        ? `http://www.xxx.com/imgs/${params}`
        : params
    },
  },
  status: {
    type: Number,
    default: 1,
  },
})

// mydb数据库的managers集合
const userModel = mongoose.model('User', UserSchema, 'managers')

// 增加
const user = new userModel({
  name: 'zhangSan  ',
  age: 20,
  avator: 'aaa.png', // set方法将数据处理为：http://www.xxx.com/imgs/aaa.png格式然后添加到数据库中
})
console.log(user.age) // A001-20
```
