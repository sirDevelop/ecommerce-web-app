const keys = require('../config/keys');

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			// clientID: keys.googleClientID,
			// clientSecret: keys.googleClientSecret,
			clientID: "839198421488-v0i410v2es57qcs26ch7q46j410mdont.apps.googleusercontent.com",
			clientSecret: "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",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
