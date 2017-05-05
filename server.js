var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var server =require('http').Server(app);
var io=require('socket.io').listen(server);
var Driver=[];
var User=[];

var UserRoute = require('./server/routes/userRoute.js');

var cityCrud = require('./server/routes/addcity-crud');
var carCrud = require('./server/routes/CabType');
var mapCrud = require('./server/routes/mappingcarcity');
var Location1 = require('./server/routes/addloc');
var driver = require('./server/routes/driver-crud');
var cabbooking = require('./server/routes/booking-crud');
var mapping = require('./server/routes/assignbk-crud');
var map = require('./server/routes/assigndriver-crud');
var cabassigned = require('./server/routes/assign-cab');

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './client')));
mongoose.connect('mongodb://localhost:27017/anytimecab');
var db = mongoose.connection;

db.on('open', function() {
    console.log('App is connected to database');
});

db.on('error', function(err) {
    console.log(err);
});

app.use('/api', UserRoute);
app.use('/car', carCrud);
app.use('/map', mapCrud);
app.use('/city',cityCrud);
app.use('/loc',Location1);
app.use('/der',driver);
app.use('/book',cabbooking);
app.use('/confirm',mapping);
app.use('/ass',map);
app.use('/cabassign',cabassigned);



io.on('connection', function(socket) {
    console.log('Socket Connected');
// user info socket
socket.on('customerdetails',function(data){
  console.log(data);
    console.log(socket.id);
  User[socket.id] ={
Name:data.info.fname,
email:data.info.email,
phone:data.info.mobile,
Id:socket.id

  }
})

// driver info socket
    socket.on('driverinfo',function(data)
    {
    console.log(data);
    console.log(socket.id);
    Driver[socket.id]={
    location:data.loc,
    Name:data.Dname,
    type:data.cab,
    pnone:data.No,
    carno:data.cno,
    carname:data.cname,
    Email:data.mail,
    id:socket.id
  };
    console.log("driver added");
  console.log(Driver);
    socket.broadcast.emit('touser',Driver[socket.id]);
     })


socket.on('disconnect',function(){
  console.log("socket disconnected");
  socket.broadcast.emit("driverremoved",Driver[socket.id]);
  console.log(socket.id);
  delete Driver[socket.id];
  console.log(Driver);
})
socket.on('bkcustomerdetails',function(data){
  console.log(data);
console.log(data.cabType);

for(u in User){
  console.log(User[u]);
  console.log(User[u].email);
  if(data.mail==User[u].email){
     for(d in Driver){

  if(data.cabType==Driver[d].type){

    console.log(Driver[d].id);

    socket.to(Driver[d].id).emit('CustomerMessage', {
      message:data,
      messageId:User[u].Id
      });
  }
}
}
}

})

socket.on('confirmationmsg',function(data){

  console.log(data);
  console.log(data.uid);


console.log("userdetails received");

socket.to(data.uid).emit('msg', {
  finaldata:data
});
});

});

server.listen(7777, function(req, res) {
    console.log('Server is running on port 7777...');
});
