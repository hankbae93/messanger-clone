const Message = require("../models/Message");

const router = require("express").Router();

// 메세지 보내기
router.post("/", async (req, res) => {
	const newMessage = new Message(req.body);
	try {
		const savedMessage = await newMessage.save();
		res.status(200).json(savedMessage);
	} catch (err) {
		res.status(500).json(err);
	}
});

// 해당 id 채팅방 메세지 가져오기
router.get("/:conversationId", async (req, res) => {
	try {
		const message = await Message.find({
			conversationId: req.params.conversationId,
		});
		res.status(200).json(message);
	} catch (err) {
		res.status(500).json(err);
	}
});

module.exports = router;
