var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	userModel = require('./api/models/userModel')

// Express initilization
var app = express(),
	port = process.env.PORT || 8080

// // mongoose instance connection url connection
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/pdxp', {
	useNewUrlParser: true
})

// Middlewares
app.use(bodyParser.urlencoded({
	extended: true,
}))

app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.status(404).send({
//         url: req.originalUrl + ' not found'
//     })
// });

// Route registration

var routes = require('./api/routes')
routes(app)

// Server initilization
app.listen(port)

console.log('PDX Privacy API server started on: ' + port)