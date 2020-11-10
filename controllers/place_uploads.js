const multer=require('multer')

// const upload = multer({
//     limits: {
//         fileSize: 1000000
//     },
//     fileFilter(req, file, cb) {
//         if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//             return cb(new Error('please upload an image'))
//         }
//         cb(undefined, true)
//     }
// })

// module.exports=upload

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    
    filename: function (req, file, cb) {
        cb(null, Date.now()+'-'+file.originalname)
    }
});

const fileFilter = (req,file,cb) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
}}
const upload = multer({storage: storage, fileFilter : fileFilter});
module.exports=upload