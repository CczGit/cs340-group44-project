import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  ButtonGroup,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";

export default function CreateForm({ fields, onClose }) {
  const [createFieldValues, setCreateFieldValues] = useState(() => {
    const initialFieldValues = {};
    fields.forEach((field) => {
      initialFieldValues[field] = "";
    });
    return initialFieldValues;
  });
  const handleCreateFieldChange = (field) => (event) => {
    setCreateFieldValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };
  const handleSubmit = () => {
    onClose();
  };
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": {
          m: 1,
          p: 1,
          width: "auto",
          display: "flex",
          alignItems: "center",
        },
      }}
      noValidate
      autoComplete="off"
    >
      {fields.map((field, index) => (
        <>
          <TextField
            key={index}
            id={field}
            label={field}
            variant="standard"
            value={createFieldValues[field]}
            onChange={handleCreateFieldChange(field)}
          />
        </>
      ))}
      <Button onClick={handleSubmit}>CREATE</Button>
    </Box>
  );
}
