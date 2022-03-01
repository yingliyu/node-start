# MongoDB 权限

## 前言

MongoDB 安装完成后，默认是没有权限验证的，默认是不需要输入用户名密码即可登录的，但是往往数据库方面我们会出于安全性的考虑而设置用户名密码。

即任何客户端都可以使用 mongo IP:27017/admin 命令登录 mongo 服务

## 权限管理

基于 MongoDB v5.0.6

1. mongodb 是没有默认管理员账号，所以要先添加管理员账号，在开启权限认证。
2. 切换到 admin 数据库，添加的账号才是管理员账号。
3. 用户只能在用户所在数据库登录，包括管理员账号。
4. mongo 的用户是以数据库为单位来建立的，每个数据库有自己的管理员。
5. 管理员可以管理所有数据库，但是不能直接管理其他数据库，要先在 admin 数据库认证后才可以。
   注：帐号是跟着库走的，所以在指定库里授权，必须也在指定库里验证

### 开启权限

```js
use admin

db.createUser({
  user:'admin',
  pwd:'admin',
  roles:[{role:'root',db:'admin'}]
})
```

- user：用户名
- pwd：密码
- db：指定该用户的数据库，admin 是用于权限控制的数据库，如果没有需要新建一个
- roles：指定用户的角色，可以用一个空数组给新用户设定空角色；在 roles 字段,可以指定内置角色和用户定义的角色。role 里的角色可以参考文末附录。

- 查看当前数据库的用户

```js
show users
```

- 删除当前数据库的用户

```js
db.dropUser('admin')
```

### 修改配置

在 mongodb 的安装目录下找到 bin/mongod.cfg 文件，开启权限：

```
security:
  authorization: enabled
```

> 注意：这里格式比较严格，:必须是英文且后面需要有一个空格。

修改配置文件，重启 mongo 服务生效。
快捷键：Win+R，输入：services.msc，回车，选中 MongoDB Server，然后右键重新启动即可。

### 连接数据库

此时再连接数据库需要权限，直接访问如下：

```js
>mongo
MongoDB shell version v5.0.6
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("728412d7-7856-42b0-b0e9-97c1d5f4d99xx") }
MongoDB server version: 5.0.6
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
> show dbs
> use mydb
switched to db mydb
> show collections
Warning: unable to run listCollections, attempting to approximate collection names by parsing connectionStatus
> db.user.find()
Error: error: {
        "ok" : 0,
        "errmsg" : "not authorized on mydb to execute command { find: \"user\", filter: {}, lsid: { id: UUID(\"728412d7-7856-42b0-b0e9-97c1d5f4d999\") }, $db: \"mydb\" }",
        "code" : 13,
        "codeName" : "Unauthorized"
}
```

- 用超级管理员账户连接数据库

1. 启动时直接登录：`mongo admin -u 用户名 -u 密码`

```js
> mongo admin -u admin -u admin
> use admin
switched to db admin
> show collections
system.users
system.version
```

可以操作，说明登录成功。

2. 先普通连接，再切到 admin 数据库执行`db.auth()`登录

```js
> mongo
> use admin
> db.auth('admin','admin')
1
```

输出一个结果值为 1，说明这个用户匹配上了，如果用户名、密码不对，会输出 0。

### 给指定数据库创建用户

给 mydb 数据库创建用户：

```js
use mydb
// 创建一个mydb数据库管理员用户
db.createUser({
  user:'mydb_admin',
  pwd:'123456',
  roles:[{role:'dbOwner',db:'mydb'}]
})
// 查看当前数据库的所有用户
 show users
```

创建用户成功，接下来使用该用户登录尝试操作以下，看看权限范围是否正确。

```js
>mongo mydb -u mydb_admin -p 123456
MongoDB shell version v5.0.6
connecting to: mongodb://127.0.0.1:27017/mydb?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("1906e388-6e44-4e80-bf46-cc83d7ff34ab") }
MongoDB server version: 5.0.6
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
> show dbs
mydb  0.003GB
> show collections
admin
user
> use admin
switched to db admin
> show collections
Warning: unable to run listCollections, attempting to approximate collection names by parsing connectionStatus
```

权限没问题，该用户只能看到并对 mydb 数据库，不能访问其他数据库。

> nodejs 中连接数据库'mongodb://admin:123456@localhost:27017'

## 指令

```js
show users // 查看当前数据库下的用户
db.dropUser('mydb_admin') // 删除当前数据库的mydb_admin用户
db.updateUser("admin",{pwd:"password"}) // 修改用户密码
db.auth('admin','password')  // 密码认证，1成功，0失败
```

## 最后

附录：

Built-In Roles（内置角色）：

1. 数据库用户角色：read、readWrite;
2. 数据库管理角色：dbAdmin、dbOwner、userAdmin;
3. 集群管理角色：clusterAdmin、clusterManager、clusterMonitor、hostManager; 4. 4. 备份恢复角色：backup、restore;
4. 所有数据库角色：readAnyDatabase、readWriteAnyDatabase、userAdminAnyDatabase、dbAdminAnyDatabase;
5. 超级用户角色：root;  
   // 这里还有几个角色间接或直接提供了系统超级用户的访问（dbOwner 、userAdmin、userAdminAnyDatabase）
6. 内部角色：\_\_system;

具体角色的功能：

- Read：允许用户读取指定数据库
- readWrite：允许用户读写指定数据库
- dbAdmin：允许用户在指定数据库中执行管理函数，如索引创建、删除，查看统计或访问 system.profile
- userAdmin：允许用户向 system.users 集合写入，可以找指定数据库里创建、删除和管理用户
- clusterAdmin：只在 admin 数据库中可用，赋予用户所有分片和复制集相关函数的管理权限。
- readAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的读权限
- readWriteAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的读写权限
- userAdminAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的 userAdmin 权限
- dbAdminAnyDatabase：只在 admin 数据库中可用，赋予用户所有数据库的 dbAdmin 权限。
- root：只在 admin 数据库中可用。超级账号，超级权限

参考：

-[https://www.cnblogs.com/pl-boke/p/10063351.html](https://www.cnblogs.com/pl-boke/p/10063351.html)

-[https://www.runoob.com/mongodb/mongodb-tutorial.html](https://www.runoob.com/mongodb/mongodb-tutorial.html)
