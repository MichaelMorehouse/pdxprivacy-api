const User = require('../db/models/userModel'),
	jwt = require('../services/jwt')

exports.login = async function (req, res, next) {
	try {
		// User has already been authenticated by passport
		// We just need to give them a token
		let token = await jwt.tokenForUser(req.user)
		res.send({ token })
	} catch (err) {
		res.json({ error: 'Unable to login' })
	}
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

exports.changePassword = async function (req, res, next) {
	const password = req.body.password,
		newPassword = req.body.newPassword

	try {
		// Request must have old and new passwords
		if (!password || !newPassword)
			return res.status(422).send({ error: 'You must provide old and new passwords' })

		let isMatch = await req.user.verifyPassword(password)
		if (!isMatch)
			return res.status(422).send({ error: 'Incorrect credentials' })

		// If old password is correct, set to new password
		req.user.password = newPassword
		let user = await req.user.save()
		let token = await jwt.tokenForUser(user)
		res.send({ token })

	} catch (err) {
		res.send({ error: 'Problem changing password' })
	}
}