const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy

// Local strategy
const localOptions = { usernameField: email }

const localStrategy = new LocalStrategy(localOptions,
	function (email, password, done) {
		User.findOne({ email: email })
			.then(user => {
				if (!user) done(null, false)
				if (!user.verifyPassword(password)) done(null, false)
				done(null, user)
			})
			.catch(err => done(err))
	})

passport.use(localStrategy)