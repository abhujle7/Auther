'use strict';

app.controller('SignupCtrl', function ($scope, AuthFactory) {

	$scope.user;

	$scope.signup = function (credentials) {
		AuthFactory.signup(credentials)
			.then(function(newuser){
				$scope.user = newuser;

			})	
	}
	

})