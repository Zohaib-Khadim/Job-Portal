const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const validator = require("validator")

const userSchema = Schema({
    username:{
        type:String,
        required:true,
        minLength : [3 , "Your Name must contain at least 3 charactors"],
        maxLength : [30 , "Your Name must not longer than 30 charactors"]
    },
    email:{
        type:String,
        required:true,
        validate : [validator.isEmail, "Please Provide a Valid email"]
    },
    phoneNumber:{
        type:Number,
        required:true,
    },
    address : {
        type:String,
        required:true,
    },
    niches:{
        firstNiche : String,
        secondNiche : String,
        thirdNiche : String
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Your Password must be at least 8 charactors"],
        maxLength:[32,"Your Password must not longer than 32 charactors"],
        select:false //agr user k details ko get kia jaya to is k sath password na aya jb tk hm isa manually get na kara is lia hmna is a select false kr dia ha
    },
    role:{
        type:String,
        enum:["Job Seaker", "Employer"]
    },
    createdAt:{
        type:Date,
        default:Date.now

    },
    resume:{
        public_id : String,
        url : String
    },
    coverLetter:{
        type:String
    }
})

//For the seak of password hashing we are going to bcrypt the password then our password will be save 
userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
 // Here 10 is the salt round means how many rounds our password will be more complex
    this.password = await bcrypt.hash(this.password,10)
})

// For the seak of compare the passowrd of the user new encrypted and the older simple password
userSchema.methods.comparePassword = async function(enteredPasword){
    return await bcrypt.compare(enteredPasword , this.password)
}


// Her we are generating the token 
userSchema.methods.getJWTToken = function (){
    //Token Payload
// const payload = {id:this._id};
// console.log(payload);

// sign mthod create a token and accept 3 parameters 
//1>>payload      2>>>jwt secret key     3>>>>options like their expiration date etc
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE
   })
}

const User = mongoose.model("User",userSchema);
module.exports = User;