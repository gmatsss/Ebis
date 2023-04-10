const express = require("express"),
  createError = require("http-errors"),
  Complain = require("../models/Lupon");
DATE = require("./date");

exports.create_complain = async (req, res, next) => {
  try {
    const caseno = req.body.caseno;
    const nameofcomp = req.body.nameofcomp;
    const genderofcomp = req.body.genderofcomp;
    const addressofcomp = req.body.addressofcomp;
    const phoneofcomp = req.body.phoneofcomp;

    const nameofresp = req.body.nameofresp;
    const genderofresp = req.body.genderofresp;
    const addressofresp = req.body.addressofresp;
    const phoneofresp = req.body.phoneofresp;

    // // const Createdby = req.body.Createdby;
    // // const Modifiedby = req.body.Modifiedby;

    const details = {
      caseno: caseno,
      nameofcomp: nameofcomp,
      genderofcomp: genderofcomp,
      addressofcomp: addressofcomp,
      phoneofcomp: phoneofcomp,
      imageofcomp: "",
      nameofresp: nameofresp,
      genderofresp: genderofresp,
      addressofresp: addressofresp,
      phoneofresp: phoneofresp,
      imageofresp: "",

      compdate: "",
      compnature: "",
      description: "",
      compstatus: "",
      DateCreated: DATE.dateWithTime(),
      Createdby: "sample",
      DateModified: DATE.dateWithTime(),
      Modifiedby: "sample",
      Status: 1,
    };

    console.log(details);

    const case_exist = await Complain.findOne({ caseno: caseno });
    if (case_exist) throw createError(403, `Case No ${caseno} already saved!`);

    const newComplain = new Complain(details);
    const x = await newComplain.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    req.fromthis = x._id;
    next();
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_complain = async (req, res) => {
  try {
    //sort by code
    const x = await Complain.find({ Status: 1 }).sort({ DateCreated: -1 });

    if (!x) throw createError(403, "Complain Not found!");

    //response with delay seconds
    setTimeout(function () {
      res.send(x);
    }, 1200);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.update_complain = async (req, res, next) => {
  try {
    const caseno = req.body.caseno;
    const nameofcomp = req.body.nameofcomp;
    const genderofcomp = req.body.genderofcomp;
    const addressofcomp = req.body.addressofcomp;
    const phoneofcomp = req.body.phoneofcomp;

    const nameofresp = req.body.nameofresp;
    const genderofresp = req.body.genderofresp;
    const addressofresp = req.body.addressofresp;
    const phoneofresp = req.body.phoneofresp;

    // const compdate = req.body.compdate;
    // const compnature = req.body.compnature;
    // const description = req.body.description;
    // const compstatus = req.body.compstatus;
    // //change later modified by
    // const Modifiedby = req.body.Modifiedby;
    const _id = req.body._id;

    const case_exist = await Complain.findOne({
      caseno: caseno,
      _id: { $ne: _id },
    });
    if (case_exist) throw createError(403, `Case No ${caseno} already saved!`);

    const x = await Complain.findOne({ _id: _id });
    if (!x) throw createError(403, `Complain not found!`);

    x.caseno = caseno;
    x.nameofcomp = nameofcomp;
    x.genderofcomp = genderofcomp;
    x.addressofcomp = addressofcomp;
    x.phoneofcomp = phoneofcomp;
    x.nameofresp = nameofresp;
    x.genderofresp = genderofresp;
    x.addressofresp = addressofresp;
    x.phoneofresp = phoneofresp;

    // x.compdate = compdate;
    // x.compnature = compnature;
    // x.description = description;
    // x.compstatus = compstatus;

    //later update
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = "sample");
    x.save();

    // console.log(x);

    req.fromthis = x._id;
    next();
  } catch (e) {
    res.send({ error: e.message });
  }
};

//softdelete
exports.delete_complain = async (req, res) => {
  try {
    const _id = req.body._id;

    // const Modifiedby = req.body.Modifiedby;

    const x = await Complain.findOne({ _id: _id });
    if (!x) throw createError(403, `Case not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = "");
    x.save();
    res.send({ success: "Case Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};
