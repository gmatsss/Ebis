import React, { useState } from "react";
import { Container, Row, Col } from "react-grid-system";

import "../../share/css/gab.css";
//components
import Lupon_table from "./lupon_table";
import Lupon_complainant from "./lupon_complainant";

const lupon_page = () => {
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

  return (
    <Container fluid>
      <Row className="parent">
        <Col className="" xs={12} sm={12} md={9} lg={10.2}>
          {/* Getdata is the data have been pass to the lupon table */}
          <Lupon_table onPassdata={Getdata} onStateform={trigger} />
        </Col>
        <Col className="" xs={12} sm={12} md={3} lg={12}>
          <Lupon_complainant
            PassdataCreator={PassdataCreator}
            receiverCreator={receiverCreator}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default lupon_page;
