
angular.module('cabApp').controller('HomeController', function($scope, $http, $rootScope,$location,AuthenticationService) {

var tt,source, destination,distance,duration,apprfare,charge,extrakm;

var i,j,apprfare,dis,timetaken;
var extrakm,charge,tt;

$scope.Login = function() {

        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true && response.data.userDetail.Role =='Customer' ) {
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


initialize();

function initialize() {

    var acInputs = document.getElementsByClassName("autocomplete");

    for (var i = 0; i < acInputs.length; i++) {

        var autocomplete = new google.maps.places.Autocomplete(acInputs[i]);

        autocomplete.inputId = acInputs[i].id;
        google.maps.event.addDomListener(window, 'load', initialize);
    }
}




var detailscab =function () {


      $http.get('/car/car').success(function (response) {
                $scope.clist = response;
 console.log(response);
            var type=document.getElementById("cab1").value;

            console.log(type);
var radioButtons = document.getElementsByName("triptype");
      for (var x = 0; x < radioButtons.length; x ++)
        {
         if (radioButtons[x].checked) {

         tt=radioButtons[x].value;
         console.log(tt);
       }
     }

             try
 {
  for(i=0;i<=$scope.clist.length;i++)
        {
            if($scope.clist.length==0)
            {
                 alert("Invalid CarType");

            }
            else
            {

                if($scope.clist[i].carType==type)
             {
 console.log(dis);

              if(  $scope.clist[i].freeKM>=distance)
{
  alert(distance);
  if( tt=="One Way")
  {
       apprfare=parseInt($scope.clist[i].minBill);
              console.log(apprfare);

 document.getElementById("appfare").innerHTML=$scope.clist[i].minBill;

document.getElementById("distance").innerHTML=distance;

}

         else if( tt=="Round Trip")
         {
 apprfare=parseInt($scope.clist[i].minBill *2);
 console.log(apprfare);
  var d=parseFloat(distance);
                var kms=d*2;
             var time=parseFloat(duration);
             var dur=time*2

              console.log(apprfare);

document.getElementById("duration").innerHTML=dur;
 document.getElementById("appfare").innerHTML=apprfare;

document.getElementById("distance").innerHTML=kms;

         }
       }


else
{
  if(tt=="One Way"){
    console.log(type);
                console.log($scope.clist[i].freeKM);
                var fkmcab=$scope.clist[i].freeKM;
                extrakm=parseFloat(parseFloat(distance)-fkmcab);
                 charge=$scope.clist[i].chargeperKM
                apprfare=parseInt(extrakm*charge + $scope.clist[i].minBill );

              console.log(apprfare);

 document.getElementById("appfare").innerHTML=apprfare;

document.getElementById("distance").innerHTML=distance;

  }
   else if( tt=="Round Trip")
         {
          console.log(type);
                console.log($scope.clist[i].freeKM);
                var fkmcab=$scope.clist[i].freeKM;
                extrakm=parseFloat(parseFloat(distance)-fkmcab);
                 charge=$scope.clist[i].chargeperKM
                apprfare=parseInt(extrakm*charge + $scope.clist[i].minBill );
                apprfare=apprfare*2;
                var d=parseFloat(distance);
                var kms=d*2;
             var time=parseFloat(duration);
             var dur=time*2
              console.log(apprfare);

document.getElementById("duration").innerHTML=dur;
 document.getElementById("appfare").innerHTML=apprfare;

document.getElementById("distance").innerHTML=kms;

}
}
}

}}}
      catch(e){}
      })
}

var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.SearchBox(document.getElementById('ac1'));
    // new google.maps.places.SearchBox(document.getElementById('ac2'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});


var c;

$scope.get = function () {


  source = document.getElementById("ac1").value;
    console.log(source);
    destination = document.getElementById("ac2").value;
    console.log(destination);
      c=document.getElementById("cab1").value;

if(source==""  || destination=="" && c=="" )
    {
      alert("Please fill all details");
    }
 else{
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
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


            document.getElementById('distance').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;
         detailscab();

        } else {
            alert("Unable to find the distance via road.");
        }
    });
  }

}
var details=function(){
  $http.get('/car/car').success(function (response) {
                $scope.clist = response;
 console.log(response);
 var det=$scope.clist;
 details1(det);
});

}

