// const passport = require('passport');

// module.exports = app => {
//   app.get(
//     '/google',
//     passport.authenticate('google', {
//       scope: ['profile', 'email']
//     })
//   );

//   app.get(
//     '/google/callback',
//     passport.authenticate('google'),
//     (req, res) => {
//       res.redirect('/surveys');
//     }
//   );

//   app.get('/api/logout', (req, res) => {
//     req.logout();
//     res.redirect('/');
//   });

//   app.get('/api/current_user', (req, res) => {
//     res.send(req.user);
//   });
// };


const router = require("express").Router();
const passport = require("passport");

// verify user logged in
router.get("/login/success", (req, res) => {
	if (req.user) {
		res.status(200).json({
			error: false,
			message: "Successfully Loged In",
			user: req.user,
		});
	} else {
		res.status(403).json({ error: true, message: "Not Authorized" });
	}
});

// in case login failed or cookies expired
router.get("/login/failed", (req, res) => {
	res.status(401).json({
		error: true,
		message: "Log in failure",
	});
});

// login proccess
router.get(
	"/google/callback",
	passport.authenticate("google", {
		successRedirect: "http://localhost:3000",
		failureRedirect: "/login/failed",
	})
);

router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("http://localhost:3000");
});


router.get("/google", passport.authenticate("google", ["profile", "email"]));

module.exports = router;