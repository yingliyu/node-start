/*
 * @Author: ylyu
 * @Date: 2022-03-04 14:59:15
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-04 14:59:15
 * @Description:
 */
module.exports = function () {
  return async function (ctx, next) {
    console.log('next前，打印url:', ctx.url)
    await next()
    console.log('next后，打印url:', ctx.url)
  }
}
