var routes = require('i40') (),
    fs = require('fs'),
    mime = require('mime');

module.exports = {
  splat: function (req, res, url) {
    res.setHeader('Content-Type', mime.lookup(req.url))
    fs.readFile('.' + req.url, function (err, file) {
      if (err) {
        res.setHeader('Content-Type', 'text/html')
        res.end('404')
      }
      res.end(file)
    })
  }
}// final curly brace
