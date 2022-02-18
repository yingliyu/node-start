/*
 * @Author: ylyu
 * @Date: 2022-02-18 17:03:35
 * @LastEditors: ylyu
 * @LastEditTime: 2022-02-18 17:12:56
 * @Description:
 */
const express = require('express')
// 创建路由对象
const router = express.Router()

// 挂载获取用户列表的路由
router.get('/user/list', (req, res) => {
  res.send('Get user list.')
})

// 挂载添加用户的路由
router.post('/user/add', (req, res) => {
  res.send('Add new user.')
})

// 向外暴露路由对象
module.exports = router
