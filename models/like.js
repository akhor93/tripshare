/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/**
 * Like Schema
 */
var LikeSchema = new Schema({
	user: { type: Schema.ObjectId, ref: 'User' },
	trip: { type: Schema.ObjectId, ref: 'Trip'},
	created_at: { type: Date, default: Date.now() },
  updated_at: { type: Date, default: Date.now() }
});

/**
 * Pre-save hook
 */
LikeSchema.pre('save', function(next) {

	this.updated_at = new Date;
  if ( !this.created_at ) {
    this.created_at = new Date;
  }
  next();
});

/**
 * Methods
 */
LikeSchema.methods = {

}

/**
 * Create Object
 */
mongoose.model('Like', LikeSchema);
