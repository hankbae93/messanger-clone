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

// 팔로우
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);

			if (!user.followers.includes(req.body.userId)) {
				await user.updateOne({ $push: { followers: req.body.userId } });
				await currentUser.updateOne({ $push: { followings: req.params.id } });
				res.status(200).json("팔로우되셨습니다.");
			} else {
				res.status(403).json("이미 팔로우한 유저입니다.");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("자기 자신을 팔로우할 수 없습니다.");
	}
});

// 언팔로우
router.put("/:id/follow", async (req, res) => {
	if (req.body.userId !== req.params.id) {
		try {
			const user = await User.findById(req.params.id);
			const currentUser = await User.findById(req.body.userId);

			if (user.followers.includes(req.body.userId)) {
				await user.updateOne({ $pull: { followers: req.body.userId } });
				await currentUser.updateOne({ $pull: { followings: req.body.userId } });
				res.status(200).json("언팔로우되셨습니다.");
			} else {
				res.status(403).json("팔로우하고 있지 않습니다.");
			}
		} catch (error) {
			res.status(500).json(error);
		}
	} else {
		res.status(403).json("자기 자신을 팔로우할 수 없습니다.");
	}
});

module.exports = router;
