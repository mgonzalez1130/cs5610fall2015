"use strict";

(function() {
	angular
		.module("FinalProject")
		.config(function($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "views/home/home.view.html"
				})
				.when("/democrats", {
					templateUrl: "views/posts/posts.view.html"
				})
				.when("/republicans", {
					templateUrl: "views/posts/posts.view.html"
				})
				.when("/newPost", {
					templateUrl: "views/newPost/newPost.view.html", 
					controller: "NewPostController as model"
				})
				.when("/viewPost", {
					templateUrl: "views/postDetails/postDetails.view.html",
					controller: "PostDetailsController as model"
				})
				.when("/post/:postId", {
					templateUrl: "views/postDetails/postDetails.view.html",
					controller: "PostDetailsController as model"
				})
				.when("/profile", {
					templateUrl: "views/profile/profile.view.html",
					controller: "ProfileController as model"
				})
				.when("/publicProfile/:userId", {
					templateUrl: "views/publicProfile/publicProfile.view.html",
					controller: "PublicProfileController as model"
				})
				.when("/login", {
					templateUrl: "views/login/login.view.html", 
					controller: "LoginController as model"
				})
				.when("/register", {
					templateUrl: "views/register/register.view.html",
					controller: "RegisterController as model"
				})
				.when("/search", {
					templateUrl: "views/search/search.view.html",
					controller: "SearchController as model"
				})
				.when("/search/:tag", {
					templateUrl: "views/search/search.view.html",
					controller: "SearchController as model"
				})
				.otherwise({
					redirectTo: "/home"
				})
		})
})();