class ErrorHandler extends Error {
    constructor(message , statusCode){
    super(message);
    this.statusCode =statusCode;
}
}



const errorMiddleware = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Erro";
//this error is occure when your string is invalide like its formate is invalid or string length is not same
    if(err.name ==="CastError"){
        const message = `Invalid ${err.path}`
        err = new ErrorHandler(message , 400)
    }
// This error is occure when the mongodb url or name is missing or invalid or for some like email is unique 
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered.`
        err = new ErrorHandler(message , 400)
    }
    if(err.name ==="JsonWebTokenError"){
        const message = `Json Web Token is invalid, Try again`
        err = new ErrorHandler(message , 400)
    }
    if(err.name ==="TokenExpiredError"){
        const message = `Your Token is Expired`
        err = new ErrorHandler(message , 400)
    }
    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
        err:err
    })
}
 
module.exports = {ErrorHandler,errorMiddleware};