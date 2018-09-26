var http = require('http');
const fs = require('fs');
var parser = require('url');
const express = require('express');
const app = express();
const server = http.createServer(app);
var bodyParser = require('body-parser')

//parse application/json and look for raw text
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json'}));

app.get('/readFile',function(req,res){
  var fileName = process.argv[2];
  if(fileName == undefined){
    res.sendStatus(404);
    res.end()
  }
  else {
    fs.readFile(fileName, (err, file) => {
        if(err){
          res.end(err)
         }
         else{
             res.statusCode = 200;
             res.end(file.toString());
         }
       });
  }
})

app.get('/product/:p1/:p2',function(req,res){
    var n1 = parseInt(req.params.p1)
    var n2 = parseInt(req.params.p2)
    if(isNaN(n1) || isNaN(n2)){
        res.sendStatus(404);
        res.end()
    }
    else {
      res.write((n1*n2).toString()); //write a response
      res.end(); //end the response
    }
 })

 app.get('/string/:str',function(req,res){
     var str = req.params.str
     console.log(typeof parseInt(str),"type");
     var arr = str.split("")
     var letter = ''
     for (var i = 0; i < arr.length; i++) {
         var flag = true;
         for (var j = 0; j < arr.length; j++)
         {
           if (arr[i] === arr[j] && i != j) {
             flag = false;
           }
         }
         if (flag) {
           letter = arr[i];
           break;
         }
     }
     res.write(letter); //write a response
     res.end(); //end the response
  })

  app.get('/writeFile/:content',function(req,res){
      var content = req.params.content;
      fs.writeFile('sample_output.txt',content, (err) => {
          if(err){
            res.end(err)
           }
           else{
               res.statusCode = 200;
               res.end("sample_output.txt created");
           }
         });
  })

server.listen(3001, function(){
 console.log("server start at port 3001"); //the server object listens on port 3000
});
module.exports = server;
