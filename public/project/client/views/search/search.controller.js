(function(){
	angular
		.module("FinalProject")
		.controller("SearchController", SearchController);
		
	function SearchController($location, $routeParams, $rootScope, PostService, UserService){
		var model = this;
		model.search = search;
		model.showAllUsers = showAllUsers;
		
		if ($routeParams.tag) {
			model.searchText = $routeParams.tag;
			search();
		}

		function search() {
			var tags = model.searchText.split(" ");
			
			PostService.findPostsByTag(tags[0].toLowerCase()).then(function(posts){
				model.results = posts;
				
				for (var i = 1; i < tags.length; i++) {
					PostService.findPostsByTag(tags[i].toLowerCase()).then(function(posts){
						for (var i = 0; i < posts.length; i++) {
							if (!isArrayElement(model.results, posts[i])) {
								model.results.push(posts[i]);
							}
						}
					});
				}
			});
		}
		
		function isArrayElement(arr, post) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i]._id == post._id) {
					return true;
				}
			}
			return false;
		}
		
		function showAllUsers() {
			if ($rootScope.currentUser.isModerator) {
				UserService.findAllUsers().then(function(response){
					model.users = response;
				});
			} else {
				$location.url("/home");
			}
		}
	}
})();