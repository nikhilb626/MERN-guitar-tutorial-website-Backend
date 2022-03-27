const express=require("express");
const multer=require("multer");
const path=require("path");

// const {addFile}=require("../controller/videoController");
const {addTutorial,getTutorials,getTutorial}=require("../controller/tutorialController");
const auth=require("../middleware/auth");
const isAdmin=require("../middleware/admin");



const router=express.Router();



// router.post("/addVideo",auth,isAdmin,addFile);


const storage = multer.diskStorage({
    destination:function(req, file, cb) {
      cb(null, '../frontend/public/uploads/');
    },
    filename:function(req, file, cb) {
      cb(null,file.filename+"-"+Date.now()+path.extname(file.originalname))
    },
  });
  
  const upload = multer({ storage });
  
  router.post('/addVideo', auth,isAdmin, upload.single('file'), (req, res,next) => {
    const file=req.file;
    if(!file){
      const error=new Error("please upload a file")
      error.httpStatusCode=400;
      return next(error)
    }
    res.send(`/${req.file.path}`);
  });
  








router.post("/addTuts",auth,isAdmin,addTutorial);

router.get("/showTutorials/:classLevel",auth,getTutorials);


router.get("/showTutorial/:id",auth,getTutorial);


module.exports=router;