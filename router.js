// router.js路由模块
// 职责：处理路由，根据不同请求方法+请求路径设置具体的请求函数

var fs = require('fs')
var Student = require('./student')

//这样也不方便
// module.exports = function(app){
    
// }

//express提供了一种更好的方式，专门用来包装路由
var express = require('express')
const { Server } = require('http')
//1.创建一个路由容器
var router = express.Router()

//2.把路由都挂载到路由容器中
//渲染学生列表页面
router.get('/students',function(req,res){

    Student.find(function(err,students){
        if (err){
            return res.status(500).send('Server error.')
        }
        res.render('index.html',{
        fruits: [
            '香蕉',
            '苹果',
            '橘子'
        ],
        //从文件中读取到的数据一定是字符串，要先手动转成对象
        students: students
    })
    })

    //第二个参数是可选的，传入utf8是告诉它把读取到的文件直接按照utf8
    //编码转成我们能认识的字符,也可以data.toString()
    // fs.readFile('./db.json','utf8',function(err,data){
    //     if (err){
    //         return res.status(500).send('Server error.')
    //     }

    //     var students = JSON.parse(data).students

    //     res.render('index.html',{
    //     fruits: [
    //         '香蕉',
    //         '苹果',
    //         '橘子'
    //     ],
    //     //从文件中读取到的数据一定是字符串，要先手动转成对象
    //     students: students
    // })

    
    // })
})

//渲染添加学生页面
router.get('/students/new',function(req,res){
    res.render('new.html')
    
})

//处理添加学生
router.post('/students/new',function(req,res){
    /*
    1.获取表单
    2.处理表单
        将数据保存到db.json文件中用于持久化存储
    3.发送响应
    **/

    //先读取到数据，转成对象
    //然后往对象中push数据
    //然后把对象转成字符串
    //然后把字符串再次写入文件
    Student.save(req.body,function(err){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.redirect('/students')
    })
})

//渲染编辑学生页面
router.get('/student/edit',function(req,res){
    //1.在客户端的列表页处理连接问题（需要有id参数）
    //2.获取要编辑的学生id
    //3.渲染编辑页面(1.根据id把学生信息查询出来。2.使用模板引擎渲染页面)
    Student.findById(parseInt(req.query.id),function(err,student){
        if(err){
            return res.status(500).send('Server error.')
        }
        res.render('edit.html',{
            student:student
        })
    })
})

//处理编辑学生
router.post('/students/edit',function(req,res){
    //req.body获取表单数据
    //Student.updataById()更新
    //发送响应
    Student.updateById(req.body,function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
    // console.log(req.query.id)
})

//处理删除学生
router.get('/student/delete',function(req,res){
    Student.deleteById(req.query.id,function(err){
        if(err){
            return res.status(500).send('Server error')
        }
        res.redirect('/students')
    })
    // console.log(req.query.id)
})

//3.把router导出
module.exports = router