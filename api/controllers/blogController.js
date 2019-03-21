'use strict'
var mongoose = require('mongoose'),
	BlogPost = mongoose.model('BlogPost')

exports.listAll = function (req, res) {
	BlogPost.find({}, function (err, blogPost) {
		if (err) res.send(err)
		res.json(blogPost)
	})
}

exports.create = function (req, res) {
	var newBlogPost = new BlogPost(req.body)
	newBlogPost.save(function (err, blogPost) {
		if (err) res.send(err)
		res.json(blogPost)
	})
}

exports.read = function (req, res) {
	BlogPost.findById(req.params.blogPostId, function (err, blogPost) {
		if (err) res.send(err)
		res.json(blogPost)
	})
}

exports.update = function (req, res) {
	BlogPost.findOneAndUpdate(
		{
			_id: req.params.blogPostId
		},
		req.body,
		{
			new: true
		},
		function (err, blogPost) {
			if (err) res.send(err)
			res.json(blogPost)
		}
	)
}

exports.delete = function (req, res) {
	BlogPost.remove(
		{
			_id: req.params.blogPostId
		},
		function (err, blogPost) {
			if (err) res.send(err)
			res.json({
				message: 'BlogPost successfully deleted'
			})
		}
	)
}
