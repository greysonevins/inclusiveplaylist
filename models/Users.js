var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  spotifyId   : {type: String, unique: true},
  email       : String,
  followers   : Number,
  profileUrl  : String,
  displayName : String,
  accessToken : String,
  refreshToken: String,
  createdPlaylists: Array,
  profilePhoto: String
});



mongoose.model('User', UserSchema);
