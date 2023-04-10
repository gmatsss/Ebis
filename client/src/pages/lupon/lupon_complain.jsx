import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { TextField } from "@mui/material";

const Lupon_complain = () => {
  return (
    <Grid container>
      <Grid item lg={6} sx={{}}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField id="standard-basic" label="Standard" variant="standard" />
          <TextField id="standard-basic" label="Standard" variant="standard" />
          <TextField id="standard-basic" label="Standard" variant="standard" />
        </Box>
      </Grid>
      <Grid item lg={6}>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
        />
      </Grid>
    </Grid>
  );
};

export default Lupon_complain;
