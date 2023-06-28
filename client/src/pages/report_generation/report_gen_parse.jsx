import React, { useState, useEffect, useRef, useContext } from "react";
import { UserContext } from "../../UserContext";
import { useFetch as resident } from "../../api/resident";
import { useFetch as lupon } from "../../api/lupon_api";
import { useFetch as report } from "../../api/report";
import Select from "react-select";
import Parser from "html-react-parser";
import { MyWindowPortal } from "../../gen_report";
import { Button, TextField } from "@mui/material";
import ReactToPrint from "react-to-print";
import { toast } from "react-toastify";
const Report_parse = (props) => {
  const { user } = useContext(UserContext);
  const myContainer = useRef();
  const { sendRequest: residentreq } = resident();
  const { sendRequest: luponreq } = lupon();
  const { sendRequest: reportreq } = report();
  //residents
  const [options, setOptions] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  //lupon
  const [luponoptions, setLuponOptions] = useState("");
  const [selectedValuelupon, setSelectedValuelupon] = useState("");

  const [showWindowPortal, setShowWindowPortal] = useState(false);
  const [bclearance, setBclerance] = useState({
    name: "",
    address: "",
    dob: "",
    purpose: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [disgenreport, setDisgenreport] = useState("");

  let shouldlog = useRef(true);
  // datatable in to pass
  useEffect(() => {
    if (shouldlog.current) {
      shouldlog.current = false;
      getHandler();
    }
  }, []);

  useEffect(() => {
    setDisgenreport("");
    setBclerance({
      ...bclearance,
      name: "",
      address: "",
      dob: "",
      purpose: "",
    });
    setSelectedValue("");
  }, [props.receivesetup]);

  const getHandler = async () => {
    try {
      //alert loading
      const arr = [];
      const result = await residentreq(
        `/g/r/record/${user.barangay}/${user.district}`,
        "GET"
      );
      if (result && result.error) return toast.error({ error: result.error });
      await result.map((res) => {
        return arr.push({
          value: res._id,
          label: res.firstname + "," + res.lastname,
        });
      });
      setOptions(arr);

      //case lupon
      const lupon_arr = [];
      const lupon_result = await luponreq(
        `/g/record/${user.barangay}/${user.district}/${user.city}/${user.province}/${user.region}/`,
        "GET"
      );
      if (lupon_result && lupon_result.error)
        return toast.error({ error: lupon_result.error });
      await lupon_result.map((res) => {
        return lupon_arr.push({
          value: res._id,
          label: res.caseno + " , " + res.case_nature,
        });
      });
      setLuponOptions(lupon_arr);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = async (selected) => {
    const resident_one = await residentreq(
      `/one/r/record/${selected.value}`,
      "GET"
    );

    setBclerance({
      ...bclearance,
      name: resident_one.firstname + "," + resident_one.lastname,
      address: resident_one.address,
      dob: resident_one.dateofbirth,
    });
    setSelectedValue(selected);
  };

  const [getcase, setGetcase] = useState("");
  const handleChangelupon = async (selected) => {
    setSelectedValuelupon(selected);
    const result = await reportreq(`/g/c/record/${selected.value}`, "GET");
    setGetcase(result);
  };

  function Genreport() {
    if (!props.receivesetup) return;
    if (props.receivesetup.reportname === "rpt_Barangayclearance") {
      return (
        <div
          className="d-flex flex-column justify-content-evenly"
          style={{ height: "120px" }}
        >
          <Select
            placeholder="Select resident name"
            options={options}
            isLoading={options ? false : true}
            onChange={handleChange}
            value={selectedValue}
          />

          <TextField
            autoFocus
            variant="outlined"
            label="Purpose for clearance"
            inputRef={(input) => {
              if (input != null) {
                input.focus();
              }
            }}
            value={bclearance.purpose}
            onChange={(e) =>
              setBclerance({
                ...bclearance,
                purpose: e.target.value,
              })
            }
          />
        </div>
      );
    }
    if (props.receivesetup.reportname === "rpt_VehicleEntry") {
      return (
        <div
          className="d-flex flex-column justify-content-evenly"
          style={{ height: "120px" }}
        >
          <Select
            placeholder="Select resident name"
            options={options}
            isLoading={options ? false : true}
            onChange={handleChange}
            value={selectedValue}
          />
        </div>
      );
    }
    if (props.receivesetup.reportname === "rpt_BusinessClearance") {
      return (
        <div
          className="d-flex flex-column justify-content-evenly"
          style={{ height: "120px" }}
        >
          <Select
            placeholder="Select resident name"
            options={options}
            isLoading={options ? false : true}
            onChange={handleChange}
            value={selectedValue}
          />
        </div>
      );
    }
    if (props.receivesetup.reportname === "rpt_VehicleEntry") {
      return (
        <div
          className="d-flex flex-column justify-content-evenly"
          style={{ height: "120px" }}
        >
          <Select
            placeholder="Select resident name"
            options={options}
            isLoading={options ? false : true}
            onChange={handleChange}
            value={selectedValue}
          />
        </div>
      );
    }
    if (props.receivesetup.reportname === "rpt_Construction") {
      return (
        <div
          className="d-flex flex-column justify-content-evenly"
          style={{ height: "120px" }}
        >
          <Select
            placeholder="Select resident name"
            options={options}
            isLoading={options ? false : true}
            onChange={handleChange}
            value={selectedValue}
          />
        </div>
      );
    }
    if (props.receivesetup.reportname === "rpt_Indigency") {
      return (
        <div
          className="d-flex flex-column justify-content-evenly"
          style={{ height: "120px" }}
        >
          <Select
            placeholder="Select resident name"
            options={options}
            isLoading={options ? false : true}
            onChange={handleChange}
            value={selectedValue}
          />

          <TextField
            autoFocus
            variant="outlined"
            label="Purpose for Indegency"
            inputRef={(input) => {
              if (input != null) {
                input.focus();
              }
            }}
            value={bclearance.purpose}
            onChange={(e) =>
              setBclerance({
                ...bclearance,
                purpose: e.target.value,
              })
            }
          />
        </div>
      );
    }
    if (props.receivesetup.reportname === "rpt_certification") {
      return <div></div>;
    }
    if (props.receivesetup.categoryname === "Lupon") {
      return (
        <div
          className="d-flex flex-column justify-content-evenly"
          style={{ height: "120px" }}
        >
          <Select
            placeholder="Select Case"
            options={luponoptions}
            isLoading={luponoptions ? false : true}
            onChange={handleChangelupon}
            value={selectedValuelupon}
          />
        </div>
      );
    }
  }

  const display = () => {
    if (!props.receivesetup) return toast.error("Select report in the table");

    setShowWindowPortal(true);
    if (getcase) {
      var Arrayofresp = getcase.respondent.map((resp) => {
        return <span style={{ borderBottom: "1px solid" }}> {resp}, </span>;
      });

      var arrayofcomp = getcase.complainant.map((comp) => {
        return <span style={{ borderBottom: "1px solid" }}> {comp}, </span>;
      });

      var hearing = getcase.hearing.map((hear) => {
        return (
          <div
            className="container"
            style={{ borderBottom: "1px solid" }}
            key={hear._id}
          >
            <div className="row d-flex justify-content-center mt-4">
              <div className="col-5">
                <p>
                  Hearing Title:<span className="fw-bold">{hear.title}</span>
                </p>
                <p>
                  Hearing Date:
                  <span className="fw-bold">{hear.casedate}</span>
                </p>
                <p>
                  Case status:
                  <span
                    className={
                      hear.hearingstatus === "Settled"
                        ? "text-success fst-italic"
                        : "text-danger fst-italic"
                    }
                  >
                    {hear.hearingstatus}
                  </span>
                </p>
              </div>
              <div className="col-5">
                <p>
                  <span className="h5">Hearing outcome: </span>
                  <span style={{ borderBottom: "1px solid" }}>
                    {hear.hearingremarks}
                  </span>
                </p>
              </div>
            </div>
          </div>
        );
      });
    }

    setDisgenreport(
      Parser(props.receivesetup.reportsetup, {
        replace: (domNode) => {
          if (domNode.attribs && domNode.attribs.name === "citizen_name") {
            return (
              <span style={{ borderBottom: "1px solid" }}>
                {" "}
                {bclearance.name}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "citizen_address") {
            return (
              <span style={{ borderBottom: "1px solid" }}>
                {" "}
                {bclearance.address}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "citizen_dob") {
            return (
              <span style={{ borderBottom: "1px solid" }}>
                {bclearance.dob}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "purpose") {
            return (
              <span style={{ borderBottom: "1px solid" }}>
                {bclearance.purpose}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "date_issued") {
            return (
              <span style={{ borderBottom: "1px solid" }}>
                {bclearance.date}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "respondent") {
            return (
              <span style={{ borderBottom: "1px solid" }}>{Arrayofresp}</span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "complainant") {
            return (
              <span style={{ borderBottom: "1px solid" }}>{arrayofcomp}</span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "caseno") {
            return (
              <span
                className="fst-italic h3"
                style={{ borderBottom: "1px solid", color: "red" }}
              >
                {getcase.caseno}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "casenature") {
            return (
              <span
                className="fst-italic h5"
                style={{ borderBottom: "1px solid" }}
              >
                {getcase.casenature}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "description") {
            return (
              <span style={{ borderBottom: "1px solid" }}>
                {getcase.casedesc}
              </span>
            );
          }
          if (domNode.attribs && domNode.attribs.name === "hearing") {
            return <span style={{ borderBottom: "1px solid" }}>{hearing}</span>;
          }
        },
      })
    );
  };

  const handleClose = () => {
    setShowWindowPortal(false);
  };

  return (
    <div className="">
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-5">
            <Button
              variant="contained"
              onClick={() => {
                display();
              }}
            >
              Generate report
            </Button>
            <Genreport />
          </div>
        </div>
      </div>

      {showWindowPortal && (
        <MyWindowPortal>
          <div style={{ height: 720 }} className="overflow-auto">
            <div className="d-flex justify-content-end m-3">
              <Button
                variant="contained"
                color="error"
                onClick={() => handleClose()}
                className="me-3"
              >
                Cancel
              </Button>
              <ReactToPrint
                trigger={() => (
                  <Button
                    // onClick={() => Print(false)}
                    color="success"
                    variant="contained"
                  >
                    Print Report!
                  </Button>
                )}
                content={() => myContainer.current}
              />
            </div>

            <div ref={myContainer}>{disgenreport}</div>
          </div>
        </MyWindowPortal>
      )}
    </div>
  );
};

export default Report_parse;
