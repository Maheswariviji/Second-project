


angular.module('cabApp').controller('adminController', function($scope,$cookies, $http, $rootScope,$location,AuthenticationService) {
initialize();
$scope.pend=false;

$scope.adminbill=false;
 $scope.pendingdetail=false;
 var authUser = $cookies.getObject('authUser');
        console.log(authUser);
        if (authUser != undefined) {
             loggedInUser = authUser.currentUser.userInfo;
            console.log(loggedInUser);
          console.log(loggedInUser.email);
document.getElementById("username").innerHTML=loggedInUser.fname;
           console.log(loggedInUser.mobile);

}
 var timepicker = new TimePicker(['peak1', 'peak2'], {
  theme: 'dark', // or 'blue-grey'
  lang: 'pt' // 'en', 'pt' for now
});
timepicker.on('change', function(evt){
  console.info(evt);

  var value = (evt.hour || '00') + ':' + (evt.minute || '00');
  evt.element.value = value;

})

var i,minimumBill,fKM,waitingamt,amtPerKM;
    var refresh = function () {
        $http.get('/car/car').success(function (response) {
            console.log(' car type read');
            $scope.carlist = response;
            $scope.car = "";
        });
    };

  refresh();

    $scope.addCar = function () {
        var frm=document.getElementById("peak1").value;
        var to=document.getElementById("peak2").value;
        $scope.car.peakhrfrm=frm;
        $scope.car.peakhrto=to;
        console.log($scope.car);
        $http.post('/car/car', $scope.car).then(function (response) {
            console.log(response);
            console.log("CAR TYPE  IS ADDED SUCCESSFUL");
            document.getElementById("peak1").value="";
            document.getElementById("peak2").value="";
            refresh();
        });
    };


    $scope.removeCar = function (id) {
        console.log(id);
        $http.delete('/car/car/' + id._id).success(function (response) {
            console.log(response);
            console.log('CAR TYPE  IS DELETED SUCCESSFULLY');
            refresh();
        });
    };

    $scope.editCar = function (id) {
         $http.get('/car/car/' + id._id).success(function (response) {
            $scope.car = response[0];
        });
    };

    $scope.updateCar = function () {
        console.log("REACHED UPDATE");
        console.log($scope.car._id);
        $http.put('/car/car/' + $scope.car._id, $scope.car).success(function (response) {
            console.log(response);
            refresh();
        })
    }

$scope.cartypechanged=function () {
    $http.get('/car/car').success(function (response) {
            $scope.clist = response;

            console.log(response);
            var type=document.getElementById("cab").value;
            console.log(type);
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
                console.log($scope.clist[i].minBill);
                 console.log($scope.clist[i].freeKM);
                  console.log($scope.clist[i].waitingCharge);
                   console.log($scope.clist[i].chargeperKM);

$scope.minimumBill=$scope.clist[i].minBill
$scope.fKM=$scope.clist[i].freeKM;
$scope.waitingamt=$scope.clist[i].waitingCharge;
$scope.amtPerKM=$scope.clist[i].chargeperKM;

document.getElementById("mBill").innerHTML=$scope.minimumBill;
document.getElementById("KM").innerHTML=$scope.fKM;
document.getElementById("wCharge").innerHTML=$scope.waitingamt;
document.getElementById("amt").innerHTML=$scope.amtPerKM;

             }
            }

        }
    }

      catch(e){}

})
};
// mapping car with city
var refreshmapping = function () {
        $http.get('/map/map').success(function (response) {
            console.log(' mapping');
            $scope.mappedlist = response;
            $scope.mapped = "";
        });
    };
refreshmapping();

