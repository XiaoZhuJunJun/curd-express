// app.ja入门模块
// 职责：创建服务
// 做相关配置
// 模板引擎
// body-parser解析表单post请求体
// 提供静态服务
// 挂载路由
// 监听端口启动服务

var bodyParser = require('body-parser')
var express = require('express')
const { json } = require('express/lib/response')
var router = require('./router')

var app = express()

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

app.engine('html',require('express-art-template'))

//配置body-parser(注意：配置模板引擎和body-parser一定要在路由挂载之前)(中间件，执行流程)
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//把路由容器挂载到app服务中
app.use(router)

app.listen(3000,function(){
    console.log('running3000...')
})
