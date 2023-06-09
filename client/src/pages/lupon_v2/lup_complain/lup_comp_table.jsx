import React, { useMemo, useState, useRef, useEffect } from "react";
import MaterialReactTable, {
  MRT_ToggleFiltersButton,
  MRT_ShowHideColumnsButton,
  MRT_ToggleGlobalFilterButton,
} from "material-react-table";
import { Box, Button, TextField, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, Rowing } from "@mui/icons-material";

import RefreshIcon from "@mui/icons-material/Refresh";
// popup delete
import Notiflix from "notiflix";
//toast
import { toast } from "react-toastify";
//api
import { useFetch } from "../../../api/lupon";

const lup_comp_table = (props) => {
  // hooks
  const { sendRequest } = useFetch();

  //data
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);
  const [data, setData] = useState();

  // mrt disable state
  const [state, setState] = useState(true);

  //get data to database
  const getHandler = async (param) => {
    setRows("");
    setData("");
    try {
      //alert loading
      if (props.paramsdata) {
        const result = await sendRequest(
          `/g/c/record/${props.paramsdata}`,
          "GET"
        );
        if (result && result.error) throw result.error;
        setData(result);
      } else {
        const result = await sendRequest(`/g/c/record/${param}`, "GET");
        if (result && result.error) throw result.error;
        setData(result);
      }
    } catch (e) {
      toast.error({ error: e.message });
    }
  };

  const tableHandler = () => {
    try {
      const column = [
        {
          header: "compid",
          accessorKey: "compid",
        },
        { header: "Complain date", accessorKey: "compdate" },
        { header: "Complain nature", accessorKey: "compnature" },
        { header: "Complain status", accessorKey: "compstatus" },
        {
          header: "Description",
          accessorKey: "description",
          minSize: 100, //min size enforced during resizing
          maxSize: 100, //max size enforced during resizing
          size: 180, //medium column
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
          compid: x.compid,
          compdate: x.compdate,
          compnature: x.compnature,
          description: x.description,
          compstatus: x.compstatus,

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

  useEffect(() => {
    if (!props.paramsdata) {
      setRows("");
      setData("");
      return;
    }
    getHandler();
  }, [props.paramsdata]);

  const [param, setParam] = useState();
  const onCountReceived = (param) => {
    setParam(param);
    if (param == "refresh") {
      getHandler();
      setState(true);
    } else if (param == "add") {
      setState(false);
    } else if (param == "cancel") {
      setState(true);
    } else if (param == "saved") {
      getHandler();
      setState(true);
    } else if (param == "edit") {
      setState(false);
    }
  };

  const handle_edit = (data) => {
    props.onform(data);
  };

  const handleDeleteRow = (data) => {
    // console.log(data._id);
    Notiflix.Confirm.show(
      "Delete ",
      `Delete this Complain ${data.compnature}?`,
      "Yes",
      "No",
      async function okCb() {
        const formData = new FormData();
        formData.append("_id", data.id);
        const result = await sendRequest("/d/c/record", "POST", formData);
        if (result.error) toast.error(result.error);
        getHandler(data.compid);
      },
      function cancelCb() {
        return;
      },
      {
        width: "320px",
        borderRadius: "8px",
        // etc...
      }
    );
  };

  props.statecrud(onCountReceived);

  return (
    <MaterialReactTable
      muiTablePaperProps={{
        //table style
        sx: {
          pointerEvents: state ? "auto" : "none",
          opacity: state ? "1" : "0.2",
        },
      }}
      columns={columns}
      data={rows}
      state={{ showProgressBars: data ? false : true }}
      positionToolbarAlertBanner="none"
      enableRowActions
      renderRowActions={({ row }) => (
        <Box>
          <IconButton onClick={() => handle_edit(row.original)}>
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => handleDeleteRow(row.original)}
          >
            <Delete />
          </IconButton>
        </Box>
      )}
      initialState={{
        pagination: {
          pageSize: 5,
          pageIndex: 0,
        },
        density: "compact",
        columnVisibility: {
          compid: false,
          Createdby: false,
          DateCreated: false,
          Status: false,
          _id: false,
        },
      }}
      enableColumnResizing
      columnResizeMode="onChange" //default
      renderToolbarInternalActions={({ table }) => (
        <Box>
          {/* add custom button to print table  */}

          {/* along-side built-in buttons in whatever order you want them */}
          <MRT_ToggleGlobalFilterButton table={table} />
          <MRT_ToggleFiltersButton table={table} />
          <MRT_ShowHideColumnsButton table={table} />
          <Tooltip arrow placement="right" title="Refresh">
            <IconButton
              onClick={() => {
                getHandler(); //refresh
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}
    />
  );
};

export default lup_comp_table;
