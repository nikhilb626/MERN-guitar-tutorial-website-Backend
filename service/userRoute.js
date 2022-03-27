const express=require("express");


const {addUser,loginUser,logoutUser,loggedInUser}=require("../controller/userController");

const router=express.Router();



router.post("/add",addUser);
router.post("/login",loginUser);
router.get("/logout",logoutUser);
router.get("/loggedIn",loggedInUser);


module.exports=router;