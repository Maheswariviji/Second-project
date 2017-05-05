angular.module('cabApp').controller('LoginController', function($scope, $http, AuthenticationService, $location) {


var driver = function () {
        $http.get('/der/der').success(function (response) {
            console.log('drivers details readed');
            $scope.driverlist = response;
            $scope.driver = "";
        });
    };
 driver();


$scope.driverlogin=function(){
    AuthenticationService.driverlogin($scope.driver, function(response) {
            if (response.data.success === true ) {
                $location.path('/driverpage');
            }
});
};

var getloc=function(){
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (p) {
        var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
        alert(p.coords.latitude);
        alert(p.coords.longitude);

        var mapOptions = {
            center: latlng,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("dvMap"), mapOptions);
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            draggable: true ,
            title: "<div style = 'height:60px;width:200px'><b>Your location:</b><br />Latitude: " + p.coords.latitude + "<br />Longitude: " + p.coords.longitude
        });


        google.maps.event.addListener(marker, "click", function (e) {
            var infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);

        });
    });


} else {
    alert('Geo Location feature is not supported in this browser.');
}
}

    $scope.Login = function() {

        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true && response.data.userDetail.Role =='Customer' ) {
                getloc();
                $location.path('/userpg');
            }
            else if (response.data.success === true && response.data.userDetail.Role =='Admin') {
                $location.path('/admin');
            }
            else if (response.data.success === true && response.data.userDetail.Role =='Driver' ) {
                $location.path('/Driver');
            }
            else
            {
                alert("please Enter valid Credentials");
            }
        });
    };



    $scope.Logout=function()
    {
        AuthenticationService.Logout(function(response)
        {
            if(response.data.success===true)
            {
                alert("Thanking you using Anytime Cab");
            }
        })
    }
    $scope.log=true;
$scope.custlog=false;
$scope.driverlog=false;

$scope.usercancel=function()
{
    $location.path('/');
}


$scope.cancel=function()
{
    $location.path('/');
}


$scope.dlogin=function(){
    if($scope.driverlog==false)
    {
$scope.driverlog=true;
    $scope.log=false;
    $scope.custlog=false;
 }

}
$scope.custlogin=function()
{
      if($scope.custlog==false)
    {
$scope.custlog=true;
    $scope.log=false;
    $scope.driverlog=false;
 }


}



})
