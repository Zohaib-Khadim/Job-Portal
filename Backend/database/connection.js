const mongoose = require("mongoose")

const connection = ()=> {
    mongoose.connect(process.env.MONGO_URL,{
        dbName : "JOB_PORTAL",
    }).then(()=>{
        console.log("connection to database is successfull");
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports = connection;