$scope.add = function () {
    $scope.mapped.minBill=$scope.minimumBill;
    $scope.mapped.freeKM=$scope.fKM;
    $scope.mapped.waitingCharge=$scope.waitingamt;
    $scope.mapped.chargeperKM=$scope.amtPerKM;
        console.log($scope.mapped);
        $http.post('/map/map', $scope.mapped).success(function (response) {
            document.getElementById("mBill").innerHTML="";
document.getElementById("KM").innerHTML="";
document.getElementById("wCharge").innerHTML="";
document.getElementById("amt").innerHTML="";
            console.log(response);
            console.log("mapped IS ADDED SUCCESSFUL");
            refreshmapping();
        });
    };


    $scope.remove= function (id) {
        console.log(id);
        $http.delete('/map/map/' + id._id).success(function (response) {
            console.log(response);
            console.log('mapped IS DELETED SUCCESSFULLY');
           refreshmapping();
        });
    };

    $scope.edit = function (id) {
         $http.get('/map/map/' + id._id).success(function (response) {
            $scope.mapped = response[0];
            console.log(response[0]);
            document.getElementById("mBill").innerHTML= $scope.mapped.minBill;
document.getElementById("KM").innerHTML=$scope.mapped.freeKM;
document.getElementById("wCharge").innerHTML=$scope.mapped.waitingCharge;
document.getElementById("amt").innerHTML=$scope.mapped.chargeperKM;

        });
    };

    $scope.update = function () {
        console.log("REACHED UPDATE");
        console.log($scope.mapped._id);
        $http.put('/map/map/' + $scope.mapped._id, $scope.mapped).success(function (response) {
            console.log(response);
            document.getElementById("mBill").innerHTML="";
document.getElementById("KM").innerHTML="";
document.getElementById("wCharge").innerHTML="";
document.getElementById("amt").innerHTML="";
           refreshmapping();
        });
    };

// city
var cityrefresh = function () {
        $http.get('/city/city').success(function (response) {
            console.log('Cities readed');
            $scope.citylist = response;
            $scope.city = "";
        });
    };
 cityrefresh();
     $scope.addCity = function () {
        console.log($scope.city);
        $http.post('/city/city', $scope.city).success(function (response) {
            console.log(response);
            console.log("City  IS ADDED SUCCESSFUL");
            cityrefresh();
        });
    };


    $scope.removeCity = function (id) {
        console.log(id);
        $http.delete('/city/city/' + id._id).success(function (response) {
            console.log(response);
            console.log('City IS DELETED SUCCESSFULLY');
            cityrefresh();
        });
    };

    $scope.editCity = function (id) {
         $http.get('/city/city/' + id._id).success(function (response) {
            $scope.city = response[0];
        });
    };

    $scope.updateCity = function () {
        console.log("REACHED UPDATE");
        console.log($scope.city._id);
        $http.put('/city/city/' + $scope.city._id, $scope.city).success(function (response) {
            console.log(response);
            cityrefresh();
        });
    };

// locality
var locrefresh = function () {
        $http.get('/loc/loc').success(function (response) {
            console.log('locations readed');
            $scope.localist = response;
            $scope.loca = "";
        });
    };
 locrefresh();
     $scope.addloc = function () {
        console.log($scope.loca);
        $http.post('/loc/loc', $scope.loca).success(function (response) {
            console.log(response);
            console.log("LOCATION  IS ADDED SUCCESSFUL");
            locrefresh();
        });
    };


    $scope.removeloc = function (id) {
        console.log(id);
        $http.delete('/loc/loc/' + id._id).success(function (response) {
            console.log(response);
            console.log('LOCATION IS DELETED SUCCESSFULLY');
           locrefresh();
        });
    };

    $scope.editloc = function (id) {
         $http.get('/loc/loc/' + id._id).success(function (response) {
            $scope.loca = response[0];
        });
    };

    $scope.updateloc = function () {
        console.log("REACHED UPDATE");
        console.log($scope.loca._id);
        $http.put('/loc/loc/' + $scope.loca._id, $scope.loca).success(function (response) {
            console.log(response);
            locrefresh();
        });
    };
// driver
var driver = function () {
        $http.get('/der/der').success(function (response) {
            console.log('drivers details readed');
            $scope.driverlist = response;
            $scope.driver = "";
        });
    };
 driver();

var refreshuser = function () {
        $http.get('/api/getuser').success(function (response) {
            $scope.Userlist = response;
            $scope.User;
        });
    };

  refreshuser();
