angular.module('cabApp').controller('userController', function($scope, $http, $rootScope,$location,$cookies,AuthenticationService) {
var socket = io();

$scope.now=false;
$scope.Details=false;
$scope.details1=false;
$scope.later=false;
$scope.history=false;
var drivermarker={};
  var loggedInUser;
var d=[];
var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
             loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
          console.log(loggedInUser.email);
document.getElementById("username").innerHTML=loggedInUser.fname;
           console.log(loggedInUser.mobile);

           }

var i,j,apprfare,dis,timetaken;
var extrakm,charge,tt;
var distance,duration;

var timepicker = new TimePicker('nowtime', {
  lang: 'en',
  theme: 'dark'
});

var input = document.getElementById('nowtime');

timepicker.on('change', function(evt) {

  var value = (evt.hour || '00') + ':' + (evt.minute || '00');
  evt.element.value = value;

});
var bookingcab = function () {
        $http.get('/book/book').success(function (response) {
            console.log(' booking data read');
            $scope.bookinglist = response;
            $scope.bking = "";
        });
    };

  bookingcab();
   var cityrefresh = function () {
        $http.get('/city/city').success(function (response) {
            console.log('Cities readed');
            $scope.citylist = response;
            $scope.city = "";
        });
    };

cityrefresh();
var refresh = function () {
        $http.get('/car/car').success(function (response) {
            console.log(' car type read');
            $scope.carlist = response;
            $scope.car = "";
        });
    };

  refresh();
  var refreshmapping = function () {
        $http.get('/map/map').success(function (response) {
            console.log(' mapping');
            $scope.mappedlist = response;

            $scope.mapped = "";
        });
    };



refreshmapping();
var locrefresh = function () {
        $http.get('/loc/loc').success(function (response) {
            console.log('locations readed');
            $scope.localist = response;
            $scope.loca = "";
        });
    };

 locrefresh();
var details=[];
var l;

  $(function () {

  var id= Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    console.log(id);
     $("#randomnumber").val('B'+id);
      $("#randomnumber1").val('B'+id);
  });

var refresh = function () {
        $http.get('/car/car').success(function (response) {
            console.log(' car type read');
            $scope.carlist = response;
            $scope.car = "";
        });
    };

  refresh();
var latitude,longitude;
var map;
var marker;
 var latlng;
 var latlng2;
 var geocoder;
 var lat,long;
 var mapOptions
initialize();

function initialize(){

if (navigator.geolocation)
 {
 navigator.geolocation.getCurrentPosition(function (p)
  {
  latlng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
 geocoder = new google.maps.Geocoder();
var infowindow = new google.maps.InfoWindow();

 mapOptions = {
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
socket.on('touser',function(data){

console.log(data);
d.push(data);
latlng2 = new google.maps.LatLng(data.location.lati,data.location.longi);
  drivermarker[data.id]=new google.maps.Marker({
                                        position: latlng2,
                                        map: map,
                                        icon: "../resources/images/cab.png"
                                     });
});


geocoder.geocode({'latLng': latlng }, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if (results[0]) {
$('#latitude,#longitude').show();
$('#address').val(results[0].formatted_address);
 $('#latitude').val(marker.getPosition().lat());
 lat=document.getElementById("latitude").value;


 $('#longitude').val(marker.getPosition().lng());
  long=document.getElementById("longitude").value;
// infowindow.setContent(results[0].formatted_address);
infowindow.setContent("Your Location");
infowindow.open(map, marker);
userdetails();
}
}
});

google.maps.event.addListener(marker, 'dragend', function() {

geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if (results[0]) {
    console.log(results[0]);
$('#address').val(results[0].formatted_address);

 $('#latitude').val(marker.getPosition().lat());
 $('#longitude').val(marker.getPosition().lng());
 lat=document.getElementById("latitude").value;
 // alert(lat);
  long=document.getElementById("longitude").value;


infowindow.setContent("Your Location");
infowindow.open(map, marker);
userdetails();
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
}

function userdetails()
{
   socket.emit('customerdetails',{
            info:loggedInUser
          })
}


socket.on('driverremoved',function(data){
  console.log(data);
  console.log(drivermarker);
  console.log(drivermarker[data.id]);
  if(drivermarker[data.id]!=undefined){
    console.log("id removing");
drivermarker[data.id].setMap(null);

  }
});

init();

function init() {

    var acInputs = document.getElementsByClassName("autocomplete");

    for (var i = 0; i < acInputs.length; i++) {

        var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);

        autocomplete.inputId = acInputs[i].id;
        google.maps.event.addDomListener(window, 'load', initialize);
    }
}



var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.SearchBox(document.getElementById('ac1'));
     new google.maps.places.SearchBox(document.getElementById('ac2'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});


$scope.Logout=function()
    {
        AuthenticationService.Logout();
         $location.path('/');
          alert("Thanking you using Anytime Cab");
    }
    var refreshBill=function(){
      $http.get('/cabassign/cabassign').success(function (response) {
        $scope.billlist=response;
        $scope.bill=""
      });
    }
    refreshBill();

    var Type,m;
$scope.modal1=function(){
 $scope.history=false;
  $scope.later=false
$scope.now=true;


}
$scope.modal2=function(){
  $scope.now=false;
  $scope.Details=false;
    $scope.history=false;
 $scope.later=true;
}
var y;
// $scope.farelist=[];
$scope.modal3=function(){
  $scope.now=false;
  $scope.Details=false;
  $scope.later=false
   $scope.history=true;
   $http.get('/cabassign/cabassign').success(function (response) {
        $scope.blist=response;
         if($scope.blist.length==0){
          alert("There is no history of booking");
         }
         else
         {

            var data=$scope.blist;
    var uniqueNames = [];
  var uniqueObj = [];
    for(i = 0; i< data.length; i++){
 if(data[i].mailId==loggedInUser.email){
    if(uniqueNames.indexOf(data[i]) === -1)  {
     uniqueNames.push(data[i]);
       }}
    }
  console.log(uniqueNames);
  $scope.val=uniqueNames;

         }
      });
};
var tt,i;
 var service;
$scope.type=function(){
  $scope.bill.pickupLoc=document.getElementById("address").value;
      $scope.bill.dropLoc=document.getElementById("ac1").value;
  service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [$scope.bill.pickupLoc],
        destinations: [$scope.bill.dropLoc],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            distance = response.rows[0].elements[0].distance.text;
            console.log(distance);
            duration = response.rows[0].elements[0].duration.text;
            console.log(duration);
          }
          else
          {
           alert("Unable to find the distance via road.");
          }
        });
}
$scope.Now=function(){
  var radioButtons = document.getElementsByName("triptype");
      for (var x = 0; x < radioButtons.length; x ++)
        {
         if (radioButtons[x].checked) {
        tt=radioButtons[x].value;
         console.log(tt);
       }
     }
  $scope.Details=true;
  var date = new Date();
      $scope.bill.Date=date;
      var hour = date.getHours();
      var min = date.getMinutes();
      $scope.bill.Time = hour+":"+min;
Type=document.getElementById("cab1").value;

console.log(d.length);
      if(d.length==0)
        {
         alert("sorry no cab available");
         $scope.Details=false;
        }
          else{

 for(i=0;i<$scope.carlist.length;i++)
        {
            if($scope.carlist.length==0)
            {
                 alert("Invalid CarType");

            }
            else
            {
            if($scope.carlist[i].carType==Type)
             {


              if($scope.carlist[i].peakhrfrm<=$scope.bill.Time&&$scope.carlist[i].peakhrto>=$scope.bill.Time){
                if( tt=="One Way")
  {
       apprfare=parseInt($scope.carlist[i].peakhrrate);
       console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
              console.log(apprfare);
 document.getElementById("fare").innerHTML=apprfare;
 document.getElementById("dis").innerHTML=distance;
        document.getElementById("duration").innerHTML=duration;


}  else if( tt=="Round Trip")
         {
 apprfare=parseInt($scope.carlist[i].peakhrrate *2);
 console.log(apprfare);
 console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
  distance=parseFloat(distance)*2;
 duration=parseFloat(duration)*2;
 document.getElementById("fare").innerHTML=apprfare;
 document.getElementById('dis').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;
         }

              }
              else
              {
                console.log("no peak hr");
                  if( tt=="One Way")
  {
       apprfare=parseInt($scope.carlist[i].normalrate);
              console.log(apprfare);
console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
 document.getElementById("fare").innerHTML=apprfare;
 document.getElementById('dis').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;

}  else if( tt=="Round Trip")
         {
 apprfare=parseInt($scope.carlist[i].normalrate *2);
 console.log(apprfare);
 console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
 distance=parseFloat(distance)*2;
 duration=parseFloat(duration)*2;
 document.getElementById("fare").innerHTML=apprfare;
 document.getElementById('dis').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;
         }
              }
            }//
            }
}
   }

  };
var amt,dis,duration1,id;
  $scope.confirm=function(){
amt=document.getElementById("fare").innerHTML;
dis=document.getElementById("dis").innerHTML;
duration1=document.getElementById("duration").innerHTML;
id=document.getElementById("randomnumber").value;
     socket.emit('bkcustomerdetails',{
  name:authUser.currentUser.userInfo.fname,
    No:authUser.currentUser.userInfo.mobile,
     mail:authUser.currentUser.userInfo.email,
  cabType:Type,
 source:$scope.bill.pickupLoc,
  Destination:$scope.bill.dropLoc,
  Amount:amt,
  Distance:dis,
 Dur:duration1,
 bkdate:$scope.bill.Date,
 time:$scope.bill.Time,
 bid:id,
 triptype:tt
  });
     $scope.now=false;
     $scope.later=false;
     $scope.history=false;
     $scope.Details=false;

  }

var bookid;
$scope.add=function(){
$scope.bking.bookingID=document.getElementById("randomnumber1").value;
alert
$scope.bking.Time=document.getElementById("nowtime").value;
$scope.bking.Name= document.getElementById("cname").innerHTML;
$scope.bking.mailId=document.getElementById("custid").innerHTML;
$scope.bking.phoneNo=document.getElementById("custno").innerHTML;
$scope.bking.Amt= document.getElementById("appfare").innerHTML;
console.log($scope.bking);
 $http.post('/book/book',$scope.bking).success(function (response) {
                                  console.log(response);
                                  alert("Thanking you for using AnytimeCab !!!");
                                  // alert("Driver will contact soon");
                                  $location.path('/');
                                });

}

socket.on('msg',function(data){
  var modal = document.getElementById('my');
   console.log(data);
   if(data!=null)
   {
     modal.style.display = "block";
  document.getElementById("bkid").innerHTML=data.finaldata.bid;
  document.getElementById("name").innerHTML=data.finaldata.Drivername;
  document.getElementById("amt").innerHTML=data.finaldata.amount;
    document.getElementById("pick").innerHTML=data.finaldata.frmloc;
  document.getElementById("Drop").innerHTML=data.finaldata.toloc;
    document.getElementById("no").innerHTML=data.finaldata.dno;
    document.getElementById("cname1").innerHTML=data.finaldata.name;
    document.getElementById("cno").innerHTML=data.finaldata.cno;
}
})
$scope.submit=function(){
  $location.path('/');
}



var distance,duration;
$scope.get=function(){
  console.log($scope.bking.pickupLoc);
  // var src=document.getElementById("ac1").value;
  var dest=document.getElementById("ac2").value;

$scope.loc1=$scope.bking.pickupLoc;
$scope.loc2=dest;
var request = {
        origin: $scope.loc1,
        destination: $scope.loc2,
        travelMode: google.maps.TravelMode.DRIVING
    };

    //*********DISTANCE AND DURATION**********************//
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [$scope.loc1],
        destinations: [$scope.loc2],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            distance = response.rows[0].elements[0].distance.text;
            console.log(dis);
            duration = response.rows[0].elements[0].duration.text;
            console.log(duration);
                show();
          }
        });

};
var selecttime;
var show=function(){
var radioButtons = document.getElementsByName("triptype");
      for (var x = 0; x < radioButtons.length; x ++)
        {
         if (radioButtons[x].checked) {
        tt=radioButtons[x].value;
         console.log(tt);
       }
     }
  $scope.details1=true;
 console.log($scope.bking.cabType);
// Type=document.getElementById("cab1").value;
selecttime=document.getElementById("nowtime").value;

 for(i=0;i<$scope.carlist.length;i++)
        {
            if($scope.carlist.length==0)
            {
                 alert("Invalid CarType");

            }
            else
            {
            if($scope.carlist[i].carType==$scope.bking.cabType)
             {


              if($scope.carlist[i].peakhrfrm<=selecttime&&$scope.carlist[i].peakhrto>=selecttime){
                if( tt=="One Way")
  {
       apprfare=parseInt($scope.carlist[i].peakhrrate);
       console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
              console.log(apprfare);
              document.getElementById("cname").innerHTML=loggedInUser.fname;
document.getElementById("custno").innerHTML=loggedInUser.mobile;
document.getElementById("custid").innerHTML=loggedInUser.email;
 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById("distance").innerHTML=distance;
        document.getElementById("dtime").innerHTML=duration;


}  else if( tt=="Round Trip")
         {
 apprfare=parseInt($scope.carlist[i].peakhrrate *2);
 console.log(apprfare);
 console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
  distance=parseFloat(distance)*2;
 duration=parseFloat(duration)*2;
  document.getElementById("cname").innerHTML=loggedInUser.fname;
document.getElementById("custno").innerHTML=loggedInUser.mobile;
document.getElementById("custid").innerHTML=loggedInUser.email;
 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById('distance').innerHTML=distance;
        document.getElementById('dtime').innerHTML=duration;
         }

              }
              else
              {
                console.log("no peak hr");
                  if( tt=="One Way")
  {
       apprfare=parseInt($scope.carlist[i].normalrate);
              console.log(apprfare);
console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
               document.getElementById("cname").innerHTML=loggedInUser.fname;
document.getElementById("custno").innerHTML=loggedInUser.mobile;
document.getElementById("custid").innerHTML=loggedInUser.email;
 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById('distance').innerHTML=distance;
        document.getElementById('dtime').innerHTML=duration;

}  else if( tt=="Round Trip")
         {
 apprfare=parseInt($scope.carlist[i].normalrate *2);
 console.log(apprfare);
 console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
 distance=parseFloat(distance)*2;
 duration=parseFloat(duration)*2;
  document.getElementById("cname").innerHTML=loggedInUser.fname;
document.getElementById("custno").innerHTML=loggedInUser.mobile;
document.getElementById("custid").innerHTML=loggedInUser.email;
 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById('distance').innerHTML=distance;
        document.getElementById('dtime').innerHTML=duration;
         }
              }
            }//
            }
}

}
 });
