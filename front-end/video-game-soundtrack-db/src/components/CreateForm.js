import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Select, MenuItem } from "@mui/material";

export default function CreateForm({
  fields,
  fkeys,
  onClose,
  idVar,
  nameVar,
  fkeyVar,
}) {
  const firstKey = "";
  if (fkeys) {
    const firstKey = Object.values(fkeys[0])[0];
  }
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
  const [fkey, setFkey] = useState(firstKey);
  const handleFKChange = (e) => {
    setFkey(e.target.value);
  };
  return (
    <div className="BoxWrapper">
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            p: 1,
            width: "auto",
            display: "flex",
            flexDirection: "column",
            color: "aliceblue",
          },
        }}
        noValidate
        autoComplete="off"
      >
        {fields.map((field, index) => (
          <>
            <TextField
              sx={{
                "& > :not(style)": {
                  color: "aliceblue",
                  fontSize: "large",
                },
                "& .MuiInputBase-input": { textAlign: "center" },
              }}
              key={index ** 0.14}
              id={field}
              label={field}
              variant="standard"
              value={createFieldValues[field]}
              onChange={handleCreateFieldChange(field)}
            />
          </>
        ))}
        {fkeys !== null && (
          <>
            <p>{Object.keys(fkeys[0])[0]}:</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleFKChange}
              value={fkey}
            >
              {fkeys.map((fkey, index) => (
                <MenuItem
                  key={index ** 0.347}
                  value={fkey[Object.keys(fkey)[0]]}
                >
                  {`${fkey[Object.keys(fkey)[0]]}: ${
                    fkey[Object.keys(fkey)[1]]
                  }`}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          CREATE
        </Button>
      </Box>
    </div>
  );
}
