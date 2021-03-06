const router = require('express').Router(),
	user = require('../controllers/userController'),
	blog = require('../controllers/blogController'),
	passport = require('passport')

// Import strategies from passport service
require('../services/passport')

const requireLogin = passport.authenticate('local', { session: false }),
	requireToken = passport.authenticate('jwt', { session: false })

module.exports = function (app) {
	router.route('/blog')
		.get(blog.readAll)
		.post(blog.create)

	router.route('/blog/:blogPostId')
		.get(blog.read)
		.put(blog.update)
		.delete(blog.delete)
	// Require all routes to have /api prefix
	// app.use('/api', routes)

	// Routes with special middleware requirements
	// /signup route requires no authentication
	// /login route requires local passport authentication
	router.post('/signup', user.signup)
	router.post('/login', requireLogin, user.login)

	// Use requireToken middleware for all other routes
	router.use(/\/.*/, requireToken)
	// Additional routes requiring tokens
	// must be placed below
	router.post('/changepassword', user.changePassword)

	app.use('/', router)
}