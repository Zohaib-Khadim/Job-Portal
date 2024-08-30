const catchAsyncError = require("../middlewares/catchAsyncError.js");
const {ErrorHandler} = require("../middlewares/error.js");
const Job = require("../models/jobSchema.js");


module.exports.jobPosted = catchAsyncError(async (req, res, next) => {
    const {
        title,
        jobType,
        introduction,
        location,
        companyName,
        responsibilities,
        qualifications,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsiteTitle,
        personalWebsiteUrl,
        jobNiche
    } = req.body;

    if (!title || !jobType || !introduction || !location || !companyName || !responsibilities || !qualifications || !salary || !jobNiche) {
        return next(new ErrorHandler("Please Provide all the details of the Post!",400))
    }
    if ((personalWebsiteTitle && !personalWebsiteUrl)||(!personalWebsiteTitle &&  personalWebsiteUrl)){
        return next(new ErrorHandler("Provide both the website title and url or leave the both!",400))
    }

    const postedBy = req.user.id;
    const job = await Job.create({
        title,
        jobType,
        introduction,
        location,
        companyName,
        responsibilities,
        qualifications,
        offers,
        salary,
        hiringMultipleCandidates,
        personalWebsite:{
            title:personalWebsiteTitle,
            url:personalWebsiteUrl,
        },
        jobNiche,
        postedBy
    })
    res.status(201).json({
        success:true,
        message:"Job posted Successfully!",
        job
    })
})

module.exports.getAll = catchAsyncError(async(req,res,next)=>{
//Here we are getting data from query mean in url of localhost you write after the question mark this is a query
    const {city,niche ,searchKeyword} = req.query;
// Simple query object is created and the data will be added in it 
    const query = {};
//Here the city data will be added in the query
    if(city){
        query.location = city;
    }
// niche data in the query object
    if(niche){
        query.jobNiche = niche;
    }
// Here we will search on the basises of the title , compantName , introduction 
    if(searchKeyword){
//$or is a OR operator
        query.$or = [
// $regex operator is used for the matching in string from start to end
            {title:{$regex : searchKeyword , $options : "i"}},
            {companyName:{$regex:searchKeyword , $options : "i"}},
            {introduction:{$regex:searchKeyword , $options : "i"}},
        ]
    }
    const jobs = await Job.find(query);
    res.status(200).json({
        success:true,
        jobs,
        count:jobs.length
    })
})

module.exports.getMyJobs = catchAsyncError(async(req,res,next)=>{
    const myJob = await Job.find({postedBy:req.user.id});
    res.status(200).json({
        success:true,
        myJob
    })
})

module.exports.deleteJob = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const job = await Job.findById(id);

    if(!job){
        return next(new ErrorHandler("Oops ! This Post is not Found!",400))
    }
    await job.deleteOne();
    res.status(200).json({
        success:true,
        message:"Post Deleted Successfully!"
    })
})

module.exports.getASingleJob = catchAsyncError(async(req,res,next)=>{
    const {id} = req.params;
    const job = await Job.findById(id);

    if(!job){
        return next(new ErrorHandler("Oops ! This Post is not Found!",400))
    }
    
    res.status(200).json({
        success:true,
        job, 
    })
})
