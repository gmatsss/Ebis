//sfc stateless function
import React, { useContext, useState, useMemo, useEffect } from "react";
//usercontent
import { UserContext } from "../../UserContext";

import { toast } from "react-toastify";

import MaterialReactTable from "material-react-table";
//theme
import { createTheme, ThemeProvider, useTheme } from "@mui/material";

//sirlex style
import { Container, Row, Col } from "react-grid-system";
import Button from "../../share/FormElements/Button";

//api
import { useFetch } from "../../api/lupon";

const lupon_table = (props) => {
  // hooks
  const { sendRequest } = useFetch();

  //data
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState();

  const getHandler = async () => {
    try {
      //alert loading
      const result = await toast.promise(sendRequest("/g/record", "GET"), {
        pending: "Please wait data is loading",
        success: "Data loaded",
        error: `Error`,
      });
      setData(result);

      if (result && result.error) return toast.error({ error: result.error });
    } catch (e) {
      setLoading(false);
      //console.log(e);
      setLoggeedMessage({ error: e.message });
    }
  };

  useEffect(() => {
    getHandler();
  }, []);

  const tableHandler = () => {
    try {
      const column = [
        {
          header: "caseno",
          accessorKey: "caseno",
        },
        { header: "nameofcomp", accessorKey: "nameofcomp" },
        {
          header: "imageofcomp",
          accessorKey: "imageofcomp",
          enableEditing: false,
        },
        {
          header: "DateCreated",
          accessorKey: "DateCreated",
          enableEditing: false,
        },

        {
          header: "Createdby",
          accessorKey: "Createdby",
          enableEditing: false,
        },
        {
          header: "DateModified",
          accessorKey: "DateModified",

          enableEditing: false,
        },
        {
          header: "Modifiedby",
          accessorKey: "Modifiedby",
          enableEditing: false,
        },
        { header: "Status", accessorKey: "Status", enableEditing: false },
        { header: "_id", accessorKey: "_id", enableEditing: false },
      ];

      //insert data to table
      let row = [];
      data.forEach((x) => {
        row.push({
          _id: x._id,
          caseno: x.caseno,
          nameofcomp: x.nameofcomp,
          imageofcomp: x.imageofcomp,
          DateCreated: x.DateCreated,
          Createdby: x.Createdby,
          DateModified: x.DateModified,
          Modifiedby: x.Modifiedby,
          Status: x.Status,
          id: x._id,
        });
      });

      setColumns(column);
      setRows(row);
    } catch (e) {
      //console.log(e);
    }
  };

  useEffect(() => {
    if (!data || data.length === 0) return;
    tableHandler();
  }, [data]);

  const globalTheme = useTheme();

  const tableTheme = useMemo(
    () =>
      createTheme({
        palette: {
          //table
          mode: globalTheme.palette.mode, //let's use the same dark/light mode as the global theme
          //selection row
          primary: {
            main: "rgb(241,245,5)", //add in a custom color for the toolbar alert background stuff
          },
          //table information or tavble top commands
          info: {
            main: "rgb(0,0,0)", //add in a custom color for the toolbar alert background stuff
          },

          //table color
          background: {
            default:
              globalTheme.palette.mode === "light"
                ? "rgb(254,255,244)" //random light yellow color for the background in light mode
                : "#000", //pure black table in dark mode for fun
          },
        },
        typography: {
          button: {
            textTransform: "none", //customize typography styles for all buttons in table by default
            fontSize: "1.2rem",
          },
        },
        components: {
          MuiTooltip: {
            styleOverrides: {
              tooltip: {
                fontSize: "1.1rem", //override to make tooltip font size larger
              },
            },
          },
          MuiSwitch: {
            styleOverrides: {
              thumb: {
                color: "pink", //change the color of the switch thumb in the columns show/hide menu to pink
              },
            },
          },
        },
      }),
    [globalTheme]
  );

  // mrt disable state
  const [state, setState] = useState(true);

  //changing button
  const [change, setChange] = useState(false);

  //optionally, you can manage the row selection state yourself
  const [rowSelection, setRowSelection] = useState({});
  //setting row id to form
  const [rowid, setRowid] = useState({});

  const handle_add = () => {
    props.onStateform("ADD");
    setState(false);
    setChange(true);
    setRowSelection({});
  };

  const handle_cancel = () => {
    props.onStateform("CANCEL");
    setState(true);
    setChange(false);
  };

  const handle_save = () => {
    props.onStateform("SAVED");
    setState(true);
    setChange(false);
    setData("");
    setColumns("");
    setRows("");
    getHandler();
  };

  //refresh code
  const handle_refresh = () => {
    props.onStateform("REFRESH");
    setData("");
    setColumns("");
    setRows("");
    getHandler();
    setRowSelection({});
  };

  //passing data to form
  const get_id = (Data) => {
    //console.log(Data);
    setRowid(Data);
    //to pass data to lupon page component
    props.onPassdata(Data);
  };

  return (
    <ThemeProvider theme={tableTheme}>
      <Row>
        {!change ? (
          <Col xs={12} md={12} lg={1}>
            <Button
              variant="primary"
              className="btn-component"
              title="Add"
              size="lg"
              onClick={handle_add}
            >
              ADD
            </Button>
          </Col>
        ) : (
          <Col xs={12} md={12} lg={1}>
            <Button
              variant="success"
              className="btn-component"
              title="Add"
              size="lg"
              onClick={handle_save}
            >
              Saved
            </Button>
          </Col>
        )}
        {!change ? (
          <Col xs={12} md={12} lg={1}>
            <Button
              variant="success"
              className="btn-component"
              title="Add"
              size="lg"
              onClick={handle_refresh}
            >
              Refresh
            </Button>
          </Col>
        ) : (
          <Col xs={12} md={12} lg={1}>
            <Button
              variant="success"
              className="btn-component"
              title="Add"
              size="lg"
              onClick={handle_cancel}
            >
              Cancel
            </Button>
          </Col>
        )}
      </Row>
      <br />
      <div
        style={
          state
            ? { pointerEvents: "auto", opacity: "1" }
            : { pointerEvents: "none", opacity: "0.2" }
        }
      >
        <MaterialReactTable
          columns={columns}
          data={rows}
          getRowId={(row) => row._id}
          muiTableBodyRowProps={({ row }) => ({
            //implement row selection click events manually
            //getting the data id

            onClick: () => {
              setRowSelection((prev) => ({
                //enabling selection row
                // [row.id]: true,
                // id: [row.id],

                [row.id]: !prev[row.id],
              }));
              //initialize all data then call function
              get_id([row.original]);
            },

            selected: rowSelection[row.id],
            sx: {
              cursor: "pointer",
            },
            color: "warning",
          })}
          state={{ rowSelection }}
          initialState={{
            pagination: { pageSize: 5, pageIndex: 0 },
            density: "compact",
            columnVisibility: {
              Createdby: false,
              DateCreated: false,
              Status: false,
              _id: false,
            },
          }}
        />
      </div>
      <br />
    </ThemeProvider>
  );
};

export default lupon_table;
