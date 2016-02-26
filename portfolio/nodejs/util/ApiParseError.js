
function ApiParseError(message){
    "use strict";
    this.name = 'ApiParseError';
    this.status= 500;
    this.message = "ApiParseError:"+message;
    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ApiParseError);
    } else {
        this.stack = (new Error()).stack;
    }

}

ApiParseError.prototype = Object.create(Error.prototype);

module.exports = ApiParseError;
