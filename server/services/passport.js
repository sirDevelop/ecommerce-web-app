const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			// clientID: keys.googleClientID,
			// clientSecret: keys.googleClientSecret,
			clientID: process.env.googleClientID,
			clientSecret: process.env.googleClientSecret,
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
