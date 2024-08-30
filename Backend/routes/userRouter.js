const express = require("express")
const router = express.Router()
const userController = require("../controllers/userController.js");
const {isAuthenticated} = require("../middlewares/auth.js")

router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/logout",isAuthenticated,userController.logout)
router.get("/getUser",isAuthenticated,userController.getUser)
router.put("/update/profile",isAuthenticated,userController.updateProfile)
router.put("/update/password",isAuthenticated,userController.updatePassword)

module.exports = router;
