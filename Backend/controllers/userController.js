// const catchAsyncError = require("../middlewares/catchAsyncError.js")
// const {ErrorHandler} = require("../middlewares/error.js")
// const User = require("../models/userSchema.js")
// const cloudinary = require("cloudinary").v2
// // import {v2 as cloudinary} from "cloudinary"

// module.exports.register = catchAsyncError(async (req, res, next) => {
//   try {
//     const {
//         username,
//         email,
//         password,
//         phoneNumber,
//         role,
//         address,
//         firstNiche,
//         secondNiche,
//         thirdNiche,
//         createdAt,
//         coverLetter
//     } = req.body;
// //Some Field is Missing
//     if (!username || !email || !password || !phoneNumber || !role || !address) {
//         return next(new ErrorHandler("Please Fullfill The Given Fields!", 400))
//     }
// //If Jobe Seaker but not choose any niche
//     if (role === "Jobe Seaker" && (!firstNiche, !secondNiche, !thirdNiche)) {
//         return next(new ErrorHandler("Please Select a Niche According to your intrest!", 400))
//     }
// //If User is already registered
//     const existUser = await User.findOne({email})
//     if (existUser) {
//         return next(new ErrorHandler("The User is already registred By using this email!", 400))
//     }
// // If not registered then its data will be:
//     const userData = {
//         username,
//         email,
//         password,
//         phoneNumber,
//         role,
//         address,
//         niches: {
//             firstNiche,
//             secondNiche,
//             thirdNiche
//         },
//         createdAt,
//         coverLetter
//     }
// // For Resume
//     if(req.files && req.files.resume){
//         const {resume} = req.files;
//         if(resume){
//             try {
//                 const cloudinaryResponse =await cloudinary.uploader.upload(resume.tempFilePath, // This will be the temporary file path of the resume
//                     {folder:"Jobe_Seaker_Resume"}) // this will be the folder where your resume will be save

//                 if(!cloudinaryResponse && cloudinaryResponse.error){
//                     return next(new ErrorHandler("Failed to Upload Resume to Cloud!",500))  
//                 }
//                 userData.resume = {
//                     public_id :  cloudinaryResponse.public_id,
//                     url: cloudinaryResponse.secure_url
//                 }
//             } catch (error) {
//                 return next(new ErrorHandler("Failed to Upload Resume!",400))
//             }
//         }
//         const user = await User.create(userData);
//         res.status(201).json({
//             success:true,
//             message:"User Registered!"
//         })
//     }
//  } catch (error) {
//     next(error)
//   }
// })


const catchAsyncError = require("../middlewares/catchAsyncError.js");
const { ErrorHandler } = require("../middlewares/error.js");
const User = require("../models/userSchema.js");
const { sendToken } = require("../utils/jwtToken.js");
const cloudinary = require("cloudinary").v2;

module.exports.register = catchAsyncError(async (req, res, next) => {
  try {
    const {
        username,
        email,
        password,
        phoneNumber,
        role,
        address,
        firstNiche,
        secondNiche,
        thirdNiche,
        createdAt,
        coverLetter
    } = req.body;

    // Some Field is Missing
    if (!username || !email || !password || !phoneNumber || !role || !address) {
        return next(new ErrorHandler("Please fulfill the given fields!", 400));
    }

    // If Job Seeker but not choosing any niche
    if (role === "Job Seeker" && (!firstNiche || !secondNiche || !thirdNiche)) {
        return next(new ErrorHandler("Please select a niche according to your interest!", 400));
    }

    // If User is already registered
    const existUser = await User.findOne({ email });
    if (existUser) {
        return next(new ErrorHandler("The user is already registered using this email!", 400));
    }

    // Initialize userData without resume
    const userData = {
        username,
        email,
        password,
        phoneNumber,
        role,
        address,
        niches: {
            firstNiche,
            secondNiche,
            thirdNiche
        },
        createdAt,
        coverLetter
    };

    // For Resume
    if (req.files && req.files.resume) {
        const { resume } = req.files;
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {
                folder: "Job_Seeker_Resume"
            });

            if (!cloudinaryResponse || cloudinaryResponse.error) {
                return next(new ErrorHandler("Failed to upload resume to cloud!", 500));
            }

            userData.resume = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            };
        } catch (error) {
            return next(new ErrorHandler("Failed to upload resume!", 400));
        }
    }

    // Create user regardless of whether resume was uploaded
    const user = await User.create(userData);
// Here the sendToken function will be called and also the arguments send in this function
    sendToken(user,201,res,"User Registered!")

