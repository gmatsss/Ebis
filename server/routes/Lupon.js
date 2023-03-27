const express = require("express");
const router = express.Router();

//contorllers
const {
  create_complain,
  get_complain,
  update_complain,
  delete_complain,
} = require("../controllers/Lupon");

router.post("/create/record", create_complain);
router.get("/g/record", get_complain);
router.post("/u/record", update_complain);
//softdelete
router.post("/d/record", delete_complain);

module.exports = router;
