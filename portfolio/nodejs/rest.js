var http = require('http');
var myEvent = "";
var url = require('url');



var crudULServer = new http.Server(function (req,res) {

    //console.log(req.method, req.url);
    var urlParsed = url.parse(req.url,true);

    myEvent+= req.method + urlParsed;
console.log(urlParsed,req.headers);

    if (urlParsed.pathname === '/api'&& urlParsed.query.message){
        res.statusCode=404;
        res.setHeader('Cache-control', 'no-cache');
        myEvent+=urlParsed.query.message+'\n';
    }else{
        res.statusCode=404;
        myEvent+='not found';
    }

    //res.end();
});

crudULServer.listen(1337, process.argv[2]);

var myEmit = crudULServer.emit;
//http.server --> net.server --> EventEmitter
crudULServer.emit = function (event) {
    myEvent += event.toString() + '\n';
    myEmit.apply(crudULServer, arguments);
};

crudULServer.on('request', function (req, res) {
    "use strict";

    res.end('hellowee' + myEvent);
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
