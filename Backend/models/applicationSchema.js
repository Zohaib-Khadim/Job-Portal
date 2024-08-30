const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require("validator");


const applicationSchema = new Schema({
    jobSeakerInfo:{
        id:{
            type:Schema.Types.ObjectId,
            required:true,

        },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            validate : [validator.isEmail, "Please Provide a Valid email"]
        },
        phone:{
            type:Number,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        resume:{
            public_id:String,
            url:String
        },
        coverLetter:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true,
            enum:["Job Seaker"]
        }

    },
    employerInfo:{
        id:{
            type:Schema.Types.ObjectId,
            required:true,
            ref:"User"
        },
        role:{
            type:String,
            required:true,
            enum:["Employer"]
        }
    },
    jobInfo:{
        jobId:{
            type:String,
            required:true
        },
        jobTitle:{
            type:String,
            required:true
        }
    },
    deletedBy:{
        jobSeaker:{
            type:Boolean,
            default:false,
        },
        employer:{
            type:Boolean,
            default:false,
        }
    }
});

const application = mongoose.model("Application",applicationSchema);
module.exports = application