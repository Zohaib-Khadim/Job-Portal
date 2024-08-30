const express = require("express")
const router = express.Router()
const applicationController = require("../controllers/applicationController.js");
const {isAuthenticated,isAuthorized} = require("../middlewares/auth.js")

router.post("/post/:id",isAuthenticated,isAuthorized("Job Seaker"),applicationController.postApplication)
router.get("/employer/getall",isAuthenticated,isAuthorized("Employer"),applicationController.employerGetAllApplication)
router.get("/jobeseaker/getall",isAuthenticated,isAuthorized("Job Seaker"),applicationController.jobSeakerGetAllApplication)
router.delete("/delete/:id",isAuthenticated,applicationController.deleteApplication)


module.exports = router;