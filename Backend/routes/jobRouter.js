const express = require("express")
const router = express.Router()
const jobController = require("../controllers/jobController.js");
const {isAuthenticated,isAuthorized} = require("../middlewares/auth.js")


router.post("/post",isAuthenticated,isAuthorized("Employer"),jobController.jobPosted)
router.get("/getall",jobController.getAll)
router.get("/getmyjobs",isAuthenticated,isAuthorized("Employer"),jobController.getMyJobs)
router.delete("/delete/:id",isAuthenticated,isAuthorized("Employer"),jobController.deleteJob)
router.get("/get/:id",isAuthenticated,jobController.getASingleJob)


module.exports = router;