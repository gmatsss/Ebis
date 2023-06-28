import React, { useState, useContext } from "react";
import Report_table from "./report_gen_table";
import Report_parse from "./report_gen_parse";
import { Userloc } from "../../user_loc";
const Report_gen = () => {
  const [rersetup, setRersetup] = useState();
  const rsetup = (parms) => {
    if (!parms) return setRersetup("");
    setRersetup(parms[0]);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="d-flex">
          <h1>Report Generation</h1>
          <Userloc />
        </div>
      </div>
      <div className="row m-2 mt-3">
        <div className="col-6">
          <Report_table rsetup={rsetup} />
        </div>
        <div className="col-6">
          <Report_parse receivesetup={rersetup} />
        </div>
      </div>
    </div>
  );
};

export default Report_gen;
