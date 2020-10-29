class ErrorHandler extends Error {
    constructor(statusCode=500, message) {
        super();
        this.statusCode = statusCode;
        this.message    = message;
    }
}
module.exports = {
    ErrorHandler
}