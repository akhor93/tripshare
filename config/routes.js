//Modules
var AM = require("../modules/account-manager");

//Controllers
var index = require('../routes/index');
var search = require('../routes/search');
var sessions = require('../routes/sessions');
var users = require('../routes/users');
var admin = require('../routes/admin');

//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');

// var helpers = require('../helpers/handlebar_helpers');

module.exports = function (app) {
	//HOME
	app.get('/', index.home);

	//TRIPS
	app.get('/trips', index.trips);

	//USERS
	app.get('/user', users.show);

	//Session
	app.post('/signup', sessions.signup);
	app.post('/login', sessions.login);
	app.post('/signout', sessions.signout);

	//Followers
	app.get('/followers', index.followers);

	//Search
	app.get('/search', search.search);

	//Testing/Admin
	app.get('/admin', admin.dashboard);
	app.get('/print', admin.print);
	app.get('/reset', admin.reset);
};