// After the above function this res have no need here bcz all the data with token will be send by this token

    // res.status(201).json({
    //     success: true,
    //     message: "User Registered!"
    // });

  } catch (error) {
    next(error);
  }
});

module.exports.login = catchAsyncError(async(req,res,next)=>{
    try {
        const {email,password,role} = req.body;
// If some field is missing then this condition is trigered
        if (!email || !password ||!role ) {
            return next(new ErrorHandler("Please fulfill the given fields!", 400));
        }
// Checking the user is existed or not plue giing the password manually access
        const user = await User.findOne({email}).select("+password")
        if (!user) {
            return next(new ErrorHandler("Invalid Email or Password.!", 400));
        }
// Password comparison if not matched with the registered password then give this error
        const isComparedPassword =await user.comparePassword(password);
        if(!isComparedPassword){
            return next(new ErrorHandler("Your emai or Password is incorrect. Please Try Again!", 400));
        }
        if(user.role !==role){
            return next(new ErrorHandler("Invalid Role!", 400));

        }
        sendToken(user,200,res,"User Login Successfully!")
    } catch (error) {
        
    }
})

module.exports.logout = catchAsyncError(async(req,res,next)=>{
     // these are he following options for the cookie like expiration , httpOnly etc
     const options = {
        expires: new Date(
            Date.now()),
        httpOnly: true
    };
    res.status(200).cookie("Token","",options).json({
        success:true,
        message:"Logged Out Successfully"
    })
})

module.exports.getUser = catchAsyncError(async(req,res,next)=>{
// This req.user we have used in the authentication file and in which we have saved the value of the user who logged in
// console.log(req.user);
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
})

module.exports.updateProfile = catchAsyncError(async(req,res,next)=>{
// New User Data will be this
    const newUserData = {
        username : req.body.username,
        email : req.body.email,
        // password : req.body.password,
        phoneNumber : req.body.phoneNumber,
        address : req.body.address,
        niches:{
            firstNiche:req.body.firstNiche,
            secondNiche:req.body.secondNiche,
            thirdNiche:req.body.thirdNiche,
        },
        coverLetter:req.body.coverLetter

    }
// here we are destructuring our niches object
    const {firstNiche,secondNiche,thirdNiche} = newUserData.niches;

// same condition jsut like the register if you are updating your profile then you will not skip or remove your niches you may update them or set them as before they were.
    if(req.user.role === "Job Seaker" && (!firstNiche || !secondNiche || !thirdNiche)){
        return next(new ErrorHandler("Please Provide Your Preferred Job Niches!",400))
    }

//This will be for the resume optional if user want to update resume then this condition will tregared
    if(req.files){
//getting older resume
        const resume = req.files.resume;

// if resume find then destroy the older one and and replace with new one.
        if(resume){
// saving the public_id of the older resume in the currentResumeId
            const currentResumeId = req.files.resume.public_id;

// if the resume find then destroyed it
            if(currentResumeId){
                await cloudinary.uploader.destroy(currentResumeId);
            };
// and add new resume by using this query
            const newResume = await cloudinary.uploader.upload(resume.tempFilePath,{
                folder: "Job_Seeker_Resume"
            });

//here you are adding your newResume in the updated Data of the user 
            newUserData.resume = {
                public_id : newResume.public_id,
                url:newResume.secure_url,
            };
        }
    }

//Options for the updation
    const updateOptions = {
        new : true,
        runValidators:true,
        useFindAndModiy:false,
    }

// By using this query you can update your Usre Profile this update takes 3 parameters:
// 1>>> req.user.id current user id means current user    
// 2>>>>>updated data of user neans new data you want to add in the older user  
// 3>>>>>some options for updation like new , runValidators , useFindAndModify
    const user = await User.findByIdAndUpdate(req.user.id , newUserData,updateOptions)
    res.status(200).json({
        success:true,
        user,
        message:"User Updated Successfully!"
    })
})

module.exports.updatePassword = catchAsyncError(async(req,res,next)=>{
// Here we are getting user whome password will be rest or update
    const user = await User.findById(req.user.id).select("+password");

// Here we are checking that your enterd password is matched with the your set old password
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

// your password is not matched then this condition will be tregared
    if(!isPasswordMatched){
        return next(new ErrorHandler("Your old password is not Matched with the given password!",400))
    }

// Here you can checked your newPassword with the ConfirmPassword
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHandler("New Password and Confirm Password is not matched!",400))
    }

// here you are adding your new password 
    user.password = req.body.newPassword;
// saving user with new password
    await user.save();
    sendToken(user,200,res,"User Password is Updated Successfully!")
})

