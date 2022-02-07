const User = require("../models/User");
const bcrypt = require("bcrypt");

const router = require("express").Router();

// 유저 정보 업데이트하기
router.put("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		// request에서 보낸 비밀번호 해쉬화하기
		if (req.body.password) {
			try {
				const salt = await bcrypt.genSalt(10);
				req.body.password = await bcrypt.hash(req.body.password, salt);
			} catch (error) {
				return res.status(500).json(error);
			}
		}
		// DB 조회하기
		try {
			const user = await User.findByIdAndUpdate(req.params.id, {
				$set: req.body,
			});
			res.status(200).json("정보가 업데이트되었습니다.");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("당신의 정보만 업데이트할 수 있습니다.");
	}
});

// 유저 정보 삭제하기
router.delete("/:id", async (req, res) => {
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			await User.findByIdAndDelete(req.params.id);
			return res.status(200).json("계정이 삭제되셨습니다.");
		} catch (error) {
			return res.status(500).json(error);
		}
	} else {
		return res.status(403).json("당신의 정보만 삭제할 수 있습니다.");
	}
});

// 유저 정보 조회하기
router.get("/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const { password, updatedAt, ...others } = user._doc; // mysql의 squelize에서 exclude하듯이 제외가능

		res.status(200).json(others);
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
