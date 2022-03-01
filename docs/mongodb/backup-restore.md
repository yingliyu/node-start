# MongoDB 数据库备份和还原

## 导出备份

> `mongodump -h dbhost -d dbname -o dbdirectory`

参数说明：

-h- MongoDB 所在服务器地址，例如：127.0.0.1，也可以指定端口号：127.0.0.1：27017

-d- 需要备份的数据库实例

-o- 备份的数据存放位置

## 回复导入

> `mongorestore -h dbhost -d dbname dbdirectory`

参数说明：

-h- MongoDB 所在服务器地址，例如：127.0.0.1，也可以指定端口号：127.0.0.1：27017

-d- 需要备份的数据库实例，也可以和备份的时候不一样

## 数据库有权限认证的命令

> `mongodump -h localhost:27017 -d test -u test -p testpwd -o D:\dump`

> `mongodump -h localhost:27017 -d test -c order --dir d:\dumo\test\test.bson -u test -p testpwd`
