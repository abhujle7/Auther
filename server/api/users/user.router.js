'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');
var passport = require('passport');


router.param('id', function (req, res, next, id) {
	User.findById(id).exec()
	.then(function (user) {
		if (!user) throw HttpError(404);
		req.requestedUser = user;
		next();
	})
	.then(null, next);
});


router.get('/', function (req, res, next) {
	User.find({}).exec()
	.then(function (users) {
		res.json(users);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		res.status(201).json(user);
	})
	.then(null, next);
});

// //google authentication and login 
// router.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// // handle the callback after google has authenticated the user
// router.get('/auth/google/callback',
//   passport.authenticate('google', {
//     successRedirect : '/home',
//     failureRedirect : '/'
//   }));

router.put('/logout', function(req, res, next){
	console.log("Hit logout");
	if(req.session && req.session.userId){
		console.log(req.session);
		delete req.session["userId"];
		console.log(req.session);
		res.status(200).end();
	}
})

router.post('/login', function(req, res, next){
	User.find({ email: req.body.email, password: req.body.password })
		.then(function(user){
			if(user.length){
				if(req.session && !req.session.userId){
					req.session.userId = user[0]._id;
				}
				res.status(200).end();
			} else {
				res.status(401).end();
			}
		})
})


router.get('/:id', function (req, res, next) {
	req.requestedUser.getStories()
	.then(function (stories) {
		var obj = req.requestedUser.toObject();
		obj.stories = stories;
		res.json(obj);
	})
	.then(null, next);
});


router.put('/:id', function (req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});


module.exports = router;