var details1=function(det){
  $scope.c=det;
   $scope.fare = true;
    document.getElementById('distance').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;
     var cabtype=document.getElementById("cab1").value;
 console.log(cabtype);
        try
 {
var radioButtons = document.getElementsByName("triptype");
      for (var x = 0; x < radioButtons.length; x ++)
        {
         if (radioButtons[x].checked) {

         tt=radioButtons[x].value;
         console.log(tt);

  for(i=0;i<=$scope.c.length;i++)
        {
            if($scope.c.length==0)
            {
                 alert("Invalid CarType");
            }
            else
            {
              if($scope.c[i].carType==cabtype)
             {
 console.log(distance);

              if(  $scope.c[i].freeKM>=distance)
{
  if( tt=="One Way")
  {
       apprfare=parseInt($scope.c[i].minBill);
              console.log(apprfare);
 document.getElementById("appfare").innerHTML=apprfare;

}

         else if( tt=="Round Trip")
         {
 apprfare=parseInt($scope.c[i].minBill *2);
 console.log(apprfare);
 document.getElementById("appfare").innerHTML=apprfare;
         }
       }
 else
{
  if(tt=="One Way"){
    console.log(type);
                console.log($scope.c[i].freeKM);
                var fkmcab=$scope.c[i].freeKM;
                extrakm=parseFloat(parseFloat(distance)-fkmcab);
                 charge=$scope.c[i].chargeperKM
                apprfare=parseInt(extrakm*charge + $scope.c[i].minBill );
              console.log(apprfare);
document.getElementById("appfare").innerHTML=apprfare;
  }
   else if( tt=="Round Trip")
         {
          console.log(type);
                console.log($scope.c[i].freeKM);
                var fkmcab=$scope.c[i].freeKM;
                extrakm=parseFloat(parseFloat(distance)-fkmcab);
                 charge=$scope.c[i].chargeperKM
                apprfare=parseInt(extrakm*charge + $scope.c[i].minBill );
                apprfare=apprfare*2;
              console.log(apprfare);
document.getElementById("appfare").innerHTML=apprfare;

}
}
}
}
}
} }
     }
  catch(e){}

}

 $scope.fare = false;
var refresh = function () {
        $http.get('/car/car').success(function (response) {
            console.log(' car type read');
            $scope.carlist = response;
            $scope.car = "";
        });
    };

  refresh();

// 28/4

$scope.normal=function(){
source = document.getElementById("ac1").value;
    console.log(source);
    destination = document.getElementById("ac2").value;
    console.log(destination);
      c=document.getElementById("cab1").value;
   // alert(c);
if(source==""  || destination=="")
    {
      alert("Please fill all details");

    }
 else{
   var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
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

         var cabtype=document.getElementById("cab1").value;
 console.log(cabtype);
        try
 {
var radioButtons = document.getElementsByName("triptype");
      for (var x = 0; x < radioButtons.length; x ++)
        {
         if (radioButtons[x].checked) {
        tt=radioButtons[x].value;
         console.log(tt);
       }
     }
 for(i=0;i<=$scope.carlist.length;i++)
        {
            if($scope.carlist.length==0)
            {
                 alert("Invalid CarType");

            }
            else
            {
              if($scope.carlist[i].carType==cabtype)
             {

  if( tt=="One Way")
  {
       apprfare=parseInt($scope.carlist[i].normalrate);
       console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
              // console.log(apprfare);

 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById('distance').innerHTML=distance;
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
 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById('distance').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;
         }
       }
        }
        }
      }
       catch(e){}
    }
    else {
            alert("Unable to find the distance via road.");
        }
    });


  }
};

$scope.peak=function(){
source = document.getElementById("ac1").value;
    console.log(source);
    destination = document.getElementById("ac2").value;
    console.log(destination);
      c=document.getElementById("cab1").value;
   // alert(c);
if(source==""  || destination=="")
    {
      alert("Please fill all details");

    }
 else{
   var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
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

         var cabtype=document.getElementById("cab1").value;
 console.log(cabtype);
        try
 {
var radioButtons = document.getElementsByName("triptype");
      for (var x = 0; x < radioButtons.length; x ++)
        {
         if (radioButtons[x].checked) {
        tt=radioButtons[x].value;
         console.log(tt);
       }
     }
 for(i=0;i<=$scope.carlist.length;i++)
        {
            if($scope.carlist.length==0)
            {
                 alert("Invalid CarType");

            }
            else
            {
              if($scope.carlist[i].carType==cabtype)
             {

  if( tt=="One Way")
  {
       apprfare=parseInt($scope.carlist[i].peakhrrate);
            console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById('distance').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;

}  else if( tt=="Round Trip")
         {
 apprfare=parseInt($scope.carlist[i].peakhrrate *2);
 console.log(distance);
            apprfare=parseFloat(distance)*parseFloat(apprfare);
              console.log(apprfare);
 console.log(apprfare);
  distance=parseFloat(distance)*2;
 duration=parseFloat(duration)*2;
 document.getElementById("appfare").innerHTML=apprfare;
 document.getElementById('distance').innerHTML=distance;
        document.getElementById('duration').innerHTML=duration;
         }
       }
        }
        }
      }
       catch(e){}
    }
    else {
            alert("Unable to find the distance via road.");
        }
    });


  }
}



});
