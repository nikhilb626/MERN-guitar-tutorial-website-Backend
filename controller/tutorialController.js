const Tutorial=require("../model/tutorialModel.js");


const addTutorial=async(req,res)=>{
    try{
        const {title,description,video,classLevel,uploadDateTime}=req.body;

        const existingTutorial=await Tutorial.findOne({video});

        if(existingTutorial){
            res.status(400).json({
                errorMessage:"tutorial already existed"
            })
        }
        else{
            const newTutorial=new Tutorial({
                title,description,video,classLevel,uploadDateTime
            });

            
            const savedTutorial=await newTutorial.save();

            res.json(savedTutorial);



        }


    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}



const getTutorials=async(req,res)=>{
    const classLevel=req.params.classLevel;
    try{
        const getTutors=await Tutorial.find({classLevel:classLevel});
        res.json(getTutors);

    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


const getTutorial=async(req,res)=>{
    const id=req.params.id;

    try{
        const getTutor=await Tutorial.find({_id:id});
        res.json(getTutor);
    }catch(err){
        console.log(err);
        res.status(500).send();
    }
}



module.exports={addTutorial,getTutorials,getTutorial};