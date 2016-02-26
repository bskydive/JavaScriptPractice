function LogEvent() {
    "use strict";
    //todo write to file

    //this.info = function (eventString){ console.log(eventString); };


}

LogEvent.prototype.logInfo = function (eventString) {
    console.log(eventString);
};
LogEvent.prototype.logError = function (eventString) {
    console.error(eventString);
};

module.exports = LogEvent;
