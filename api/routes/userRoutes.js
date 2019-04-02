'use strict'
var user = require('../controllers/userController')

module.exports = function (app) {

	app.post('/signup', user.signup)
	app.post('/login', user.login)

	app.route('/user')
		.get(user.listAll)
		.post(user.create)

	app.route('/user/:userId')
		.get(user.read)
		.put(user.update)
		.delete(user.delete)
}