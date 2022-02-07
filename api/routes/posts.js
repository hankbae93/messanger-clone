const Post = require("../models/Post");
const User = require("../models/User");

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

// like a post
router.put("/:id/like", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post.likes.includes(req.body.userId)) {
			await post.updateOne({ $push: { likes: req.body.userId } });
			res.status(200).json("포스트 좋아요 성공");
		} else {
			await post.updateOne({ $pull: { likes: req.body.userId } });
			res.status(200).json("포스트 좋아요 취소");
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

// 게시글 상세 조회
router.get("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error);
	}
});

// 전체 게시글 타임라인 조회
router.get("/timeline/all", async (req, res) => {
	try {
		// 현재 유저 정보 가져오기
		const currentUser = await User.findById(req.body.userId);
		// 현재 유저의 작성글 찾기
		const userPosts = await Post.find({ userId: currentUser._id });
		// 현재 유저의 팔로우 리스트 멤버의 작성글 가져오기
		const friendPosts = await Promise.all(
			currentUser.followings.map((friendId) => {
				return Post.find({ userId: friendId });
			})
		);

		res.status(200).json(userPosts.concat(...friendPosts));
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
