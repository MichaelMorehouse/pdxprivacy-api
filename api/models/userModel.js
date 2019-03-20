'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
	userName: {
		type: String,
		required: 'You must provide a username'
	},
	email: {
		type: String,
		required: 'You must use an email address'
	},
	dateRegistered: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model('User', UserSchema)