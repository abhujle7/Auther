var session = require("express-session");
var genuuid = require("uid2"); 
var router = require("express").Router();

router.use(session({

	secret: "snapekillsdumbledore",
	// cookie: {secure: true}

}));

module.exports = router;