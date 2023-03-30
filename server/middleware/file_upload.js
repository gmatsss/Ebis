// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, `../client/public/img/`);
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   },
// });
// var upload = multer({ storage: storage });

// (exports.upload_file = upload.single("file")),
//   async function (req, res, next) {
//     if (req.file === null) {
//       return res.status(400).json({ msg: "No file uploaded" });
//     }

//     console.log(req.body);
//     console.log(req.file);

//     // try {
//     //   console.log(req.file);
//     // } catch (err) {
//     //   next(err);
//     // }
//   };
