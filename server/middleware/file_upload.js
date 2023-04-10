const Complain = require("../models/Lupon");

exports.file_upload = async (req, res) => {
  try {
    const param = req.fromthis;
    const data = await Complain.findOne({ _id: param });
    if (!data) throw createError(403, `Complain not found!`);
    let filehold = req.files.file; // library express file upload //complainant
    let filehold2 = req.files.file2; // library express file upload //respondent
    console.log(filehold2);
    filehold.mv(`../client/public/img/` + filehold.name); // to get the file in fetch by formdata and save in path/folder
    filehold2.mv(`../client/public/img/` + filehold2.name);
    const imageofcomp = filehold.name;
    const imageofresp = filehold2.name;
    console.log(imageofresp);
    data.imageofcomp = imageofcomp;
    data.imageofresp = imageofresp;
    data.save();

    res.send({ success: `Successfully Created` });
  } catch (e) {
    res.send({ success: `Successfully Created` });
  }
};
