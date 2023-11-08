import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";

export default function SearchComponent({ fields, onClose }) {
  const [searchFieldValues, setSearchFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach((field) => (initialValues[field] = ""));
    return initialValues;
  });

  const handleSearchFieldChange = (field) => (event) => {
    setSearchFieldValues((prev) => ({ ...prev, [field]: event.target.value }));
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
            width: "auto",
            display: "flex",
            alignItems: "flex-start",
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
                },
              }}
              key={index}
              id={field}
              placeholder={field}
              label={field}
              variant="standard"
              value={searchFieldValues[field]}
              onChange={handleSearchFieldChange(field)}
            />
          </>
        ))}
        <Button variant="contained" type="submit" onClick={handleSubmit}>
          SEARCH
        </Button>
      </Box>
    </div>
  );
}