var name,no,mid,pwd,userrole;
     $scope.adddriver = function () {
        $scope.driver.Role="Driver";
        name=$scope.driver.driverName;
            No=$scope.driver.phoneno;
            mid=$scope.driver.mailID;
            pwd=$scope.driver.Password;
            userrole= $scope.driver.Role;

        console.log($scope.driver);
        // $rootScope.userdet=$scope.driver;
        $http.post('/der/d', $scope.driver).success(function (response) {
            console.log(response);
         driver();
    });
        data();
    };

var data=function()
{

        console.log($scope.driver);
        $http.post('/api/signup', $scope.driver).then(function(response) {
            alert('Driver Register Successfully');
        });

}
    $scope.removedriver = function (id) {
        console.log(id);
        $http.delete('/der/der/' + id._id).success(function (response) {
            console.log(response);
            console.log('driver is deleted');
           driver();
        });
    };

    $scope.editdriver = function (id) {
         $http.get('/der/der/' + id._id).success(function (response) {
            $scope.driver = response[0];
        });
    };

    $scope.updatedriver = function () {
        console.log("REACHED UPDATE");
        console.log($scope.driver._id);
        $http.put('/der/der/' + $scope.driver._id, $scope.driver).success(function (response) {
            console.log(response);
            driver();
        });
    };

function initialize() {

    var acInputs = document.getElementsByClassName("autocomplete");

    for (var i = 0; i < acInputs.length; i++) {

        var autocomplete = new google.maps.places.Autocomplete(acInputs);
        autocomplete.inputId = acInputs[i].id;


    }
}
var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var geocoder = new google.maps.Geocoder();


 $scope.names = ["Pending", "Completed"];


 $('#type').change(function(){

var state=document.getElementById("type").value;

     switch(state) {
        case "Pending":
            $http.get('/confirm/confirm').success(function (response) {
            $scope.pendinglist = response;
            console.log($scope.pendinglist);
            $scope.pend = "";
            if(response.length>0)
            {
                 $('#show1').show();
                  $('#show2').show();
                  $('#pendhide').hide();
            }
            else
            {
                $('#pendhide').show();
                                 $('#show1').hide();
                  $('#show2').hide();
            }
        });
        break;

        case "Completed":
       $http.get('/cabassign/cabassign').success(function (response) {
        $scope.pendinglist=response;
        $scope.coml=""
        if(response.length>0)
            {
                 $('#show1').show();
                  // $('#show2').show();
                  $('#pendhide').hide();
            }
            else
            {
                $('#pendhide').show();
                   $('#show1').hide();
                  $('#show2').hide();
            }
    });
        break;
        default:
        text = "status";
    }


 });


$scope.list=function(){


    var state=$scope.selectedName;

     switch(state) {
        case "Pending":
            $http.get('/confirm/confirm').success(function (response) {
            $scope.pendinglist = response;
            console.log($scope.pendinglist);
            $scope.pend = "";
            if(response.length>0)
            {
                $scope.status=true;
            }
            else
            {
                $scope.nostatus=true;
            }
        });
        break;
        case "Driver Assigned":
         $http.get('/ass/ass').success(function (response) {
             $scope.assignlist = response;
if(response.length>0)
            {
                $scope.status=true;
            }
            else
            {
                $scope.nostatus=true;
            }
         });
        break;
        case "Completed":
       $http.get('/cabassign/cabassign').success(function (response) {
        $scope.compllist=response;
        $scope.coml=""
        if(response.length>0)
            {
                $scope.status=true;
            }
            else
            {
                $scope.nostatus=true;
            }
    });
        break;
        default:
        text = "status";
    }
}
$scope.assigndriver=function(data){
console.log( $scope.pendinglist);
$scope.det=data;
$http.post('/ass/ass',  $scope.det).success(function (response) {
            console.log(response);
});

};


