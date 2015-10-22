'use strict'; 

var app = require('express')();
var path = require('path');
var passport = require('passport');

app.use(require('./logging.middleware'));

app.use(require('./session.middleware'))


app.use(passport.initialize());
app.use(passport.session());

//take a user from verification and attach to sesion
passport.serializeUser(function (user, attachThisToTheSessionSomehow) {
	attachThisToTheSessionSomehow(null, user._id)
});

//take info from session and establish req.user object
	User.findById(theThingWeAttachedToTheSession).exec()
	.then(function (user) {
		bindRequestUserObject(null, user);
	}, function (err) {
			bindRequestUserObject(err);
	});
});


app.use(function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use(function (req, res, next){
	console.log(req.session.userId);
	next();
})

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/auth', require('./auth.router'));

app.use('/api', require('../api/api.router'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;