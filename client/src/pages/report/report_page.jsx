import Report_table from "./report_table";
import Report_form from "./report_form";
const Report_page = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Report_form />
        </div>
        <div className="col-lg-9">
          <Report_table />
        </div>
      </div>
    </div>
  );
};

export default Report_page;
