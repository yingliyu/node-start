/*
 * @Author: ylyu
 * @Date: 2022-02-18 17:03:35
 * @LastEditors: ylyu
 * @LastEditTime: 2022-03-02 10:53:22
 * @Description:
 */
const express = require('express')
// 创建路由对象
const router = express.Router()

// 挂载获取admin列表的路由
router.get('/', (req, res) => {
  res.send('后台管理中心')
})

// 向外暴露路由对象
module.exports = router
