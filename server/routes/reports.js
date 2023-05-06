const express = require("express");
const router = express.Router();

//contorllers
const {
  create_report,
  //   get_citizen,
  //   update_citizen,
  //   delete_citizen,
} = require("../controllers/report");

//edited

router.post("/create/record", create_report);
// router.get("/g/record", get_citizen);
// router.post("/u/record", update_citizen);
// //softdelete
// router.post("/d/record", delete_citizen);

module.exports = router;
