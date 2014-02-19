var SH = require("../lib/session_helper");
//Models
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Trip = mongoose.model('Trip');

var allData = require('../data.json');
exports.show = function(req, res) {
	var tripID = req.params.id;
	data = {};
  data = SH.getSessionData(req.session.user);
  Trip.findById(tripID)
  .populate('user likes favorites tags comments')
  .lean()
  .exec(function(err, trip) {
    if(err) {
      console.log("Could not find trip: " + tripID);
      res.redirect('/');
    }
    else {
      data.trip = trip;
      trip.num_likes = trip.likes.length;
      trip.num_favorites = trip.favorites.length;
      trip.num_tags = trip.tags.length;
      trip.num_comments = trip.comments.length;
      res.render('trip/show', data);
    }
  });
}

exports.create = function(req, res) {
	//Get Moment library
	var trip = new Trip({
		user       : req.session.user.id,
    title      : req.param('title'),
    location   : req.param('location'),
    description: req.param('description'),
  });
  trip.save(function(err) {
  	if(err) {
  		console.log("ERROR Saving trip");
  		res.send("Error saving trip", 400);
  	}
  	else {
  		res.redirect('trip/' + trip.id);
  	}
  })
  
}