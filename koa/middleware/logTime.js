/*
 * @Author: ylyu
 * @Date: 2022-03-04 14:59:08
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-04 14:59:08
 * @Description:
 */
module.exports = function () {
  return async function (ctx, next) {
    console.log('next前，打印时间戳:', new Date().getTime())
    await next()
    console.log('next后，打印时间戳:', new Date().getTime())
  }
}
