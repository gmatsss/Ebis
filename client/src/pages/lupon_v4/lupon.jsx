import React, { useState, useContext } from "react";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

import Lup_table from "./lupon_table";
import Lupon_respcomp from "./Lupon_comp&resp";
import Lup_docs from "./lup_docs";
import Lup_mem_act from "./Lup_mem_act";
import Lupon_hearing from "./lupon_hearing";
import { Userloc } from "../../user_loc";
const Lupon = () => {
  const [basicActive, setBasicActive] = useState("tab1");

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  //data holder
  let Passdatatocomp = (datainfo) => {};
  let Passdatatodocs = (datainfo) => {};
  let Passdatatomem = (datainfo) => {};
  let Passdata = (datainfo) => {};
  // Data holder and passing to lupon forms
  const Getdata = (datainfo) => {
    Passdata && Passdata(datainfo);
    Passdatatodocs && Passdatatodocs(datainfo);
    Passdatatomem && Passdatatomem(datainfo);
    if (datainfo) {
      Passdatatocomp && Passdatatocomp(datainfo[0]._id);
    } else {
      Passdatatocomp && Passdatatocomp(datainfo);
    }
  };

  //bridge to pass to lupon form
  const receiveRespcomp = (handler) => {
    Passdata = handler;
  };

  //data to comp
  const receivdatacomp = (handler) => {
    Passdatatocomp = handler;
  };

  //data to docs
  const receivdatadocs = (handler) => {
    Passdatatodocs = handler;
  };

  //data to member
  const receivdatamem = (handler) => {
    Passdatatomem = handler;
  };

  //disable mrt table case
  const [distab, setDistab] = useState(false);
  const [disablecasedocs, setDisablecasedocs] = useState();
  const ondisabledocs = (parms) => {
    setDisablecasedocs(parms);
    setDistab(parms);
  };

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="d-flex">
          <h1>Lupon</h1>
          <Userloc />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <Lup_table onPassdata={Getdata} disablefromdocs={disablecasedocs} />
        </div>
      </div>

      <div className="row mt-2">
        <MDBTabs
          className="mb-3"
          style={{ pointerEvents: distab ? "none" : "auto" }}
        >
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab1")}
              active={basicActive === "tab1"}
            >
              Complainant/Respondent
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab2")}
              active={basicActive === "tab2"}
            >
              Hearing
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab3")}
              active={basicActive === "tab3"}
            >
              Document
            </MDBTabsLink>
          </MDBTabsItem>
          <MDBTabsItem>
            <MDBTabsLink
              onClick={() => handleBasicClick("tab4")}
              active={basicActive === "tab4"}
            >
              Lupon Member/Action Taken
            </MDBTabsLink>
          </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
          <MDBTabsPane show={basicActive === "tab1"} className="bg-white">
            <Lupon_respcomp receiveRespcomp={receiveRespcomp} />
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === "tab2"} className="bg-white">
            <Lupon_hearing receiveid={receivdatacomp} />
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === "tab3"} className="bg-white">
            <Lup_docs
              receivdatadocs={receivdatadocs}
              returntolupon={ondisabledocs}
            />
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === "tab4"} className="bg-white">
            <Lup_mem_act receivdatamem={receivdatamem} />
          </MDBTabsPane>
        </MDBTabsContent>
      </div>
    </div>
  );
};

export default Lupon;
