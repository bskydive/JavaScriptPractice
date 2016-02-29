var http = require('http');
var outString = "";
var url = require('url');
var util = require('util');

var LogEventClass = require('./util/LogEvent.js');
var logEvent = new LogEventClass();

var ApiParseError = require('./util/ApiParseError.js');
var apiDictionary = require('./util/ApiDictionary.json');
//var apiDictionary = new ApiDictionaryClass;

function getUrlParamByName(reqObj, paramName) {
    "use strict";

    //todo get from db

    var urlParsed = url.parse(reqObj.url, true);

    logEvent.logInfo(urlParsed.pathname, reqObj.headers, reqObj.method);

    if (urlParsed.pathname !== apiDictionary.apiPrefix + '/userlist') {
        throw new ApiParseError(urlParsed.pathname);
    }

     if ( !urlParsed.query[paramName]) {
        //res.setHeader('Cache-control', 'no-cache');
        throw new ApiParseError(urlParsed.query[paramName]);
        }
}

var crudULServer = new http.Server(function (req, res) {

    var result = "";

    try {
        result = getUrlParamByName(req, 'uid');
        outString += result[1];
        res.statusCode = result[0];

        result = getUrlParamByName(req, 'name');
        outString += result[1];
        res.statusCode = result[0];
    } catch (e){
        if (e instanceof ApiParseError ){
            logEvent.logError('STATUS:'+e.status +'\nMESSAGE:' + e.message);
        } else {
            throw e;
        }
    }
    //res.end();
});

crudULServer.listen(1337, process.argv[2]);

var myEmit = crudULServer.emit;
//http.server --> net.server --> EventEmitter
crudULServer.emit = function (event) {
    outString += event.toString() + '\n';
    myEmit.apply(crudULServer, arguments);
};

crudULServer.on('request', function (req, res) {
    "use strict";

    res.end('hellowee' + outString);
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
