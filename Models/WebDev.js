const mongoose = require('mongoose');

const webdevSchema = new mongoose.Schema({
  title: { type: String },
  text: { type: String },
  image: { type: String }
});

const WebDev = mongoose.model('WebDev', webdevSchema);

module.exports = WebDev;