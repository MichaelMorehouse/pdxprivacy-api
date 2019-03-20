'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BlogPostSchema = new Schema({
  title: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  content: {
    type: [{
      type: String,
      required: 'A blog post must have content'
    }],
    default: ['Type away...']
  }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);