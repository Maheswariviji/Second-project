angular.module('cabApp').controller('DriverController', function($scope, $http, $rootScope,$location,$cookies,AuthenticationService) {
var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
          console.log(loggedInUser.email);
          document.getElementById("username").innerHTML=loggedInUser.fname;
          document.getElementById("pno").innerHTML=loggedInUser.mobile; }



var latitude,longitude,lat,long,lat1;
var map;
var marker;

var socket=io();


initialize();

function initialize(){

if (navigator.geolocation)
 {
 navigator.geolocation.getCurrentPosition(function (p)
  {
  var latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
  var geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();

var mapOptions = {
zoom: 18,
center: latlng,
mapTypeId: google.maps.MapTypeId.ROADMAP
};

map = new google.maps.Map(document.getElementById("myMap"), mapOptions);

marker = new google.maps.Marker({
map: map,
position: latlng,
draggable: true
});

geocoder.geocode({'latLng': latlng }, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if (results[0]) {
$('#latitude,#longitude').show();
$('#address').val(results[0].formatted_address);
$('#latitude').val(marker.getPosition().lat());
$('#longitude').val(marker.getPosition().lng());
 lat=document.getElementById("latitude").value;

  long=document.getElementById("longitude").value;

infowindow.setContent("Your Location");
infowindow.open(map, marker);
details();
}
}
});

google.maps.event.addListener(marker, 'dragend', function() {

geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if (results[0]) {
$('#address').val(results[0].formatted_address);
$('#latitude').val(marker.getPosition().lat());
$('#longitude').val(marker.getPosition().lng());
lat=document.getElementById("latitude").value;
  alert(lat);

  long=document.getElementById("longitude").value;

infowindow.setContent("Your Location");
infowindow.open(map, marker);
details();
}
}
});
});

});

}
else
{
  alert('Geo Location feature is not supported in this browser.');
}

// driver details
var i;

}

var details=function()
{

  $http.get('/der/der').success(function (response) {
            console.log('drivers details readed');
            $scope.driverlist = response;
            $scope.driver = "";
            console.log(lat);
            console.log(long);
 for(k=0;k<$scope.driverlist.length;k++)
                      {
                      if($scope.driverlist[k].Email==loggedInUser.email)
                      {
                      name=$scope.driverlist[k].FirstName;
                      cabType=$scope.driverlist[k].carType;
                      document.getElementById("car").innerHTML=cabType;
                      contactno=$scope.driverlist[k].Mobile;

                      carno=$scope.driverlist[k].carNumber;
                       document.getElementById("dcar").innerHTML=carno;
                      carname=$scope.driverlist[k].carName;
                      document.getElementById("dar").innerHTML=carname;
                      email=$scope.driverlist[k].Email;
                      document.getElementById("mid").innerHTML=email;

                      socket.emit('driverinfo',{
                     loc:{lati:lat,longi:long},
                 Dname:name,
                      cab:cabType,
                      No:contactno,
                      cno:carno,
                      cname:carname,
                      mail:email
                      });
                      }
                      }
        });
}
var name,amt,ploc,dloc,no,email,type,dt,time1,userid,bkid,ttype,usermailid;
socket.on('CustomerMessage',function(data){
  var modal = document.getElementById('myModal');
   console.log(data);
   if(data!=null)
   {
     modal.style.display = "block";
  console.log(data.messageId);
    document.getElementById("bid").innerHTML=data.message.bid;
  document.getElementById("name").innerHTML=data.message.name;
  document.getElementById("amt").innerHTML=data.message.Amount;
    document.getElementById("pick").innerHTML=data.message.source;
  document.getElementById("Drop").innerHTML=data.message.Destination;
    document.getElementById("no").innerHTML=data.message.No;
  usermailid=data.message.mail;
  name=data.message.name;
  amt=data.message.Amount;
  ploc=data.message.source;
  dloc=data.message.Destination;
  no=data.message.No;
  email:data.message.mail;
  type=data.message.cabType;
  dt=data.message.bkdate;
  time1=data.message.time;
  userid=data.messageId;
  bkid=data.message.bid;
  ttype=data.message.triptype;




}

});

var bill=function(){
  $http.get('/cabassign/cabassign').success(function (response) {
        $scope.billlist=response;
        $scope.bill={};

      });
}
bill();
$scope.accept=function(){

console.log(carno);
console.log(carname);
console.log(contactno);

socket.emit('confirmationmsg',
{
  Drivername:loggedInUser.fname,
  amount:amt,
  frmloc:ploc,
  toloc:dloc,
  custno:no,
  custmail:email,
  cno:carno,
  name:carname,
  dno:loggedInUser.mobile,
  uid:userid,
  bid:bkid


})

$scope.bill.bookingID=bkid;
$scope.bill.cabType=type;
$scope.bill.pickupLoc=ploc;
$scope.bill.dropLoc=dloc;
$scope.bill.tripType=ttype
$scope.bill.Name=name;
$scope.bill.phoneNo=no;
$scope.bill.mailId=usermailid;
$scope.bill.DriverName=loggedInUser.fname
$scope.bill.carNo=carno;
$scope.bill.carName=carname;
$scope.bill.DriverNo=loggedInUser.mobile
$scope.bill.Date=dt;
$scope.bill.Time=time1;
$scope.bill.Amount=amt;
$scope.bill.Drmail=loggedInUser.email;

console.log($scope.bill);
$http.post('/cabassign/cabassignnow',  $scope.bill).success(function (response) {
console.log(response);
});
$location.path('/');
};

$scope.Logout=function()
    {
        AuthenticationService.Logout();
         $location.path('/');
          alert("Thanking you using Anytime Cab");
    }
});
