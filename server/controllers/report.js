const DATE = require("./date");
const reports = require("../models/reports");
const createError = require("http-errors");

exports.create_report = async (req, res) => {
  try {
    const reportname = req.body.reportname;
    const menuname = req.body.menuname;
    const categoryname = req.body.categoryname;
    const reportsetup = req.body.reportsetup;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      reportname: reportname,
      menuname: menuname,
      categoryname: categoryname,
      reportsetup: reportsetup,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const MenuExist = await reports.findOne({ menuname: menuname });
    if (MenuExist)
      throw createError(403, `Menu name ${menuname} already saved!`);

    const newReport = new reports(details);
    const x = await newReport.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");
    console.log(x);
    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};
