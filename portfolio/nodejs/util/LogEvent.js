function LogEvent() {
    //todo write to file
}

LogEvent.prototype.logInfo = function (/* ... */) {
    console.log(arguments);
};
LogEvent.prototype.logError = function (/* ... */) {
    console.error(arguments);
};

module.exports = LogEvent;
