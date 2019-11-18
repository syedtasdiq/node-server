var http = require('http');
const express  = require('express');
const app = express()
const server = http.Server(app)
var fs = require('fs')
var bodyParser = require('body-parser')
//const mongo = require('mongodb')
app.use(bodyParser.urlencoded({extended: true}))
var mongoose = require('mongoose')
let article = []
var url = "mongodb+srv://tasdiq:tasdiq@cluster0-soyml.mongodb.net/test?retryWrites=true&w=majority"
 
// mongo.MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true},function(err,client){
//   if(err){
//     console.log("could not connect to mongodb")
//   }else{
//     db = client.db("node-cw9")
//   }
// })
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true})
mongoose.connection.on('error',function(err){
  console.log('could not connect to mongoose')
})
// var save = function(form_data){
 
// db.createCollection('article',function(err,collection){
//   var collection = db.collection('article')
//   collection.save(form_data)
// })
// }
 
var Schema = mongoose.Schema
var articleSchema = new Schema(
  {
    title:{
      type: String,
      required: 'title is required'
    },
    content:{
      type: String,
      required: 'content is required'
    }
  }
)
var Article = mongoose.model("Article",articleSchema)
// app.get('/article/index', function(request,response){
//   if(article[request.params.index]){
//     response.json(article[request.params.index])
//   }else{
//     response.json({msg: "not found"})
//   }
// })
 
// app.get('/article/:index', function(request,response){
//   if(article[request.params.index]){
//     response.render('article.ejs',{article:article[request.params.index]})
//   }else{
//     response.json({msg: "not found"})
//   }
// })
app.get('/article/:id', function(request,response){
    if(request.params.id){
      Article.find({'_id': request.params.index},function(err,data){
        if(err){
          return response.status(400).json({msg: 'cant find'})
        }
        return response.render("article.ejs",{
          'article':data
        })
      })
    }else{
      response.json({msg: "Article not found"})
    }
  })
  // var server = http.createServer(function(req, res){
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'text/html');
  //   fs.readFile('index.html3',function(err,data){
  //     if(err){
  //       res.statusCode = 404;
  //       res.setHeader('Content-Type', 'text/plain');
  //       res.end("file not found")
  //     }
  //     res.setHeader('Content-Type', 'text/html');
  //     res.statusCode = 200;
  //     res.end(data)
  //   })
  //  // res.end("Hello World\n");
  // });
 
  app.post('/new_article', function(request,response){
    // article.push(request.body)
    // save(request.body)
    // console.log(article)
    // response.json({msg: "successfully recevie"})
    let article = new Article(request.body)
    article.save(function(err,data){
      if(err){
       return  response.status(400).json({msg: "All fields are required"})
      }
      return response.status(200).json({article:data})
 
    })
   
  })
  app.get('/', function(request,response){
    response.sendFile(__dirname+"/views/index.html")
  })
  app.get('/second', function(request,response){
    response.sendFile(__dirname+"/views/index2.html")
  })
  app.get('/for', function(request,response){
    response.sendFile(__dirname+"/views/form.html")
  })
  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });

