var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('hey')
  res.render('index', { title: 'Express' });
});
module.exports = router;


var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

router.post('/register', function(req, res, next){
	console.log(req)
});

router.post('/login', function(req, res, next){
	if (!req.body.email || !req.body.password){
		 return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT()});
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});