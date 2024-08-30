const express = require("express")
const app = express();
const {config} = require("dotenv")
const cors = require("cors")
const cookieparser = require("cookie-parser")
const connection = require("./database/connection.js")
const {errorMiddleware} = require("./middlewares/error.js");
const fileUpload = require("express-fileupload");
const userRouter = require("./routes/userRouter.js")
const jobRouter = require("./routes/jobRouter.js")
const applicationRouter = require("./routes/applicationRouter.js");
const { newsLetterCron } = require("./automation/newsLetterCron.js");

config({path:"./config/config.env"})


// Connecting frontend with the help of cors
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))

//To Access Your Jsonwebtoken with the help of cookieparser
app.use(cookieparser())

//Your Date will be converted in the json form by using this middleware and by using urlencoded will tells you the type of data
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/",
}))

app.use("/api/v1/user",userRouter)
app.use("/api/v1/job",jobRouter)
app.use("/api/v1/application",applicationRouter)

newsLetterCron()

connection();

//Error Middleware
app.use(errorMiddleware)

module.exports = app;