angular.module('cabApp').controller('RegisterController', function($scope, $http,$location) {
    $scope.RegisterUser = function() {
    	 $scope.User.Role="Customer";
        console.log($scope.User);
        $http.post('/api/signup', $scope.User).then(function(response) {
        	$scope.User=""
            alert(' Register Successfully Please Login');
            $location.path('/');
        });
    }


});