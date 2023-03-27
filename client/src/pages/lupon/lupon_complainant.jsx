import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col } from "react-grid-system";
import { TextField } from "@mui/material";
import Button from "../../share/FormElements/Button";
import { toast } from "react-toastify";

const lupon_complainant = (props) => {
  //form disabled
  const [commandAction, setCommandAction] = useState(false);
  const disableComponent = (status) => {
    setCommandAction(status);
  };

  //data in holder
  const [datain, setDatain] = useState("-");
  //form ustate code
  const [complainant, setComplainant] = useState({
    caseno: "",
    nameofcomp: "",
  });

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
      });
    } else if (param == "CANCEL") {
      setComplainant({
        caseno: "",
        nameofcomp: "",
      });
      setCommandAction(false);
    } else if (param == "REFRESH") {
      setComplainant({
        caseno: "",
        nameofcomp: "",
      });
      setCommandAction(false);
    }
  };

  const Datareceived = (datain) => {
    setDatain(datain);
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
          <div className="card" style={{ width: "10%" }}>
            <img
              className="card-img-top"
              src="/img/lire.jpg"
              alt="Card image"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div className="input-file-container">
          <input className="input-file" id="my-file" type="file" />
          <label tabIndex="0" For="my-file" className="input-file-trigger">
            Browse Img
          </label>
        </div>

        {/* end of img */}
      </Col>
    </Row>
  );
};

export default lupon_complainant;
