import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-grid-system";
import { TextField } from "@mui/material";
import Button from "../../share/FormElements/Button";
import { toast } from "react-toastify";
import { useFetch } from "../../api/lupon";

const lupon_complainant = (props) => {
  const { sendRequest } = useFetch();
  //file upload

  const [selectedFile, setSelectedFile] = useState();

  //form ustate code
  const [complainant, setComplainant] = useState({
    caseno: "",
    nameofcomp: "",
    imageofcomp: "",
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

  const handle_saved = () => {
    const formData = new FormData();

    formData.append("file", selectedFile);
    formData.append("caseno", complainant.caseno);
    formData.append("nameofcomp", complainant.nameofcomp);

    fetch("http://localhost:8001/lupon/create/record", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Success:", result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  //instructions
  const [param, setParam] = useState(0);
  const onCountReceived = (param) => {
    // console.log(param);
    setParam(param);
    if (param == "ADD") {
      setCommandAction(true);
      setComplainant({
        caseno: "",
        nameofcomp: "",
        imageofcomp: "",
      });
    } else if (param == "CANCEL") {
      setComplainant({
        caseno: "",
        nameofcomp: "",
        imageofcomp: "",
      });
      setCommandAction(false);
    } else if (param == "REFRESH") {
      setComplainant({
        caseno: "",
        nameofcomp: "",
        imageofcomp: "",
      });
      setCommandAction(false);
    } else if (param == "SAVED") {
      handle_saved();
      setComplainant({
        caseno: "",
        nameofcomp: "",
        imageofcomp: "",
      });
      setCommandAction(false);
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
      caseno: data_table.caseno,
      nameofcomp: data_table.nameofcomp,
      imageofcomp: data_table.imageofcomp,
    });
  }, [props, datain]);

  //bridge data incoming to lupon page
  props.PassdataCreator(Datareceived);
  props.receiverCreator(onCountReceived);

  return (
    <Row>
      <Col xs={12} md={12} lg={2} className="lagyan">
        <TextField
          variant={!commandAction ? "standard" : "outlined"}
          type="text"
          className="form-control"
          label="caseno"
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

        <TextField
          variant={!commandAction ? "standard" : "outlined"}
          type="text"
          className="form-control"
          label="Name"
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
      </Col>
      <Col>
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

        {/* end of img */}
      </Col>
    </Row>
  );
};

export default lupon_complainant;
