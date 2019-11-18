/*var http = require('http');
var fs = require('fs')
  var server = http.createServer(function(req, res){
    
    fs.readFile('index.html',function(err,data){
        if(err){
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/plain');
            res.end('File not found')
        }
        res.setHeader('Content-Type', 'text/html');
        res.statusCode = 200;
        res.end(data);
    })
  });
  server.listen(3000, 'localhost', function(){
    console.log('Server running');
  });
*/



const http = require('http');
const app = require('express')();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
const mongo = required('mongodb');

var db, url = "mongodb+srv://tasdiq:<password>@cluster0-soyml.mongodb.net/test?retryWrites=true&w=majority"

app.use(bodyParse.urlencoded({ extended : true}));

mongo.MongoClient.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true },
  function(err, client){
    if(err){
      console.log('Could not connect to MongoDB')
    }else{
      db = client.db("node-cw9")
    }
  })



let articles = [];

app.get('/article/:index', function(request,response){
  if(articles[request.params.index]){
    response.render('article.ejs',{
      article:articles[request.params.index]
    })
  }else{
    response.json({msg: 'Article not found'})
  }
})


app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});


app.get('/second', function(req, res){
	res.sendFile(__dirname+'/second.html');
});

app.get('/new_article', function(req, res){
	res.sendFile(__dirname+'/views/new_article.html');
});


app.post('/new_article', function(req, res){
  SVGFEFuncAElement()
  console.log(req.body);
  articles.push(req.body);
	res.send('response successfully sent');
});


app.listen(3000, 'localhost', function() {
	console.log('Server running');
});


