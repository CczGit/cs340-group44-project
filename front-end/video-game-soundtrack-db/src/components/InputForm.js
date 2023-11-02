import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup, Select, MenuItem } from "@mui/material";

export default function InputForm({ data, fields }) {
  // if id in fields -> get list of ids to values
  // use drop downs for ids
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const idVar = Object.keys(data[0])[0];
  const nameVar = Object.keys(data[0])[1];
  const [curr_value, setCurrValue] = useState(data[0][idVar]);
  const createHandler = () => {
    setCreate(!create);
  };
  const updateHandler = () => {
    setUpdate(!update);
  };
  const handleChange = (e) => {
    console.log(data);
    console.log(e.value);
  };

  return (
    <>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button onClick={createHandler}>CREATE</Button>
        <Button onClick={updateHandler}>UPDATE</Button>
      </ButtonGroup>

      {create && (
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
          <Button onClick={createHandler}>CREATE</Button>
        </Box>
      )}
      {update && (
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 5, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={curr_value}
            label="ID"
            onChange={handleChange}
          >
            {data.map((datum, index) => (
              <MenuItem key={index} value={datum[idVar]}>
                {datum[nameVar]}
              </MenuItem>
            ))}
          </Select>
          {fields.slice(1).map((field, index) => (
            <TextField
              key={0.25 * index}
              id={field}
              label={field}
              varient="outlined"
            />
          ))}
          <Button onClick={updateHandler}>UPDATE</Button>
        </Box>
      )}
    </>
  );
}
