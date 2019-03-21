'use strict'
var mongoose = require('mongoose'),
	bcrypt = require('bcrypt')
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
	password: {
		type: String,
		required: 'You must provide a password'
	},
	dateRegistered: {
		type: Date,
		default: Date.now
	},
	roles: {
		type: [String],
		default: 'User',
		enum: ['Admin', 'Author', 'User']
	}
})

// On save hook, encrypt password
// Before saving a model, run this function
UserSchema.pre('save', function (next) {
	// access user model
	const user = this

	// generates a salt, hashes password and
	// replaces user password with password hash
	bcrypt.hash(user.password, 10)
		.then(hash => {
			user.password = hash
			next()
		})
		.catch(err => next(err))

	// bcrypt.genSalt(10)
	// 	.then(salt => {
	// 		bcrypt.hash(user.password, salt)
	// 			.then(hash => {
	// 				user.password = hash
	// 				next()
	// 			})
	// 			.catch(err => next(err))
	// 	})
	// 	.catch(err => next(err))
})

// Hashes provided password credentials 
// and compares to stored password hash
UserSchema.methods.comparePassword = function (providedPassword, callback) {

	bcrypt.compare(myPlaintextPassword, hash)
		.then(function (res) {
			// res == true
		})
		.catch(err => next(err))

	bcrypt.compare(providedPassword, this.password, function (err, isMatch) {
		if (err) return callback(err)
		callback(null, isMatch)
	})
}

module.exports = mongoose.model('User', UserSchema)