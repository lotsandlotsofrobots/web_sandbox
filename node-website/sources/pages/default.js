exports.render = function(request, response, rootdir) {
  var path = request.path
  if (path === '/') {
      path = "index"
  }

  console.log("trying to compile: " + rootdir + '/sources/jade/' + path + '.jade')
  //var html = require('jade').compileFile(rootdir + '/sources/jade/' + path + '.jade')({ title : '' })
  response.render(rootdir + '/sources/jade/' + path + '.jade')
  //return html
}
