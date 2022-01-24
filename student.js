//这个文件不关心业务，纯粹对文件进行操作（4个API，增删改查）
//数据文件操作模块
//职责：操作文件中的数据，只处理数据，不关心业务

const { json } = require('body-parser')
var fs = require('fs')

var dbPath = './db.json'

//获取所有学生列表
//callback中:
//第一个参数是err,(成功是null，失败是错误对象)
//第二个参数是结果,(成功是结果，错误是undefined)
//return []
exports.find = function(callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        // JSON.parse(data).students
        if(err){
            return callback(err)
        }
        return callback(null,JSON.parse(data).students)
    })
}

/**
 * 根据id获取学生信息对象
 */
exports.findById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        // JSON.parse(data).students
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students
        var ret = students.find(function(item){
            return item.id === parseInt(id) 
        })
        callback(null,ret)
    })
}

//添加保存学生
exports.save = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students

        //处理id唯一，不重复
        student.id = students[students.length-1].id + 1

        //把用户传递的对象保存到数组中
        students.push(student)

        //把对象数据转换为字符串
        var fileData = JSON.stringify({
            students:students
        })

        //把字符串保存到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                //错误就传错误对象
                return callback(err)
            }
            //成功错误对象是null
            callback(null)
        })
    })
}


//更新学生
exports.updateById = function(student,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students

        //这里记得把id转换为数字类型
        student.id = parseInt(student.id)

        //需要修改谁就把谁找出来，EcmaScript 6中的一个数组方法：find
        //需要就收一个函数作为参数
        //当某个便利项符合item.id ==== students.id条件时，find会终止遍历，同事返回遍历项
        var stu = students.find(function(item){
            return item.id === student.id
        })

        //这种方法太死板
        //stu.name = students.name 
        //stu.age = students.age 

        //遍历拷贝对象
        for (var key in student){
            stu[key] = student[key]
        }

        //把对象数据转换为字符串
        var fileData = JSON.stringify({
            students:students
        })

        //把字符串保存到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                //错误就传错误对象
                return callback(err)
            }
            //成功错误对象是null
            callback(null)
        })
    })
}

//删除学生
exports.deleteById = function(id,callback){
    fs.readFile(dbPath,'utf8',function(err,data){
        if(err){
            return callback(err)
        }
        var students = JSON.parse(data).students

        //findIndex方法专门用来根据条件查找元素的下标
        var deleteId =  students.findIndex(function(item){
            return item.id === parseInt(id)
        })
        //根据下标从数组中删除对应的学生对象
        students.splice(deleteId,1)

         //把对象数据转换为字符串
         var fileData = JSON.stringify({
            students:students
        })

        //把字符串保存到文件中
        fs.writeFile(dbPath,fileData,function(err){
            if(err){
                //错误就传错误对象
                return callback(err)
            }
            //成功错误对象是null
            callback(null)
        })

    })
}
