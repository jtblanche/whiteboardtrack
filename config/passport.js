var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var axios = require('axios');
require('dotenv').config();


var User = require("./models/user.js");
var db = require('../models');

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
	// Our user will sign in using an email, rather than a "username"
	{
		usernameField: "email"
	},
	function (email, password, done) {
		// When a user tries to sign in this code runs
		axios.post(process.env.API_URL + process.env.LOGIN_PATH, {
			email,
			password
		}).then(({
			data
		}) => {
			if (data.success === true) {
				console.log('\r\n\r\n\r\n');
				console.log('data');
				console.log('\r\n\r\n\r\n');
				console.log(JSON.stringify(data, null, 2));
				console.log('\r\n\r\n\r\n');
				axios.get(process.env.API_URL + process.env.ME_PATH, {
					headers: {
						authtoken: data.authenticationInfo.authToken,
						'Content-Type': 'application/json'
					}
				}).then(({
					data: me
				}) => {
					console.log('\r\n\r\n\r\n');
					console.log('me');
					console.log('\r\n\r\n\r\n');
					console.log(JSON.stringify(me, null, 2));
					console.log('\r\n\r\n\r\n');
					db.User.findOne({
						where: {
							bcsId: data.authenticationInfo.userId
						}
					}).then(function (dbUser) {
						console.log(dbUser);
						if (!dbUser) {
							var newUser = new User(email, data.authenticationInfo.authToken, me.userAccount.githubUserName, me.userAccount.avatarUrl, data.authenticationInfo.userId);
							newUser.createDatabaseUser().then(() => done(null, newUser));
						} else {
							done(null, new User(email, data.authenticationInfo.authToken, me.userAccount.githubUserName, me.userAccount.avatarUrl, data.authenticationInfo.userId, dbUser.id, dbUser.acceptedAgreement));
						}
					}, function (err) {
						console.log(err);
						done(null, false, {
							message: "Server error, try again later."
						})
					});
				})
			} else {
				console.log(data);
				done(null, false, {
					message: "Incorrect email or password."
				})
			}
		}).catch(error => {
			console.log(error);
			return done(null, false, {
				message: "Server error, please try again later."
			})
		});
	}
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
	cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
	cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;