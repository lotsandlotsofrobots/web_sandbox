var express = require('express')
  , app = express()
  , index = require('jade').compileFile(__dirname + '/sources/html/index.jade')

app.use(express.static(__dirname + '/static'))

app.get('/', function (req, res, next) {
  try {
    var html = index({ title: 'Home' })
    res.send(html)
  } catch (e) {
    next(e)
  }
})

app.listen(process.env.PORT || 80, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 80))
})
