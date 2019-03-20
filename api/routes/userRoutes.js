'use strict'
module.exports = function (app) {
	var user = require('../controllers/userController')

	app.route('/user')
		.get(user.listAll)
		.post(user.create)

	app.route('/user/:userId')
		.get(user.read)
		.put(user.update)
		.delete(user.delete)
}