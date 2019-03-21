var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	userModel = require('./api/models/userModel'),
	blogPostModel = require('./api/models/blogPostModel')

// Express initilization
var app = express()
// mongoose configuration
mongoose.Promise = global.Promise

// Middlewares
app.use(
	bodyParser.urlencoded({
		extended: true
	})
)
app.use(bodyParser.json())

// app.use(function (req, res) {
//     res.status(404).send({
//         url: req.originalUrl + ' not found'
//     })
// })

// Route registration

var routes = require('./api/routes')
routes(app)

// Pull connection string from env var or 
// fallback to local db during development
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pdxp'
const PORT = process.env.PORT || 8080

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true
})
	.then(() => {
		console.log('Connected to database')
		app.listen(PORT)
		console.log(`App listening on port ${PORT}`)
	})
	.catch(err => console.log(err))