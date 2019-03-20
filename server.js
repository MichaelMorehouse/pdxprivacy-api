var express = require('express')

var app = express ()
port = process.env.PORT || 8080

app.listen(port)

console.log('PDX Privacy API server started on: ' + port)