/*
 * @Author: ylyu
 * @Date: 2022-01-28 14:33:18
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-11 10:29:11
 * @Description:
 */
// 引入hello模块:
const greet = require('./hello')

const friend = 'Lemon'
greet(friend) // Hello, Lemon!

const md5 = require('md5')
console.log(md5('12345'))
