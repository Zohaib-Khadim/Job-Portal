const catchAsyncError = require("./catchAsyncError");
const { ErrorHandler } = require("./error");
const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
module.exports.isAuthenticated = catchAsyncError(async(req,res,next)=>{
//Here We Get User Token
    const {Token} = req.cookies;
//Checking Wheather the Token is not present
    if(!Token){
        next(new ErrorHandler("User is not Authenticated"),400)
    }
//If User is Authenticated then we will get the value of payload of that token
    const decoded = jwt.verify(Token,process.env.JWT_SECRET_KEY)

// Now we have to get login user with the help of payload of user Token and stored in the req.user
    req.user = await User.findById(decoded.id)
    console.log(req.user);
    next();




})

module.exports.isAuthorized = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource!`,400))
        }
        next();
    }
}