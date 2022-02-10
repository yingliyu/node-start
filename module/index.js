/*
 * @Author: ylyu
 * @Date: 2022-02-10 11:45:28
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-10 16:11:03
 * @Description:
 */
const tools = require('./util')
console.log(tools)
// tools.formatDate()

// import { formatDate } from './util'
// formatDate()

console.log(exports) // {}
console.log(module.exports) // {}
console.log(exports === module.exports) // true

const hahaha = require('hahaha')
console.log(hahaha)
