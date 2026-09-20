// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function(req,file,cb){
//     cb(null , "public")
//   },
//   filename: function(req , file , cb){
//       const filename  = Date.now() + "-" + file.originalname;
//       cb(null , filename)
//   }
// })

// export const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024},
// });
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "public";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  }
});

export default upload;