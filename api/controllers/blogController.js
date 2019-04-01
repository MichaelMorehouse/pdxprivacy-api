const mongoose = require('mongoose'),
	BlogPost = mongoose.model('BlogPost')

exports.listAll = function (req, res) {
	BlogPost.find({})
		.then(blogPost => res.json(blogPost))
		.catch(err => res.send(err))
}

exports.create = function (req, res) {
	var newUser = new User(req.body)
	newUser.save()
		.then(blogPost => res.json(blogPost))
		.catch(err => res.send(err))
}

exports.read = function (req, res) {
	User.findById(req.params.blogPostId)
		.then(blogPost => res.json(blogPost))
		.catch(err => res.send(err))
}

exports.update = function (req, res) {
	User.findOneAndUpdate({
		_id: req.params.blogPostId
	},
	req.body, {
		new: true
	})
		.then(blogPost => res.json(blogPost))
		.catch(err => res.send(err))
}

exports.delete = function (req, res) {
	User.remove({
		_id: req.params.blogPostId
	})
		.then(blogPost => res.json({ message: 'Post successfully deleted' }))
		.catch(err => res.send(err))
}
