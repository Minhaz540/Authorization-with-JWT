const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signupGetController = async (req, res, next) => {
	res.send("This is signup get controller");
};

exports.signupPostController = async (req, res, next) => {
	const { name, username, password } = req.body;
	let hashedPassword = await bcrypt.hash(password, 10);
	const newUser = new User({
		name,
		username,
		password: hashedPassword,
	});

	try {
		await newUser.save();
		res.status(200).json({
			message: "Signup is successful!",
		});
	} catch (err) {
		next(err);
	}
};

exports.loginGetController = async (req, res, next) => {
	res.send("This is login get controller");
};

exports.loginPostController = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const user = await User.findOne({ username: username });
		const { JWT_SECRET } = process.env;
		if (user && user.length != 0) {
			let match = await bcrypt.compare(password, user.password);
			if (match) {
				// generate json web token for authorization
				const token = jwt.sign(
					{
						username: user.username,
						userId: user._id,
					},
					JWT_SECRET,
					{
						expiresIn: "5h",
					}
				);
				res.status(200).json({
					message: "Login successful, welcome " + user.username,
					access_token: token,
				});
			} else {
				res.status(401).json({ message: "Invalid username or password" });
			}
		} else {
			res.status(401).json({ message: "Invalid username or password" });
		}
	} catch (err) {
		next(err);
	}
};
