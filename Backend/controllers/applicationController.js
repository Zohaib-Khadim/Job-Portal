const catchAsyncError = require("../middlewares/catchAsyncError.js");
const {ErrorHandler} = require("../middlewares/error.js");
const Job = require("../models/jobSchema.js");
const cloudinary = require("cloudinary").v2;
const Application = require("../models/applicationSchema.js")
module.exports.postApplication = catchAsyncError(async (req, res, next) => {
// Here we are getting the id of the job
    const {id} = req.params;
// getting application fields which will be required for posting the application
    const {
        name,
        email,
        address,
        phone,
        coverLetter,
    } = req.body

//this condition will only be tregared when some info is missing from the applications fields
    if (!name || !email || !address || !phone || !coverLetter) {
        return next(new ErrorHandler("Please fullfill all details!", 400))
    }

// here we are geeting the job seaker info from the req.user.id bcz only job seaker will be allow to this functionality
    const jobSeakerInfo = {
        id: req.user._id,
        name,
        email,
        address,
        phone,
        coverLetter,
        role: "Job Seaker"
    }

// we are getting the job by the id and save in the jobDetails variable
    const jobDetails = await Job.findById(id);

// only tregared when the job will not found
    if (! jobDetails) {
        return next(new ErrorHandler("Job not Found!", 404))
    }

// here we are checking wheather the user applied for this post already .
    const isAlreadyApplied = await Application.findOne({"jobInfo.id": id, "jobSeakerInfo.id": req.user._id})

//if applied already then tregared this condition
    if (isAlreadyApplied) {
        return next(new ErrorHandler("You already Applied for this job!", 400))
    }

// This is checking the posting have its resume if resume exixts then tregared this condition
    if (req.files && req.files.resume) {
        const {resume} = req.files;
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath, {folder: "Job_Seeker_Resume"})

            if (! cloudinaryResponse || cloudinaryResponse.error) {
                return next(new ErrorHandler("Failed to upload resume to cloudinary!", 500))

            }
            jobSeakerInfo.resume = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }
        } catch (error) {
            return next(new ErrorHandler("Failed to upload resume!", 500))

        }
    }

// if user exists,  resume does not exists or missing resume url then tregared this condition 
     else {
        if (req.user && !req.user.resume.url) {
            return next(new ErrorHandler("Please upload your resume!", 400))
        }

// Here we are adding resume url in the user who is in the seak of job or who is the user who is going to post
        jobSeakerInfo.resume = {
            public_id: req.user && req.user.resume.public_id,
            url: req.user && req.user.resume.url
        }
    }// Treminates the else condition

// Here are getting the info of the employer 
    const employerInfo = {
        id: jobDetails.postedBy,
        role: "Employer"
    }

// getting job info
    const jobInfo = {
        jobId: id,
        jobTitle: jobDetails.title
    }

    try {
// saving the above all info in the application variable
        const application = await Application.create({jobSeakerInfo, employerInfo, jobInfo});

        res.status(201).json({success: true, message: "Application submitted successfully", application});
    } catch (error) {
        console.error('Error creating application:', error); 
        return next(new ErrorHandler("Failed to submit application!", 500));
    }
    next()
});

module.exports.employerGetAllApplication = catchAsyncError(async (req, res, next) => {
    const {_id} = req.user;
    const applications = await Application.find({
        "employerInfo.id":_id,
// its means if employer does not delete the post then show it
        "deletedBy.employer":false
    })
    res.status(201).json({
        success:true,
        applications
    })
})
module.exports.jobSeakerGetAllApplication = catchAsyncError(async (req, res, next) => {
    const {_id} = req.user;
    const applications = await Application.find({
        "jobSeakerInfo.id":_id,
// its means if employer does not delete the post then show it
        "deletedBy.jobSeaker":false
    })
    res.status(201).json({
        success:true,
        applications
    })
})
module.exports.deleteApplication = catchAsyncError(async (req, res, next) => {
    const {id} = req.params;

    const application = await Application.findById(id);

    if(!application){
        return next(new ErrorHandler("Your Application is Not Found!",400))
    }
    const {role} = req.user
    switch (role) {
        case "Job Seaker":
            application.deletedBy.jobSeaker = true;
            await application.save()
            break;
        case "Employer":
            application.deletedBy.employer = true;
            await application.save()
            break;
        default:
            console.log("Default case for application delete function!")
            break;
    }

// its means if the application is deleted by the both job seaker and employer then the application will also delete in the database
    if(application.deletedBy.jobSeaker === true && application.deletedBy.employer === true){
        await application.deleteOne();
    }

    res.status(201).json({
        success:true,
        message:"Application Successfully Deleted!"
    })
})
