var app = angular.module('cabApp', ['ngRoute', 'ngCookies', 'ngStorage']);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'views/Home.html',
        controller: 'HomeController'

    }).when('/Register', {
        templateUrl: 'views/Register.html',
        controller: 'RegisterController'
    }).when('/admin', {
        templateUrl: 'views/admin.html',
        controller:'adminController'
    }).when('/booking', {
        templateUrl: 'views/booking.html',
        controller:'bookingController'
       }) .when('/contactus', {
        templateUrl: 'views/contactus.html'

    }).when('/userpg',{
      templateUrl:'views/userpg.html',
      controller:'userController'
    }).when('/Driver',{
      templateUrl:'views/Driver.html',
      controller:'DriverController'
    }).when('/unapproved',{
      templateUrl:'views/unapproved.html'
    });
});

app.run(function($rootScope, $http, $location, $sessionStorage, $cookies) {
    if ($sessionStorage.tokenDetails) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }


    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/', '/Register','/contactus','/unapproved'];
        var driverPages=['/','/Driver'];
        var userpages=['/','/booking','/userpg'];
        var adminpg=['/','/admin'];

        var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
 }

        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/');
        }
        else{
          if (authUser != undefined) {
                       if(authUser.currentUser.userInfo.rol==='Driver'){
                         var Driver = driverPages.indexOf($location.path()) === -1;
                         if(Driver){
                           $location.path('/unapproved');
                         }

                       }
                       if(authUser.currentUser.userInfo.rol==='Admin'){
                         var User = adminpg.indexOf($location.path()) === -1;
                         if(User){
                           $location.path('/unapproved');
                         }

                       }
                       if(authUser.currentUser.userInfo.rol==='Customer'){
                         var Customer = userpages.indexOf($location.path()) === -1;
                         if(Customer){
                           $location.path('/unapproved');
                         }

                       }
            }

        }
    });
});



app.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [],
          keys = [];

      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key);
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});




app.directive('jqdatepicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
         link: function (scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'dd/mm/yy',
                 minDate: 0,
                maxDate: "2D",
                onSelect: function (date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});
