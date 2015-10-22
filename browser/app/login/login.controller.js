'use strict';

app.controller('LoginCtrl', function ($scope, AuthFactory) {

	$scope.user;

	$scope.login = function (credentials) {
		AuthFactory.login(credentials)
		.then(function(user){
			$scope.user = user;
		})
	}
	
})