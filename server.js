const express=require("express");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");

const cookieParser=require("cookie-parser");

const cors=require("cors");



const app=express();

dotenv.config({path:"./config.env"});

require("./db/conn");



const ContactRoutes=require("./service/contactRoute.js");
const UserRoutes=require("./service/userRoute.js");
const TutorialRoutes=require("./service/tutorialRoute.js");



app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(cookieParser());

app.use(cors({
    origin:[`http://localhost:3000`],
    credentials:true
}))


app.use("/contactApi",ContactRoutes);
app.use("/userApi",UserRoutes);
app.use("/tutorialApi",TutorialRoutes);


const PORT=process.env.PORT;

app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})