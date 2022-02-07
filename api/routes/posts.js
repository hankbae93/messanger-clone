const Post = require("../models/Post");

const router = require("express").Router();

// 포스트 생성
router.post("/", async (req, res) => {
	const newPost = new Post(req.body);

	try {
		const savedPost = await newPost.save();
		res.status(200).json(savedPost);
	} catch (error) {
		res.status(500).json(error);
	}
});

// 포스트 업데이트
router.put("/:id", async (req, res) => {
	try {
		// 해당 아이디 가진 게시글 찾기
		const post = await Post.findById(req.params.id);

		// 해당 데이터의 작성자가 맞는지 서로 비교
		if (post.userId === req.body.userId) {
			await post.updateOne({ $set: req.body });
			res.status(200).json("포스트 수정 완료");
		} else {
			res.status(403).json("작성자만 업데이트할 수 있습니다.");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// 포스트 업데이트
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (post.userId === req.body.userId) {
			await post.deleteOne();
			res.status(200).json("포스트 삭제 완료");
		} else {
			res.status(403).json("작성자만 삭제할 수 있습니다.");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;
