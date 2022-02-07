const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("get USers");
});

module.exports = router;
