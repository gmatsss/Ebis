import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";

import "../../share/css/gab.css";
//components
import Lupon_table from "./lupon_table";
import Lupon_complainant from "./lupon_complainant";
import Lupon_complain from "./lupon_complain";

const lupon_page = () => {
  //show page
  const [show, setShow] = useState(0);

  const show_handle = (show) => {
    // console.log(show);
    setShow(show);
  };

  //onclick table pass to form lupon
  const [datainfo, setDatainfo] = useState({});
  //data holder
  let Passdata = (datainfo) => {};
  // Data holder and passing to lupon forms
  const Getdata = (datainfo) => {
    Passdata && Passdata(datainfo);
  };
  //bridge to pass to lupon form
  const PassdataCreator = (handler) => {
    Passdata = handler;
  };

  //disable form
  const [param, setParam] = useState(0);

  let receiver = (param) => {
    // no-op
  };

  const trigger = (param) => {
    receiver && receiver(param);
  };

  const receiverCreator = (handler) => {
    receiver = handler;
    //alert('handler=' + handler);
  };

  const [reloadinfo, setreloadinfo] = useState(true);

  let Passreload = (reloadinfo) => {};
  // Data holder and passing to lupon forms
  const Getreload = (reloadinfo) => {
    Passreload && Passreload(reloadinfo);
  };
  //bridge to pass to lupon form
  const PassreloadCreator = (handler) => {
    Passreload = handler;
  };

  return (
    <div
      className="container-lg-12 px-1"
      style={{ height: "100%", backgroundColor: "" }}
    >
      <div className="row ">
        {/* sm 425px */}
        <div className="col-md-12 col-lg-12">
          <div className="py-1 text-muted row">
            <div className="col d-flex justify-content-between">
              <div>
                <h1>Barangay San Antonio, Makati City, Metro Manila </h1>
              </div>

              <div>
                <img src={`/img/logo.jpg`} alt="" style={{ height: "70px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ">
        {/* sm 425px */}
        <div className="col-md-12 col-lg-12">
          <div className="p-3">
            <div style={show === 0 ? { display: "" } : { display: "none" }}>
              <Lupon_complainant
                PassdataCreator={PassdataCreator}
                receiverCreator={receiverCreator}
                onReload={Getreload}
              />
            </div>

            <div style={show === 1 ? { display: "" } : { display: "none" }}>
              <Lupon_complain />
            </div>
          </div>
        </div>
      </div>

      <div className="row ">
        {/* sm 425px */}
        <div className="px-3  col-md-12 col-lg-12">
          <Lupon_table
            onPassdata={Getdata}
            onStateform={trigger}
            PassreloadCreator={PassreloadCreator}
            onShowpage={show_handle}
          />
        </div>
      </div>
    </div>
  );
};

export default lupon_page;
