var express = require('express')
var webpack = require('webpack')
var config = require('./webpack.config.dev')
var env = require('var')
var passport = require('passport')
var bodyParser = require('body-parser')
var React = require('react')
var Promise = require('bluebird')
var mongoose = require('mongoose')

var users = require('./routes/users')

mongoose.connect('mongodb://localhost/spotifyPlay')

require('./models/Users')
require('./config/passport')

var app = express()

app.use(passport.initialize())

var compiler = webpack(config)


app.use(require('webpack-dev-middleware')(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}))





app.use(require('webpack-hot-middleware')(compiler))


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.get('/auth/spotify',
  passport.authenticate('spotify', {scope: ['user-read-email', 'user-read-private', 'playlist-modify-public', 'playlist-modify-private'], showDialog: true }),
  function(req, res){
  });



app.get('/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/#/?_k=weiwlb/profile/'+req.user.spotifyId);
  });

app.get('/user/:id', function(req, res){
   var User = mongoose.model('User')
   User.findOne({'spotifyId': req.params.id}, function(err, user){
     if(err) { return res.send( err) }
     res.json( user );
   })
})
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/playlist', function(req, res, next){
  var User = mongoose.model('User')

  User.findOne({"spotifyId": req.body.author}, function(err, user){
    const madePlaylists = user.createdPlaylists
    madePlaylists.push(req.body.playlistId)
    user.createdPlaylists = madePlaylists
    user.save(function (err) {
      if(err) { return res.send( err) }
      })
    res.json(user)
   })
})

app.use(express.static(__dirname + '/dist'))

app.listen(config._hotPort, 'localhost', function (err) {
  if (err) {
    console.log(err)
  }
  console.info('==> 🌎 Listening on port %s. Open up http://localhost:%s/ in your browser.', config._hotPort, config._hotPort)
})
