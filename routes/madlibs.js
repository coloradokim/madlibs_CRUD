var routes = require('i40') (),
    fs = require('fs'),
    db = require('monk') ('localhost/createMADLIB'),
    madlib = db.get('madlib'),
    qs = require('qs'),
    view = require('mustache'),
    mime = require('mime');

module.exports = {
  new:  function (req, res, url) {
    if (req.method === 'GET') {
    res.setHeader('Content-Type', 'text/html')
      var file = fs.readFileSync('templates/madlibs/new.html')
      var template = view.render(file.toString(), {})
      res.end(template)
    }
    if (req.method === 'POST') {
      var data = ''
      req.on('data', function (chunk) {
        data += chunk
      })
      req.on('end', function() {
        var lib = qs.parse(data)
        madlib.insert(lib, function (err, doc) {
          if (err) throw err
          res.writeHead(302, {'Location': '/'})
          res.end()
        })
      })
    }
  },

  index: function (req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      madlib.find({}, function (err, docs) {
        var file = fs.readFileSync('templates/madlibs/index.html')
        var template = view.render(file.toString(), {madlib: docs})
        res.end(template)
      })
    }
  },

  show: function (req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      madlib.findOne({_id: url.params.id}, function (err, showLib) {
        var file = fs.readFileSync('templates/madlibs/show.html')
        var template = view.render(file.toString(), {madlib: showLib})
        if (err) throw err
        res.end(template)
      })
    }
  },

  edit: function (req, res, url) {
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'text/html')
      madlib.findOne({_id: url.params.id}, function(err, editLib){
        if (err) throw err
          var file = fs.readFileSync('templates/madlibs/edit.html')
          var template = view.render(file.toString(), {madlib: editLib})
          res.end(template)
      })
    }
  },

  update: function(req, res, url) {
    if (req.method === 'POST') {
    var data = ''
    req.on('data', function (chunk) {
      data += chunk
    })
    req.on('end', function () {
      var lib = qs.parse(data)
      madlib.update({_id: url.params.id}, lib, function(err, lib) {
        if (err) throw err
        res.writeHead(302, {'Location': '/'})
        res.end()
        })
      })
    }
  },

  destroy: function(req, res, url) {
   if (req.method === 'POST') {
     madlib.remove({_id: url.params.id}, function (err, doc) {
       if (err) throw err
       res.writeHead(302, {'Location': '/'})
       res.end()
     })
   }
 }

}// final curly brace
