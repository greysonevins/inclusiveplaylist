var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var SpotifyStrategy = require('passport-spotify').Strategy;

passport.use(new SpotifyStrategy({
    clientID: '1bd6a44f75cc4c90a331bf8fa323e621',
    clientSecret:'d689a3c831e740c196e23e44e110c8d8',
    callbackURL: "http://localhost:3000/auth/spotify/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOneAndUpdate({ spotifyId: profile.id }, {
      accessToken,
      refreshToken,
      profilePhoto: profile.photos[0],
      displayName : profile.displayName,
      email       : profile.emails[0]['value'],
      followers   : profile.followers,
      profileUrl  : profile.profileUrl
    }, {upsert: true, new:true}, function (err, user) {
      if(err) { return console.log(err) }
      return done(null, user);
      console.log(user)
    });
  }
));
