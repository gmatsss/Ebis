const express = require("express");
const router = express.Router();

var fileupload = require("express-fileupload");

router.use(fileupload());

//contorllers
const {
  create_complain,
  get_complain,
  update_complain,
  delete_complain,
} = require("../controllers/Lupon");
const { file_upload } = require("../middleware/file_upload");

router.post("/create/record", create_complain, file_upload);
router.get("/g/record", get_complain);
router.post("/u/record", update_complain, file_upload);
//softdelete
router.post("/d/record", delete_complain);

module.exports = router;
