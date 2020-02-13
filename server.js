const path = require("path");
const request = require('request');
const encoding = require("./src/encoding");
const multipart = require('connect-multiparty');
const {handleFiles} = require('./src/fileHelper')
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

let tokenValidate = function(req,res,next){
  let Authentication = req.get("Authentication");
  // if(!(Authentication instanceof String)){
  //   res.send({
  //     msg:"validate_error"
  //   })
  // }
  console.log(typeof Authentication);
  let [precode,token] = Authentication.split("&");
  //console.log(Authentication);
  if(encoding(precode) === token){
    next();
  }else{
    res.send({
      msg:"validate_error"
    })
  }
  
} 
app.use("/api/*",tokenValidate);

app.post('/apilogin',BodyParser.json(),function(req,res){
  console.log(req.body);
  let now = Date.now();
  res.setHeader("content-type","application/json");
  res.send({msg:"success",data:{
    msg:"success",
    lastValidateTime:now,
    token:encoding(now+"salt")
  }});
})



// respond with "hello world" when a GET request is made to the homepage
app.get('/api/helloworld', function (req, res) {
  console.log(req.get("content-type"));
  res.send({msg:"helloworld"})
})

app.get("/api/thumbnails",function(req,res){
  let response = {data:dbHelper.getAllthumbs(),msg:"success"};
  res.send(response);
})

app.post('/api/uploadImg',multipart_midlleware,function(req,res){
  //console.log(req);
  let raws,thumbnails;
  if(req.files.file instanceof Array){
    raws = req.files.file;
    thumbnails = req.files.compressedFile;
  }else{
    raws = [req.files.file];
    thumbnails = [req.files.compressedFile];
  }
  handleFiles(raws,thumbnails,dbHelper);
  res.send({msg:"success"});
})

app.listen(3000,()=>{
  console.log("server started and listening localhost:3000")
})