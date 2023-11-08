import React, { useState } from "react";
import { TextField, Box, Button, Select, MenuItem } from "@mui/material";

export default function SearchForm({
  fields,
  onClose,
  data,
  fkeys,
  idVar,
  nameVar,
  fkeyVar,
}) {
  const [filteredData, setFilteredData] = useState(null);
  const [selectedValue, setSelectedValue] = useState(data[0][idVar]);
  const [searchFieldValues, setSearchFieldValues] = useState(() => {
    const initialValues = {};
    fields.forEach((field) => (initialValues[field] = data[0][field]));
    return initialValues;
  });
  const [fkey, setFkey] = useState(0);
  const handleSearchFieldChange = (field) => (event) => {
    setSearchFieldValues((prev) => ({ ...prev, [field]: event.target.value }));
  };
  const handleFKChange = (e) => {
    if (e.target.value == 0) {
      setFkey(0);
      setFilteredData(null);
    } else {
      setFkey(e.target.value);
      const newData = data.filter((datum) => datum[fkeyVar] === e.target.value);
      setFilteredData(newData);
      setSelectedValue(newData[0][idVar]);
    }
  };
  const handleSubmit = () => {
    onClose();
  };
  const resetList = () => {
    setFkey(0);
    setFilteredData(null);
  };
  const handleSelectChange = (event) => {
    const newIdValue = event.target.value;
    setSelectedValue(newIdValue);
    const newData = data.find((datum) => datum[idVar] === newIdValue);
    if (newData) {
      setSearchFieldValues(newData);
    } else {
      setSelectedValue(data[0][idVar]);
      setSearchFieldValues(data[0]);
    }
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
                  fontSize: "large",
                },
              }}
              key={index * 0.5}
              id={field}
              placeholder={field}
              label={field}
              variant="standard"
              value={searchFieldValues[field]}
              onChange={handleSearchFieldChange(field)}
            />
          </>
        ))}
        <p>{Object.keys(data[0])[0]}:</p>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="ID"
          onChange={handleSelectChange}
        >
          {filteredData === null &&
            data.map((datum, index) => (
              <MenuItem key={index ** 0.3} value={datum[idVar]}>
                {`${datum[idVar]}: ${datum[nameVar]}`}
              </MenuItem>
            ))}
          {filteredData !== null &&
            filteredData.map((datum, index) => (
              <MenuItem key={index * 0.3} value={datum[idVar]}>
                {`${datum[idVar]}: ${datum[nameVar]}`}
              </MenuItem>
            ))}
        </Select>

        {fkeys !== null && (
          <>
            <p>{Object.keys(fkeys[0])[0]}:</p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Developer"
              onChange={handleFKChange}
              value={fkey}
            >
              {fkeys.map((fkey, index) => (
                <MenuItem
                  key={index * 0.005}
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
          SEARCH
        </Button>
        {fkey !== 0 && (
          <Button variant="contained" type="submit" onClick={resetList}>
            RESET FK CHOICE
          </Button>
        )}
      </Box>
    </div>
  );
}
