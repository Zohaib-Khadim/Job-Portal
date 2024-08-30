const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true,
        enum:["Full_time","Part_time"]
    },
    introduction:{
        type:String,
    },
    location:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true
    },
    responsibilities:{
        type:String,
        required:true
    },
    qualifications:{
        type:String,
        required:true
    },
    offers:{
        type:String,
    },
    salary:{
        type:String,
        required:true
    },
    hiringMultipleCandidates:{
        type:String,
        default:"no",
        enum:["yes","no"]
    },
    personalWebsite:{
        title:String,
        url:String
    },
    jobNiche :{
        type:String,
        required:true
    },
    newsLettersSend:{
        type:Boolean,
        default:false
    },
    jobPostedOn:{
        type:Date,
        default:Date.now,
    },
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

})
const Job = mongoose.model("Job",jobSchema)
module.exports = Job;