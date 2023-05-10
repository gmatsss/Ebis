const express = require("express");
const router = express.Router();

//contorllers
const {
  create_report,
  get_report,
  one_report,
  update_report,
  delete_report,
  create_setup,
} = require("../controllers/report");

router.post("/create/record", create_report);
router.get("/g/record", get_report);
router.get("/g/r/record/:id", one_report);
router.post("/u/record", update_report);
router.post("/u/setup/record", create_setup);

// //softdelete
router.post("/d/record", delete_report);

module.exports = router;
