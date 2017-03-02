//<script type="text/javascript" src="common.js">

var express = require('express')
  , app = express()
  //, index = require('jade').compileFile(__dirname + '/sources/html/index.jade')
  //, about = require('jade').compileFile(__dirname + '/sources/html/about.jade')

app.use(express.static(__dirname + '/static'))

app.use(function(req, res, next) {
  try {
    console.log("Got a request for " + req.url)
    console.log("Full url was " + req.originalUrl)
    console.log("Path was " + req.path)
    var path = req.path
    if (path === '/') {
        path = "index"
    }
    
    //console.log("trying to compile: " + __dirname + '/sources/html/' + path + '.jade')
    //var html = require('jade').compileFile(__dirname + '/sources/html/' + path + '.jade')({ title : '' })
    var page = __dirname + '/sources/pages/' + path
    console.log("Trying to load " + page)
    var html = require(page).render(req, res, __dirname)
    //res.send(html)
  } catch (e) {
    res.send("ERROR 404 " + e)
    //next(e)
  }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
})
