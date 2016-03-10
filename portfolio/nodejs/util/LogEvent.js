var winston = require('winston');

var config = require('./Config.json');

//var currentDate = new Date();
//
//var currentDateFormatted = currentDate.getDate()  + "." + (currentDate.getMonth()+1) + "." + currentDate.getFullYear() + "-" +
//    currentDate.getHours() + ":" + currentDate.getMinutes();

//var timeFormatFn = function() {
//    'use strict';
//    return moment().format(cfg.timeFormat);
//};
//
//var logger = new(winston.Logger)({
//    exitOnError: false,
//    transports: [
//        new(winston.transports.DailyRotateFile)({
//            filename: cfg.appLogName,
//            dirname: __dirname + '/../' + cfg.logsDirectory,
//            datePattern: cfg.rollingDatePattern,
//            timestamp: timeFormatFn
//        }),
//        new(winston.transports.Console)({
//            colorize: true,
//            timestamp: timeFormatFn
//        })
//    ]
//});

var loggerTransports = [
    new winston.transports.Console({
        timestamp: true,
        colorize: true,
        level: 'info'
    }),
    new winston.transports.File({
        filename: config.logFilePath + config.logFileName,
        level: 'debug'
    })
];

var winstonLogger = new winston.Logger({transports: loggerTransports});

function LogEvent() {
    //todo write to file
}

LogEvent.prototype.logDebug = function (/* ... */) {
    //console.error(arguments);
    winstonLogger.debug(arguments);
};

LogEvent.prototype.logError = function (/* ... */) {
    //console.error(arguments);
    winstonLogger.error(arguments);
};

LogEvent.prototype.logInfo = function (/* ... */) {
    //console.log(arguments);
    winstonLogger.info(arguments);
};

module.exports = LogEvent;
