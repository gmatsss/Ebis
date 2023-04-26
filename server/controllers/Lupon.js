const express = require("express"),
  createError = require("http-errors"),
  Complain = require("../models/Lupon");
DATE = require("./date");

const fs = require("fs");

const Complainss = require("../models/Lupon_complain");
const Docs = require("../models/Lupon_docs_complain");

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

    const compdate = req.body.compdate;
    const compnature = req.body.compnature;
    const description = req.body.description;
    const compstatus = req.body.compstatus;

    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

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

      compdate: compdate,
      compnature: compnature,
      description: description,
      compstatus: compstatus,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const case_exist = await Complain.findOne({ caseno: caseno });
    if (case_exist) throw createError(403, `Case No ${caseno} already saved!`);

    const newComplain = new Complain(details);
    const x = await newComplain.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    if (!req.files) {
      res.send({ success: `Successfully inserted to database` });
    } else {
      req.fromthis = x._id;
      next();
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_complain = async (req, res) => {
  try {
    //sort by code
    const x = await Complain.find({ Status: 1 }).sort({ DateModified: -1 });

    if (!x) throw createError(403, "Complain Not found!");

    //response with delay seconds
    setTimeout(function () {
      res.send(x);
    }, 1200);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.get_complain_one = async (req, res) => {
  try {
    //sort by code
    const id = req.params.id;
    const x = await Complain.find({ _id: id, Status: 1 });
    if (!x) throw createError(403, "Complain Not found!");
    res.send(x);
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

    const compdate = req.body.compdate;
    const compnature = req.body.compnature;
    const description = req.body.description;
    const compstatus = req.body.compstatus;

    // //change later modified by
    const Modifiedby = req.body.Modifiedby;
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

    x.compdate = compdate;
    x.compnature = compnature;
    x.description = description;
    x.compstatus = compstatus;

    //later update
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();

    // console.log(x);
    if (!req.files) {
      res.send({ success: `Successfully updated to database` });
    } else {
      req.fromthis = x._id;
      next();
    }
  } catch (e) {
    res.send({ error: e.message });
  }
};

//softdelete
exports.delete_complain = async (req, res) => {
  try {
    const _id = req.body._id;

    const Modifiedby = req.body.Modifiedby;

    const complain_exist = await Complainss.findOne({ compid: _id, Status: 1 });

    if (complain_exist)
      throw createError(
        403,
        `Cannot be erased since there is already a record in the complaint table.`
      );

    const document_exist = await Docs.findOne({ compid: _id, Status: 1 });

    if (document_exist)
      throw createError(
        403,
        `Cannot be erased since there is already a record in the Document table.`
      );

    const x = await Complain.findOne({ _id: _id });
    if (!x) throw createError(403, `Case not found!`);
    x.Status = 0;
    x.Modifiedby = Modifiedby;
    x.DateModified = DATE.dateWithTime();
    x.save();
    res.send({ success: "Case Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

//complain tabs
exports.get_complains = async (req, res) => {
  try {
    const id = req.params.id;
    //sort by code
    const x = await Complainss.find({ compid: id, Status: 1 }).sort({
      DateModified: -1,
    });

    if (!x) throw createError(403, "Complain Not found!");

    res.send(x);
  } catch (e) {
    res.send({ error: "Something went wrong, Please try again" });
  }
};

exports.create_complains = async (req, res, next) => {
  try {
    const compid = req.body.compid;
    const compdate = req.body.compdate;
    const compnature = req.body.compnature;
    const description = req.body.description;
    const compstatus = req.body.compstatus;

    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const details = {
      compid: compid,
      compdate: compdate,
      compnature: compnature,
      description: description,
      compstatus: compstatus,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const compnatureexist = await Complainss.findOne({
      compnature: compnature,
      compid: { $eq: compid },
    });
    if (compnatureexist)
      throw createError(403, `Complain nature ${compnature} already saved!`);

    const newComplainss = new Complainss(details);
    const x = await newComplainss.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.update_complains = async (req, res, next) => {
  try {
    const _id = req.body._id;
    const compid = req.body.compid;
    const compdate = req.body.compdate;
    const compnature = req.body.compnature;
    const description = req.body.description;
    const compstatus = req.body.compstatus;

    // //change later modified by
    const Modifiedby = req.body.Modifiedby;

    const compnatureexist = await Complainss.findOne({
      compnature: compnature,
      compid: { $eq: compid },
      _id: { $ne: _id },
    });

    if (compnatureexist)
      throw createError(403, `Complain nature ${compnature} already saved!`);

    const x = await Complainss.findOne({ _id: _id });
    if (!x) throw createError(403, `Complain not found!`);

    x.compdate = compdate;
    x.compnature = compnature;
    x.description = description;
    x.compstatus = compstatus;

    //later update
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    const resu = x.save();

    if (!resu) throw createError(403, "Something went wrong while saving");

    res.send({ success: `Successfully Updated` });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_complains = async (req, res) => {
  try {
    const _id = req.body._id;

    const Modifiedby = req.body.Modifiedby;

    const x = await Complainss.findOne({ _id: _id });
    if (!x) throw createError(403, `Case not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();
    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

//document
exports.create_docs = async (req, res, next) => {
  try {
    const compid = req.body.id;
    const Createdby = req.body.Createdby;
    const Modifiedby = req.body.Modifiedby;

    const doc_file = req.files.doc_file; // library express file upload //Complainssant
    doc_file.mv(`../client/public/docs/` + doc_file.name);

    const details = {
      compid: compid,
      docname: doc_file.name,
      DateCreated: DATE.dateWithTime(),
      Createdby: Createdby,
      DateModified: DATE.dateWithTime(),
      Modifiedby: Modifiedby,
      Status: 1,
    };

    const case_exist = await Docs.findOne({
      docname: doc_file.name,
      compid: { $eq: compid },
    });
    if (case_exist)
      throw createError(403, `Document ${doc_file.name} already saved!`);

    const newDocs = new Docs(details);
    const x = await newDocs.save(); //saving to db

    if (!x) throw createError(403, "Something went wrong while creating");

    res.send({ success: "Document saved" });
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.get_docs = async (req, res) => {
  try {
    const id = req.params.id;
    //sort by code
    const x = await Docs.find({ compid: id, Status: 1 }).sort({
      DateModified: -1,
    });

    if (!x) throw createError(403, "Complain Not found!");

    res.send(x);
  } catch (e) {
    res.send({ error: e.message });
  }
};

exports.delete_docs = async (req, res) => {
  try {
    const _id = req.body._id;

    // console.log(_id);
    const Modifiedby = req.body.Modifiedby;

    const x = await Docs.findOne({ _id: _id });
    if (!x) throw createError(403, `Docs not found!`);
    x.Status = 0;
    (x.DateModified = DATE.dateWithTime()), (x.Modifiedby = Modifiedby);
    x.save();
    res.send({ success: "Successfully Delete" });
  } catch (e) {
    res.send({ error: e.message });
  }
};
