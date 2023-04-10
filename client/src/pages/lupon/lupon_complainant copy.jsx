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
  const [selectedFile, setSelectedFile] = useState();

  //form ustate code
  const [complainant, setComplainant] = useState({
    _id: "",
    caseno: "",
    nameofcomp: "",
    imageofcomp: "",
    // genderofcomp: "",
    // addressofcomp: "",
    // phoneofcomp: "",
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
    });
    setSelectedFile("");
  };

  const handle_saved = async () => {
    if (param == "ADD") {
      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("caseno", complainant.caseno);
      formData.append("nameofcomp", complainant.nameofcomp);

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
      formData.append("caseno", complainant.caseno);
      formData.append("nameofcomp", complainant.nameofcomp);

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
      imageofcomp: data_table.imageofcomp,
    });
  }, [props, datain]);

  //bridge data incoming to lupon page
  props.PassdataCreator(Datareceived);
  props.receiverCreator(onCountReceived);

  return (
    // <Row>
    //   {/* caseno */}

    //   <Col xs={12} md={12} lg={2} className="lagyan">

    //     {/* gender */}
    //     {/* <FormControl fullWidth>
    //       <InputLabel id="demo-simple-select-label">Gender</InputLabel>
    //       <Select
    //         labelId="demo-simple-select-label"
    //         id="demo-simple-select"
    //         value={complainant.gender}
    //         label="Age"
    //         onChange={handleChange}
    //         disabled={!commandAction ? "disabled" : ""}
    //         style={
    //           !commandAction
    //             ? { backgroundColor: "lightgrey" }
    //             : { backgroundColor: "" }
    //         }
    //       >
    //         <MenuItem value={"Male"}>Male</MenuItem>
    //         <MenuItem value={"Female"}>Female</MenuItem>
    //       </Select>
    //     </FormControl> */}

    //     {/* address */}

    //     {/* <TextField
    //       variant={!commandAction ? "standard" : "outlined"}
    //       type="text"
    //       className="form-control"
    //       label="Address"
    //       name="Address"
    //       placeholder="Address"
    //       value={complainant.nameofcomp}
    //       onChange={(e) =>
    //         setComplainant({ ...complainant, nameofcomp: e.target.value })
    //       }
    //       error={
    //         commandAction ? (!complainant.nameofcomp ? true : false) : false
    //       }
    //       helperText={
    //         commandAction
    //           ? !complainant.nameofcomp
    //             ? "Name is required"
    //             : ""
    //           : false
    //       }
    //       autoComplete="off"
    //       disabled={!commandAction ? "disabled" : ""}
    //       style={
    //         !commandAction
    //           ? { backgroundColor: "lightgrey" }
    //           : { backgroundColor: "" }
    //       }
    //     /> */}
    //   </Col>

    //   <Col>

    //     {/* end of img */}
    //   </Col>

    // </Row>

    <div className="container">
      <div className="row">
        <div className="col">
          <TextField
            variant={!commandAction ? "standard" : "outlined"}
            type="text"
            className="form-control"
            label="Case no"
            name="caseno"
            placeholder="caseno"
            value={complainant.caseno}
            onChange={(e) =>
              setComplainant({ ...complainant, caseno: e.target.value })
            }
            error={commandAction ? (!complainant.caseno ? true : false) : false}
            helperText={
              commandAction
                ? !complainant.caseno
                  ? "CaseNo is required"
                  : ""
                : false
            }
            autoComplete="off"
            disabled={!commandAction ? "disabled" : ""}
            style={
              !commandAction
                ? { backgroundColor: "lightgrey" }
                : { backgroundColor: "" }
            }
          />

          {/* name */}

          <TextField
            variant={!commandAction ? "standard" : "outlined"}
            type="text"
            className="form-control"
            label="Name of complainant"
            name="Name"
            placeholder="Name"
            value={complainant.nameofcomp}
            onChange={(e) =>
              setComplainant({ ...complainant, nameofcomp: e.target.value })
            }
            error={
              commandAction ? (!complainant.nameofcomp ? true : false) : false
            }
            helperText={
              commandAction
                ? !complainant.nameofcomp
                  ? "Name is required"
                  : ""
                : false
            }
            autoComplete="off"
            disabled={!commandAction ? "disabled" : ""}
            style={
              !commandAction
                ? { backgroundColor: "lightgrey" }
                : { backgroundColor: "" }
            }
          />
        </div>
        <div className="col">
          <div className="container">
            <div className="card" style={{ width: "15%" }}>
              <img
                className="card-img-top"
                src={`/img/${
                  !complainant.imageofcomp
                    ? "default.jpg"
                    : complainant.imageofcomp
                }`}
                alt="Card image"
                height="150"
                style={{ maxWidth: "100%" }}
              />
            </div>
            <div className="input-file-container" style={{ width: "15%" }}>
              <input
                disabled={!commandAction ? "disabled" : ""}
                className="input-file"
                type="file"
                name="file"
                onChange={changeHandler}
                style={
                  !commandAction
                    ? { backgroundColor: "lightgrey" }
                    : { backgroundColor: "" }
                }
              />
              <label
                tabIndex="0"
                For="my-file"
                className="input-file-trigger"
                style={
                  !commandAction
                    ? { backgroundColor: "lightgrey", color: "lightgrey" }
                    : { backgroundColor: "" }
                }
              >
                Select file
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default lupon_complainant;
