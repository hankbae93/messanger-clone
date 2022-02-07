const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
	try {
		// 비밀번호 새로 해쉬화하기
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);

		// User 데이터 생성
		const newUser = new User({
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
		});

		// 데이터 저장 및 전송
		const user = await newUser.save();
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
	}
});

// Login
router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		!user && res.status(404).json("User Not Found");

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		!validPassword && res.status(400).json("Wrong Password");

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
	}
});

module.exports = router;
