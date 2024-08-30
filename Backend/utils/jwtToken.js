module.exports.sendToken = (user, statusCode, res, message) => { /* Here we are getting the value of token which is generated in the Schema file and saved in the token variable 
Also with the help of this user used below we can get the methods in the schema file like we create a methods for jwt*/
    const token = user.getJWTToken();

    // these are he following options for the cookie like expiration , httpOnly etc
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    // cookie accept 3 parameters
    // 1>>>>Token name    2>>>>token value    3>>>>token options
    res.status(statusCode).cookie("Token", token, options).json({success: true, user, message, token})

}
