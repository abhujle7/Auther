app.factory("AuthFactory", function($http){

	var AuthFactory = {};

 AuthFactory.signup = function(credentials){
 	return $http.post("/api/users", credentials)
 		.then(function(newuser){
 			return newuser;
 		})

	}

 AuthFactory.login = function(credentials){
 	return $http.post("/api/users/login", credentials)
 		.then(function(user){
 			return user;
 		})
 }

 AuthFactory.logOut = function(){
 	console.log("Hit auth factory");
 	return $http.put("/api/users/logout")
 }

 return AuthFactory;




})