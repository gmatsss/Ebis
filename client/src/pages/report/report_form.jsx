import Modal from "react-bootstrap/Modal";
import React, { useState, useContext, useEffect, useMemo, useRef } from "react";
import { Button, TextField, InputLabel, FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { useFetch } from "../../api/report";
import { useFetch as uselocation } from "../../api/location";
import { UserContext } from "../../UserContext";

const Report_form = (props) => {
  const { user } = useContext(UserContext);
  const { sendRequest } = useFetch();

  // modal state
  const [show, setShow] = useState(false);
  //save state
  const [insave, setInsave] = useState("");
  const handleClose = () => {
    setShow(false);
    reset_input();
    setInsave("");
  };

  const reset_input = () => {
    setReport({
      reportname: "",
      menuname: "",
      categoryname: "",
    });
  };

  const [report, setReport] = useState({
    _id: "",
    reportname: "",
    menuname: "",
    categoryname: "",
  });

  const onreceived = (data) => {
    if (data === "add") {
      setShow(true);
    } else if (data === "edit") {
      setShow(true);
      setInsave("edit");
      setReport({
        ...report,
        _id: props.reportone._id,
        reportname: props.reportone.reportname,
        menuname: props.reportone.menuname,
        categoryname: props.reportone.categoryname,
      });
    }
  };

  props.receiveadd(onreceived);

  const handle_saved = async () => {
    const details = {
      _id: report._id,
      barangay: user.barangay,
      district: user.district,
      city: user.city,
      province: user.province,
      region: user.region,
      reportname: report.reportname,
      menuname: report.menuname,
      categoryname: report.categoryname,
      Createdby: user.email,
      Modifiedby: user.email,
    };
    if (insave === "edit") {
      try {
        if (!report.reportname || !report.menuname || !report.categoryname)
          return toast.warning("Please fill out the required fields");

        const result = await sendRequest("/u/record", "POST", details);
        if (result && result.error) throw result.error;
        setShow(false);
        toast.success(result);
        reset_input();
        props.onreload(true);
        setInsave("");
      } catch (error) {
        return toast.error(error);
      }
    } else {
      try {
        if (!report.reportname || !report.menuname || !report.categoryname)
          return toast.warning("Please fill out the required fields");

        const result = await sendRequest("/create/record", "POST", details);
        if (result && result.error) throw result.error;
        setShow(false);
        toast.success(result);
        reset_input();
        props.onreload(true);
      } catch (error) {
        return toast.error(error);
      }
    }
  };

  return (
    <div>
      <Modal
        size="md"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title> Report</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <div className="d-flex flex-column  w-75 ">
            <TextField
              label="Report name"
              variant="outlined"
              className="m-2"
              value={report.reportname}
              onChange={(e) =>
                setReport({
                  ...report,
                  reportname: e.target.value,
                })
              }
              error={!report.reportname ? true : false}
            />
            <TextField
              label="Title"
              variant="outlined"
              className="m-2"
              value={report.menuname}
              onChange={(e) =>
                setReport({
                  ...report,
                  menuname: e.target.value,
                })
              }
              error={!report.menuname ? true : false}
            />

            <FormControl variant="outlined" className="m-2">
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Category"
                value={report.categoryname}
                onChange={(e) =>
                  setReport({
                    ...report,
                    categoryname: e.target.value,
                  })
                }
                error={!report.categoryname ? true : false}
              >
                <MenuItem
                  value={
                    !report.categoryname
                      ? "Permit"
                      : report.categoryname !== "Permit"
                      ? "Permit"
                      : report.categoryname
                  }
                >
                  Permit
                </MenuItem>
                <MenuItem value={"Clearance"}>Clearance</MenuItem>
                <MenuItem value={"Certificate"}>Certificate</MenuItem>
                <MenuItem value={"Lupon"}>Lupon</MenuItem>
                <MenuItem value={"Summary"}>Summary</MenuItem>
              </Select>
            </FormControl>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            className="me-3"
          >
            Cancel
          </Button>
          <Button variant="contained" color="success" onClick={handle_saved}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Report_form;
