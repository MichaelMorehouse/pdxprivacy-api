'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  email: {
    type: String,
    required: 'You must use an email address'
  },
  id: {
    type: [{
      type: String,
      required: 'Id required'
    }],
    dateRegistered: {
        type: Date,
        default: Date.now
    }
  }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);