const User = require('../db/models/userModel'),
	jwt = require('../services/jwt')

exports.login = function (req, res, next) {
	// User has already been authenticated by passport
	// We just need to give them a token
	jwt.tokenForUser(req.user)
		.then(token => {
			res.send({ token })
		})
		.catch(err => res.json({ error: 'Unable to generate token' }))
}

exports.signup = async function (req, res, next) {
	const email = req.body.email,
		password = req.body.password

	if (!email || !password) {
		return res.status(422).send({ error: 'You must provide email and password' })
	}

	try {
		let existingUser = await User.findOne({ email: email })

		if (existingUser) {
			return res.status(422).send({ error: 'Email is in use' })
		}

		const newUser = new User(req.body)
		let user = await newUser.save()
		let token = await jwt.tokenForUser(user)
		res.send({ token })

	} catch (err) {
		res.json({ error: 'Problem registering user' })
	}
}

exports.changePassword = function (req, res, next) {
	const password = req.body.password,
		newPassword = req.body.newPassword

	if (!password || !newPassword) {
		return res.status(422).send({ error: 'You must provide old and new passwords' })
	}

	// with stored hashed user password
	req.user.verifyPassword(password, function (err, isMatch) {
		if (err) next(err)
		if (!isMatch) return res.status(422).send({ error: 'Incorrect credentials' })
		req.user.password = newPassword
		req.user.save()
			.then(user => {
				jwt.tokenForUser(user)
					.then(token => {
						res.send({ token })
					})
					.catch(err => res.json({ error: 'Unable to generate token' }))
			})
			.catch(err => next(err))
	})
}