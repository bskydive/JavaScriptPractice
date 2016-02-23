var http = require('http');

var restServer = new http.Server();

restServer.listen(1337, process.argv[2]);

var myEvent = 0;

//http.server --> net.server --> EventEmitter

var myEmit = restServer.emit;

restServer.emit = function (event) {
  myEvent+=event.toString()+'\n';
    myEmit.apply(restServer,arguments);
};

restServer.on('request',function(req,res){
    "use strict";
    res.end('hellowee'+ myEvent);
});

//var options = {
//    hostname: 'www.google.com',
//    port: 80,
//    path: '/upload',
//    method: 'POST',
//    headers: {
//        'Content-Type': 'application/x-www-form-urlencoded',
//        'Content-Length': postData.length
//    }
//};
//
//var req = http.request(options, function (res) {
//    console.log('STATUS: ${res.statusCode}');
//    console.log('HEADERS: ${JSON.stringify(res.headers)}');
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
//        console.log('BODY: ${chunk}');
//    });
//    res.on('end', function () {
//        console.log('No more data in response.');
//    });
//});
//
//req.on('error', function(e) {
//    console.log('problem with request: ${e.message}');
//});
//
//// write data to request body
//req.write(postData);
//req.end();
