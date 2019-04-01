const mongoose = require('mongoose'),
	User = mongoose.model('User')

exports.signup = function (req, res) {
	var newUser = new User(req.body)
	newUser.save()
		.then(user => res.json(user))
		.catch(err => res.send(err))
}

exports.login = function (req, res) {
	User.findOne({ email: req.body.email })
		.then(user => {
			user.verifyPassword(req.body.password, function (err, isMatch) {
				if (err) res.send(err)
				res.send(isMatch)
			})
		})
		.catch(err => res.send(err))
}

exports.listAll = function (req, res) {
	User.find({})
		.then(users => res.json(users))
		.catch(err => res.send(err))
}

exports.create = function (req, res) {
	var newUser = new User(req.body)
	newUser.save()
		.then(user => res.json(user))
		.catch(err => res.send(err))
}

exports.read = function (req, res) {
	User.findById(req.params.userId)
		.then(user => res.json(user))
		.catch(err => res.send(err))
}

exports.update = function (req, res) {
	User.findOneAndUpdate({
		_id: req.params.userId
	},
	req.body, {
		new: true
	})
		.then(user => res.json(user))
		.catch(err => res.send(err))
}

exports.delete = function (req, res) {
	User.remove({
		_id: req.params.userId
	})
		.then(user => res.json({ message: 'User successfully deleted' }))
		.catch(err => res.send(err))
}