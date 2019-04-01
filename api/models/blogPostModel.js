const mongoose = require('mongoose'),
	Schema = mongoose.Schema

var BlogPostSchema = new Schema({
	title: {
		type: String,
		required: 'Please enter a title'
	},
	createdDate: {
		type: Date,
		default: Date.now
	},
	content: {
		type: String,
		required: 'Please enter some content'
	}
})

module.exports = mongoose.model('BlogPost', BlogPostSchema)