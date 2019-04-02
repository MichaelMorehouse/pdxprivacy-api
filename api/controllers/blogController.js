const mongoose = require('mongoose'),
	BlogPost = require('../db/models/blogPostModel')

exports.readAll = async function (req, res) {
	try {
		let posts = await BlogPost.find({})
		res.send({ posts })
	} catch (err) {
		res.send({ error: 'Error retrieving content' })
	}
}

exports.read = async function (req, res) {
	try {
		let post = await BlogPost.findById(req.params.blogPostId)
		res.json(post)
	} catch (err) {
		res.send({ error: 'Error retrieving content' })
	}
}

exports.create = async function (req, res) {
	try {
		let newPost = new BlogPost(req.body)
		let post = await newPost.save()
		res.json({ post })
	} catch (err) {
		res.send({ error: 'Error creating content' })
	}
}

exports.update = async function (req, res) {
	try {
		let post = await BlogPost.findOneAndUpdate({
			_id: req.params.blogPostId
		}, req.body, { new: true })
		res.json(post)
	} catch (err) {
		res.send({ error: 'Error updating content' })
	}
}

exports.delete = async function (req, res) {
	try {
		await BlogPost.deleteOne({ _id: req.params.blogPostId })
		res.json({ message: 'Post successfully deleted' })
	} catch (err) {
		res.send({ error: 'Error deleting content' })
	}
}
