var user = require('./userRoutes')
var blog = require('./blogRoutes')

var routes = [
	user,
	blog
]

module.exports = function (app) {
	for (var i = 0; i < routes.length; i++) {
		routes[i](app)
	}
}