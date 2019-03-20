var user = require('./userRoutes')
var blog = require('./blogRoutes')
let routes = [
	user,
	blog
]

module.exports = function (app) {
	for (let i = 0; i < routes.length; i++){
		app.route(routes[i])
	}
}