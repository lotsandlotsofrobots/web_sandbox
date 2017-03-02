var mysql = require('mysql')
var fs = require('fs')

function render_default(rootdir, response) {
  var path = rootdir + '/sources/jade/blog.jade'
  console.log("trying to compile: " + path)
  //var html = require('jade').compileFile(rootdir + '/sources/jade/blog.jade')({ title : '' })
  
  var jsonData = [];
  var connection = new mysql.createConnection({
    host : 'localhost',
    user : 'nodejs_mysql',
    password : 'xxxx',
    database : 'nodejs_site'
  });
  connection.connect();

  connection.query('SELECT * from posts', function (error, results, fields) {
    if (error) {
      console.log(error);
      throw error;
    }
    console.log("rows returned: " + results[0].posted_on);

    results.forEach(function(element) {
      //loadFile(rootdir + "/sources/json/blog_posts/" + element.id, function (responseText) {
      fs.readFile(rootdir + "/sources/json/blog_posts/" + element.id + ".json", function (err, responseText) {
        jsonData.push(JSON.parse(responseText));
        console.log("Json response text: " + responseText);
      })
    })
  });
  connection.end();

  //response.render(rootdir + '/sources/jade/blog.jade', {'results' : JSON.stringify(jsonData)});
  response.render(rootdir + '/sources/jade/blog.jade', {'results': [{'test':'foobar', 'test':'boo'}]});

  //return html
}

function render_single(id) {
  
}

exports.render = function(request, response, rootdir) {
  if (request.originalUrl === '/blog')
    return render_default(rootdir, response)
  else
    return render_single(request)
}

