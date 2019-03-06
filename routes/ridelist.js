var express = require('express');
var ridelistCtrl = require('../controllers/ridelistCtrl');
var router = express.Router();

router.get('/',function(req,res,next) {
	ridelistCtrl.filter(req,res,next);
});

module.exports = router;