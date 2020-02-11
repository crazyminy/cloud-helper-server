const path = require("path");
const request = require('request');
const multipart = require('connect-multiparty');
const {saveRaw} = require('./src/fileHelper')
const multipart_midlleware = multipart();
const DbHelper = require('./src/dbHelper');

const dbHelper = new DbHelper("data.json");

dbHelper.init();

// function download(uri, filename, callback){
//     var stream = fs.createWriteStream(filename);
//     request(uri).pipe(stream).on('close', callback);
// }

// download(url, "demo.pkg", function(){
//   console.log("下载成功");
// });

const express = require('express')
const app = express()
const BodyParser = require("body-parser")


// 自定义跨域中间件
let allowCors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authentication');
  res.header('Access-Control-Allow-Credentials','true');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200); /让options请求快速返回/
  }
  else {
    next();
  }
};
app.use(allowCors);//使用跨域中间件

// let tokenValidate = function(req,res,next){
//   let Authentication = req.get("Authentication");
//   console.log("auth"+Authentication);
//   next();
// } 
// app.use("/api/*",tokenValidate);

app.post('/apilogin',BodyParser.json(),function(req,res){
  console.log(req.body);
  res.send({msg:"success"});
})



// respond with "hello world" when a GET request is made to the homepage
app.get('/api/helloworld', function (req, res) {
  console.log(req.get("content-type"));
  res.send({msg:"helloworld"})
})

app.post('/file/upload',multipart_midlleware,function(req,res){
  //console.log(req.files);
  let filesNeedToHandle;
  if(req.files.file instanceof Array){
    //console.log(req.files.file,25525532)
    filesNeedToHandle = req.files.file;
  }else{
    filesNeedToHandle = [req.files.file]
  }
  saveRaw(filesNeedToHandle);
  res.send({msg:"success"});
})

app.listen(3000,()=>{
  console.log("server started and listening localhost:3000")
})