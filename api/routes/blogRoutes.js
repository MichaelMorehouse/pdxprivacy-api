module.exports = function (app) {
	var blog = require('../controllers/blogController')

	app.route('/blog')
		.get(blog.readAll)
		.post(blog.create)

	app.route('/blog/:blogPostId')
		.get(blog.read)
		.put(blog.update)
		.delete(blog.delete)
}