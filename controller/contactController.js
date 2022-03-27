const Contact=require("../model/contactModel");

const addContact=async(req,res)=>{
    try{
        const {name,email,message,currDate}=req.body;

        const existingContact=await Contact.findOne({email});

        if(existingContact){
            res.status(400).json({
                errorMessage:"Message already sent"
            })
        }

        else{
            const newContact=new Contact({
                name,email,message,currDate
            });

            const savedContact=await newContact.save();

            res.json(savedContact);
        }


    }
    catch(err){
        console.log(err);
        res.status(500).send();
    }
}


module.exports={addContact};