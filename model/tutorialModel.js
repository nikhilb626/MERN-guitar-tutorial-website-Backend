const mongoose=require("mongoose");



const tutorialSchema=new mongoose.Schema({
    title:{type:String,required:true},
    video:{type:String,required:true},
    description:{type:String,required:true},
    classLevel:{type:String,required:true},
    uploadDateTime:{type:String,required:true}
})


const Tutorial=mongoose.model('tutorial',tutorialSchema);



module.exports=Tutorial;