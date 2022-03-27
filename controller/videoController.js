// const multer=require("multer");



// // var storage=multer.diskStorage({
// //     destination:function(req,file,cb){
// //         cb(null,'uploads/')
// //     },filename:function(req,file,cb){
// //         cb(null,`${Date.now()}_${file.originalname}`)
// //     },fileFilter:(req,file,cb)=>{
// //         const ext=path.extname(file.originalname)
// //         if(ext!=='.mp4' || ext!=='jpg'){
// //             return cb(res.status(400).send('only mp4 file is allowed'),false);
// //         }
// //         cb(null,true)
// //     }
// // })


// const storage = multer.diskStorage({
//     destination:function(req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename:function(req, file, cb) {
//       cb(null,file.filename+"-"+Date.now()+path.extname(file.originalname))
//     },
//   });



// var upload=multer({storage:storage}).single("file");



// const addFile=async(req,res)=>{
//     try{
//         upload(req,res,err=>{
//             if(err){
//                 return res.json(err)
//             }
//             return res.json({filePath:res.req.file.path})
//         })

//     }
//     catch(err){
//         console.log(err);
//     }
// }



// module.exports={addFile};