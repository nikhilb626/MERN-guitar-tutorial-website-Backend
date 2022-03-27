const User=require("../model/userModel");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const addUser=async(req,res)=>{
    try{
        let {name,classLevel,email,password}=req.body;

        // validation

        if(password.length<4){
            return res.status(404).json({
                errorMessage:"enter password of at least 4 characters"
            });
        }

        const existingUser=await User.findOne({email});
        
        if(existingUser){
            return res.status(500).json({
                errorMessage:"this email account already exist"
            })
        }


        // password hashing
        const salt=await bcrypt.genSalt();
        password=await bcrypt.hash(password,salt);


        const newUser=new User({
            name,email,password,classLevel
        });

        const savedUser=await newUser.save();

        // jwt

        const token=jwt.sign({
            user:savedUser._id
        },process.env.JWT_SECRET)


        res.cookie("token",token,{
            httpOnly:true
        }).send();




    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}



const loginUser=async(req,res)=>{
    try{

        const {email,password}=req.body;

        // validate

        const existingUser=await User.findOne({email});

        if(!existingUser){
            return res.status(400).json({
                errorMessage:"wrong credentials"
            })
        }


        // password matching boolean
        const passwordCorrect=await bcrypt.compare(password,existingUser.password);

        if(!passwordCorrect){
            return res.status(400).json({
                errorMessage:"wrong credentials"
            });
        }


        const token=jwt.sign({
            user:existingUser._id
        },process.env.JWT_SECRET);


        // send the token in the http only cookies

        res.cookie("token",token,{
            httpOnly:true
        }).json(existingUser);


    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}


const logoutUser=(req,res)=>{
    res.cookie("token","",{
        httpOnly:true,
        expires:new Date(0)
    }).send();
}



const loggedInUser=(req,res)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.json(false);
        }
        jwt.verify(token,process.env.JWT_SECRET);

        return res.json(true);
    }
    catch(err){
        return res.json(false);
    }
}




module.exports={addUser,loginUser,logoutUser,loggedInUser};