var comple=function()
{
$http.get('/cabassign/cabassign').success(function (response) {
        $scope.compllist=response;
        $scope.coml=""
    });
}

 $scope.asscab=function()
 {
    for(var j=0;j<$scope.assignlist.length;j++){
$scope.coml.bookingID=$scope.assignlist[j].bookingID;
    $scope.coml.city=document.getElementById("assignedcity").innerHTML;
    alert($scope.coml.city);
    $scope.coml.cabType=document.getElementById("assignedcab").innerHTML;
    alert($scope.coml.cabType);
    $scope.coml.pickupLoc=$scope.assignlist[j].pickupLoc;
 $scope.coml.dropLoc=$scope.assignlist[j].dropLoc;
    $scope.coml.tripType==$scope.assignlist[j].tripType;
    $scope.coml.Name==$scope.assignlist[j].Name;
    $scope.coml.phoneNo==$scope.assignlist[j].phoneNo;
   $scope.coml.Date==$scope.assignlist[j].Date;
    $scope.coml.Time=$scope.assignlist[j].Time;
    $scope.coml.DriverName=document.getElementById("dname").innerHTML;
    alert($scope.coml.DriverName);
    $scope.coml.carNo=document.getElementById("cno").innerHTML;
    alert($scope.coml.carNo);
$scope.coml.carName=document.getElementById("carname").value;
alert($scope.coml.carName);
}
console.log($scope.coml);
$http.post('/cabassign/cabassign',  $scope.coml).success(function (response) {
            console.log(response);

});
document.getElementById("dname").innerHTML="";
document.getElementById("cno").innerHTML="";
document.getElementById("carname").innerHTML="";
document.getElementById("assignedcity").innerHTML="";
document.getElementById("assignedcab").innerHTML="";
 }

$scope.clearcab=function(){

}
$scope.status=false;
$scope.nostatus=false;

$scope.admin=function()
{
     $scope.User.Role="Admin";
        console.log($scope.User);
        $http.post('/api/signup', $scope.User).then(function(response) {
            alert(' New Admin added Successfully');

        });
}

$scope.canl=function()
{
     $location.path('/');
}
 $scope.Logout=function()
    {
        AuthenticationService.Logout();
         $location.path('/');
    }
var k;
    $scope.pending=function(){

        $http.get('/book/book').success(function (response) {
            console.log(' booking data read');
            $scope.bookinglist = response;
            if($scope.bookinglist.length==0){
                alert("There is no pending Bookings");

            }
            else
            {
                $scope.pend=true;
            }


        });
    };
    var cab=function()
    {
        $http.get('/cabassign/cabassign').success(function (response) {
        $scope.list=response;
        $scope.l={};
    });
    }
    cab();
    var j,bktype,bkcity;
    $scope.assigncab=function(d){
        console.log(d);

bktype=document.getElementById("bktype").innerHTML;
bkcity=document.getElementById("bkcity").innerHTML;
$http.get('/der/der').success(function (response) {
            console.log('drivers details readed');
            $scope.d = response;
console.log($scope.d);
console.log($scope.d.length);
for(j=0;j<$scope.d.length;j++){
    if($scope.d[j].city==bkcity&&$scope.d[j].carType==bktype){
$scope.l.bookingID=d.bookingID;
$scope.l.city=d.city;
$scope.l.cabType=d.cabType;
$scope.l.pickupLoc=d.pickupLoc;
$scope.l.dropLoc=d.dropLoc;
$scope.l.tripType=d.tripType
$scope.l.Name=d.Name;
$scope.l.phoneNo=d.phoneNo;
$scope.l.mailId=d.mailId;
$scope.l.DriverName=$scope.d[j].FirstName;
$scope.l.carNo=$scope.d[j].carNumber;
$scope.l.carName=$scope.d[j].carName;
$scope.l.DriverNo=$scope.d[j].MobileNumber;
$scope.l.Date=d.Date;
$scope.l.Time=d.Time;
$scope.l.Amount=d.Amt;
$scope.l.Drmail=$scope.d[j].Email;
console.log($scope.l);
$http.post('/cabassign/cabassign',$scope.l).success(function (response) {
                                  console.log(response);
                                 $http.delete('/book/book/' + d._id).success(function (response) {
            console.log(response);
            alert("Driver is assigned!!!")
            // $location.path('/admin');
        });
                              });
    }
}
});
    };
var y;
var uniqueObj = [];
    $scope.admindet=function(){

        $scope.adminbill=true;
        $http.get('/cabassign/cabassign').success(function (response) {
        $scope.adminlist=response;

        
    });
    }
});
