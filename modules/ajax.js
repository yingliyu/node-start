/*
 * @Author: ylyu
 * @Date: 2022-02-23 17:58:11
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-23 17:58:12
 * @Description:
 */
const ajax = new XMLHttpRequest()
ajax.open(
  'get',
  'https://filecenter.cn-abs.com/public/doc/usehelper.json',
  false
)
ajax.send()
ajax.onreadystatechange = function () {
  if (ajax.readyState === 4 && ajax.status === 200) {
    console.log(ajax.responseText)
    help = ajax.responseText
  }
}
