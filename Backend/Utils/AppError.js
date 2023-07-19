// AppError to handle known errors (eg. user enters unexpected answer)
class AppError extends Error{
    constructor(message,statusCode,errors){
        super(message)
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.errors = errors;
    }
}


// exporting AppError to use it anywhere in the project
module.exports = AppError;