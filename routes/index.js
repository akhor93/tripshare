var SH = require("../lib/session_helper");
// var async = require('async');

exports.home = function(req, res){
	SH.getSessionData(req.session.user, true, function(data) {
		res.render('index', data);
	});
};