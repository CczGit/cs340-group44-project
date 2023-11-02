import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function InputForm({ fields, tableName }) {
  //if id in fields -> get list of ids to values
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 5, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      {fields.map((field) => (
        <TextField id={field} label={field} varient="outlined" />
      ))}
    </Box>
  );
}
