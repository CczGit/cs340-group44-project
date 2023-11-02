import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

export default function UpdateComponent({ data, fields, onClose }) {
  const idVar = Object.keys(data[0])[0];
  const nameVar = Object.keys(data[0])[1];
  const [currValue, setCurrValue] = useState(data[0][idVar]);

  const [updateFieldValues, setUpdateFieldValues] = useState(() => {
    const initialFieldValues = {};
    fields.forEach((field) => {
      initialFieldValues[field] = data[currValue - 1][field] || "";
    });
    return initialFieldValues;
  });

  const handleUpdateFieldChange = (field) => (event) => {
    setUpdateFieldValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedId = e.target.value;
    setCurrValue(selectedId);
    const selectedItem = data.find((datum) => datum[idVar] === selectedId);
    setUpdateFieldValues(selectedItem);
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <div className="BoxWrapper">
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            p: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "aliceblue",
          },
        }}
        noValidate
        autoComplete="off"
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currValue}
          label="ID"
          helperText="ID"
          onChange={handleSelectChange}
        >
          {data.map((datum, index) => (
            <MenuItem key={index} value={datum[idVar]}>
              {`${datum[idVar]}: ${datum[nameVar]}`}
            </MenuItem>
          ))}
        </Select>

        {fields.map((field, index) => (
          <div>
            <TextField
              sx={{
                "& > :not(style)": {
                  color: "aliceblue",
                },
              }}
              key={index}
              id={field}
              label={field}
              variant="standard"
              value={updateFieldValues[field] || ""}
              onChange={handleUpdateFieldChange(field)}
            />
          </div>
        ))}
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          UPDATE
        </Button>
      </Box>
    </div>
  );
}
