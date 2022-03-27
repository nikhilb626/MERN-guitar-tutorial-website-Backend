const express=require("express");

const {addContact}=require("../controller/contactController");


const router=express.Router();


router.post("/add",addContact);



module.exports=router;