import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-grid-system";
import { TextField, InputLabel, FormControl } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { toast } from "react-toastify";
import { useFetch } from "../../api/lupon";

const lupon_complainant = (props) => {
  const { sendRequest } = useFetch();

  //instructions
  const [param, setParam] = useState(0);

  //file upload
  const [selectedFile, setSelectedFile] = useState("select file");

  const [selectedFile2, setSelectedFile2] = useState("select file");

  //form ustate code
  const [complainant, setComplainant] = useState({
    _id: "",
    caseno: "",
    nameofcomp: "",
    genderofcomp: "",
    addressofcomp: "",
    phoneofcomp: "",
    imageofcomp: "",
    nameofresp: "",
    genderofresp: "",
    addressofresp: "",
    phoneofresp: "",
    imageofresp: "",
  });

  //form disabled
  const [commandAction, setCommandAction] = useState(false);
  const disableComponent = (status) => {
    setCommandAction(status);
  };

  //data in holder
  const [datain, setDatain] = useState("-");

  const Datareceived = (datain) => {
    setDatain(datain);
  };

  //file upload
  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    //setIsSelected(true);
  };

  const changeHandler2 = (event) => {
    setSelectedFile2(event.target.files[0]);
    //setIsSelected(true);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // reset input
  const reset_input = () => {
    setComplainant({
      _id: "",
      caseno: "",
      nameofcomp: "",
      imageofcomp: "",
      genderofcomp: "",
      addressofcomp: "",
      phoneofcomp: "",
      imageofresp: "",
      nameofresp: "",
      genderofresp: "",
      addressofresp: "",
      phoneofresp: "",
    });
    setSelectedFile("");
    setSelectedFile2("");
  };

  const handle_saved = async () => {
    if (param == "ADD") {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("file2", selectedFile2);

      formData.append("caseno", complainant.caseno);
      formData.append("nameofcomp", complainant.nameofcomp);
      formData.append("genderofcomp", complainant.genderofcomp);
      formData.append("addressofcomp", complainant.addressofcomp);
      formData.append("phoneofcomp", complainant.phoneofcomp);

      formData.append("nameofresp", complainant.nameofresp);
      formData.append("genderofresp", complainant.genderofresp);
      formData.append("addressofresp", complainant.addressofresp);
      formData.append("phoneofresp", complainant.phoneofresp);

      try {
        if (!complainant.caseno)
          return toast.warning("Case no field is required");
        if (!complainant.nameofcomp)
          return toast.warning("Name of complainant field is required");
        const result = await sendRequest("/create/record", "POST", formData);
        //need throw err to access catch
        if (result.error) throw result.error;
        toast.success(result.success);
        reset_input();
        setCommandAction(false);
        props.onReload(true);
      } catch (err) {
        return toast.error(err);
      }
    } else {
      const formData = new FormData();

      formData.append("_id", complainant._id);
      formData.append("file", selectedFile);
      formData.append("file2", selectedFile2);

      formData.append("caseno", complainant.caseno);
      formData.append("nameofcomp", complainant.nameofcomp);
      formData.append("genderofcomp", complainant.genderofcomp);
      formData.append("addressofcomp", complainant.addressofcomp);
      formData.append("phoneofcomp", complainant.phoneofcomp);

      formData.append("nameofresp", complainant.nameofresp);
      formData.append("genderofresp", complainant.genderofresp);
      formData.append("addressofresp", complainant.addressofresp);
      formData.append("phoneofresp", complainant.phoneofresp);

      try {
        if (!complainant.caseno)
          return toast.warning("Case no field is required");
        if (!complainant.nameofcomp)
          return toast.warning("Name of complainant field is required");

        const result = await sendRequest("/u/record", "POST", formData);
        //need throw err to access catch
        if (result.error) throw result.error;
        toast.success(result.success);
        reset_input();
        setCommandAction(false);
        props.onReload(true);
      } catch (err) {
        return toast.error(err);
      }
    }
  };

  //instructions
  const onCountReceived = async (param) => {
    // console.log(param);
    setParam(param);
    if (param == "ADD") {
      setCommandAction(true);
      reset_input();
    } else if (param == "CANCEL") {
      reset_input();
      setCommandAction(false);
    } else if (param == "REFRESH") {
      reset_input();

      setCommandAction(false);
    } else if (param == "SAVED") {
      handle_saved();
    } else if (param == "EDIT") {
      setCommandAction(true);
    }
  };

  useEffect(() => {
    //Runs on the first render
    //And any time any dependency value changes ex datain is changing

    //setting datain datas
    const data_table = datain[0];

    //ustate using form ustate
    setComplainant({
      ...complainant,
      _id: data_table._id,
      caseno: data_table.caseno,
      nameofcomp: data_table.nameofcomp,
      genderofcomp: data_table.genderofcomp,
      addressofcomp: data_table.addressofcomp,
      phoneofcomp: data_table.phoneofcomp,
      imageofcomp: data_table.imageofcomp,
      nameofresp: data_table.nameofresp,
      genderofresp: data_table.genderofresp,
      addressofresp: data_table.addressofresp,
      phoneofresp: data_table.phoneofresp,
      imageofresp: data_table.imageofresp,
    });
  }, [props, datain]);

  //bridge data incoming to lupon page
  props.PassdataCreator(Datareceived);
  props.receiverCreator(onCountReceived);

  return (
    <div className="container-12">
      <div
        className="row text-center text-muted"
        style={commandAction ? { display: "none" } : { display: "" }}
      >
        <h3>
          Case No: <span>{complainant.caseno}</span>
        </h3>
      </div>
      <div className="row justify-content-around">
        {/* complinant */}
        <div className="card float-left col-lg-5 shadow bg-body rounded  ">
          <div className="row mb-2 text-primary">
            <h1>Complainant</h1>
          </div>

          <div className="row">
            {/* img */}
            <div className="col-sm-6 col-lg-6 mb-4 ">
              <div className="card ">
                <img
                  className="card-img-top "
                  src={`/img/${
                    !complainant.imageofcomp
                      ? "default.jpg"
                      : complainant.imageofcomp
                  }`}
                  alt="Card image"
                  height="150"
                  style={{ maxWidth: "100%", height: "260px" }}
                />
              </div>
              <div className="input-file-container">
                <input
                  disabled={!commandAction ? "disabled" : ""}
                  className="input-file"
                  type="file"
                  name="file"
                  onChange={changeHandler}
                />
                <label
                  tabIndex="0"
                  For="my-file"
                  className="input-file-trigger"
                  style={
                    !commandAction
                      ? {
                          backgroundColor: "#F0EEED",
                          display: "none",
                          textAlign: "center",
                        }
                      : { backgroundColor: "", textAlign: "center" }
                  }
                >
                  {!selectedFile
                    ? !complainant.imageofcomp
                      ? "Please select image"
                      : complainant.imageofcomp
                    : selectedFile.name}
                </label>
              </div>
            </div>
            {/* inputs */}
            <div className="col-sm-6 col-lg-6">
              <div className="row">
                <div className="col-12">
                  <TextField
                    variant="standard"
                    type="text"
                    className="form-control"
                    label="Case No"
                    name="Name"
                    placeholder="Name"
                    style={
                      !commandAction ? { display: "none" } : { display: "" }
                    }
                    value={complainant.caseno}
                    onChange={(e) =>
                      setComplainant({
                        ...complainant,
                        caseno: e.target.value,
                      })
                    }
                    error={
                      commandAction
                        ? !complainant.caseno
                          ? true
                          : false
                        : false
                    }
                    autoComplete="off"
                    disabled={!commandAction ? "disabled" : ""}
                  />
                  <TextField
                    variant="standard"
                    type="text"
                    className="form-control my-2"
                    label="Name of complainant"
                    name="Name"
                    placeholder="Name"
                    value={complainant.nameofcomp}
                    onChange={(e) =>
                      setComplainant({
                        ...complainant,
                        nameofcomp: e.target.value,
                      })
                    }
                    error={
                      commandAction
                        ? !complainant.nameofcomp
                          ? true
                          : false
                        : false
                    }
                    autoComplete="off"
                    disabled={!commandAction ? "disabled" : ""}
                  />
                  <FormControl
                    fullWidth
                    variant="standard"
                    disabled={!commandAction ? "disabled" : ""}
                    error={
                      commandAction
                        ? !complainant.genderofcomp
                          ? true
                          : false
                        : false
                    }
                  >
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={complainant.genderofcomp}
                      label="Gender"
                      onChange={(e) =>
                        setComplainant({
                          ...complainant,
                          genderofcomp: e.target.value,
                        })
                      }
                      disabled={!commandAction ? "disabled" : ""}
                    >
                      <MenuItem
                        value={
                          !complainant.genderofcomp
                            ? "Female"
                            : complainant.genderofcomp !== "Female"
                            ? "Female"
                            : complainant.genderofcomp
                        }
                      >
                        Female
                      </MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    variant="standard"
                    type="text"
                    className="form-control my-2"
                    label="Address"
                    name="Name"
                    placeholder="Name"
                    value={complainant.addressofcomp}
                    onChange={(e) =>
                      setComplainant({
                        ...complainant,
                        addressofcomp: e.target.value,
                      })
                    }
                    error={
                      commandAction
                        ? !complainant.addressofcomp
                          ? true
                          : false
                        : false
                    }
                    autoComplete="off"
                    disabled={!commandAction ? "disabled" : ""}
                  />
                  <TextField
                    variant="standard"
                    type="number"
                    className="form-control my-2"
                    label="Phone Number"
                    name="Name"
                    placeholder="Name"
                    value={complainant.phoneofcomp}
                    onChange={(e) =>
                      setComplainant({
                        ...complainant,
                        phoneofcomp: e.target.value,
                      })
                    }
                    error={
                      commandAction
                        ? !complainant.phoneofcomp
                          ? true
                          : false
                        : false
                    }
                    autoComplete="off"
                    disabled={!commandAction ? "disabled" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Respondent */}
        <div className="card float-right col-lg-5 shadow bg-body rounded  ">
          <div className="row mb-2 text-danger ">
            <h1>Respondent</h1>
          </div>

          <div className="row">
            {/* img */}
            <div className="col-sm-6 col-lg-6 mb-4">
              <div className="card ">
                <img
                  className="card-img-top "
                  src={`/img/${
                    !complainant.imageofresp
                      ? "default.jpg"
                      : complainant.imageofresp
                  }`}
                  alt="Card image"
                  height="150"
                  style={{ maxWidth: "100%", height: "260px" }}
                />
              </div>
              <div className="input-file-container">
                <input
                  disabled={!commandAction ? "disabled" : ""}
                  className="input-file"
                  type="file"
                  name="file"
                  onChange={changeHandler2}
                />
                <label
                  tabIndex="0"
                  For="my-file"
                  className="input-file-trigger"
                  style={
                    !commandAction
                      ? { backgroundColor: "#F0EEED", display: "none" }
                      : { backgroundColor: "", textAlign: "center" }
                  }
                >
                  {!selectedFile2
                    ? !complainant.imageofresp
                      ? "Please select image"
                      : complainant.imageofresp
                    : selectedFile2.name}
                </label>
              </div>
            </div>
            {/* inputs */}
            <div className="col-sm-6 col-lg-6">
              <div className="row">
                <div className="col-12 text-end">
                  <TextField
                    variant="standard"
                    type="text"
                    className="form-control my-2 "
                    label="Name of respondent"
                    value={complainant.nameofresp}
                    onChange={(e) =>
                      setComplainant({
                        ...complainant,
                        nameofresp: e.target.value,
                      })
                    }
                    error={
                      commandAction
                        ? !complainant.nameofresp
                          ? true
                          : false
                        : false
                    }
                    autoComplete="off"
                    disabled={!commandAction ? "disabled" : ""}
                  />
                  <FormControl
                    fullWidth
                    className="text-start"
                    variant="standard"
                    disabled={!commandAction ? "disabled" : ""}
                    error={
                      commandAction
                        ? !complainant.genderofresp
                          ? true
                          : false
                        : false
                    }
                  >
                    <InputLabel id="demo-simple-select-label">
                      Gender
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={complainant.genderofresp}
                      label="Gender"
                      onChange={(e) =>
                        setComplainant({
                          ...complainant,
                          genderofresp: e.target.value,
                        })
                      }
                      disabled={!commandAction ? "disabled" : ""}
                    >
                      <MenuItem
                        value={
                          !complainant.genderofresp
                            ? "Female"
                            : complainant.genderofresp !== "Female"
                            ? "Female"
                            : complainant.genderofresp
                        }
                      >
                        Female
                      </MenuItem>
                      <MenuItem value={"Male"}>Male</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    variant="standard"
                    type="text"
                    className="form-control my-2"
                    label="Address"
                    value={complainant.addressofresp}
                    onChange={(e) =>
                      setComplainant({
                        ...complainant,
                        addressofresp: e.target.value,
                      })
                    }
                    error={
                      commandAction
                        ? !complainant.addressofresp
                          ? true
                          : false
                        : false
                    }
                    autoComplete="off"
                    disabled={!commandAction ? "disabled" : ""}
                  />
                  <TextField
                    variant="standard"
                    type="number"
                    className="form-control my-2"
                    label="Phone Number"
                    value={complainant.phoneofresp}
                    onChange={(e) =>
                      setComplainant({
                        ...complainant,
                        phoneofresp: e.target.value,
                      })
                    }
                    error={
                      commandAction
                        ? !complainant.phoneofresp
                          ? true
                          : false
                        : false
                    }
                    autoComplete="off"
                    disabled={!commandAction ? "disabled" : ""}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default lupon_complainant;
