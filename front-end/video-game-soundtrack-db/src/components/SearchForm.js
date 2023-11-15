/*
  Search Form Component
  Includes code from the Material UI documentation for the Material UI components used.
*/

import React, { useState } from "react";
import { TextField, Box, Button, Select, MenuItem, Grid } from "@mui/material";
import NotFoundAlert from "./NotFoundAlert";
import CloseIcon from "@mui/icons-material/Close";
export default function SearchForm({
  fields,
  onClose,
  data,
  fkeys,
  idVar,
  nameVar,
  fkeyVar,
  tableName,
  intersectData,
  setData,
  setOldData,
}) {
  // dialog box controller
  const [dialogOpen, setDialogOpen] = useState(false);

  // data to show when the user has chosen a filter
  const [filteredData, setFilteredData] = useState(null);

  // fields to search, initialized to first value on table
  const [searchFieldValues, setSearchFieldValues] = useState(() => {
    const initialValues = {};
    Object.keys(data[0]).forEach(
      (field) => (initialValues[field] = data[0][field])
    );
    return initialValues;
  });

  // start with null as foreign key
  const [fkey, setFkey] = useState(0);

  // when user starts modifying any search value, clear all others
  const handleSearchFieldChange = (field) => (event) => {
    setSearchFieldValues((prev) => {
      const newValues = { ...prev };
      Object.keys(newValues).forEach((key) => {
        if (key !== field) {
          newValues[key] = "";
        } else {
          newValues[key] = event.target.value;
        }
      });
      return newValues;
    });
  };

  const handleFKChange = (e) => {
    // reset values on null fkey being chosen

    // set all field values to empty when a foreign key is chosen
    setSearchFieldValues((prev) => {
      const newValues = { ...prev };
      Object.keys(newValues).forEach((field) => {
        if (field !== fkeyVar) {
          newValues[field] = "";
        } else {
          newValues[field] = e.target.value;
        }
      });
      return newValues;
    });
    // filter values based on chosen foreign key
    setFkey(e.target.value);
    const newData = data.filter((datum) => datum[fkeyVar] === e.target.value);
    setFilteredData(newData);
  };

  const handleSubmit = () => {
    // filter data based on entered search field
    const newData = data.filter((datum) => {
      let isMatch = true;
      for (const field in searchFieldValues) {
        if (searchFieldValues[field] === "" && field !== fkeyVar) continue;
        /*undefined doesn't have .toString() 
          returning here here avoids errors when a field is null*/
        if (!datum[field]) {
          // for cases when we're searching for null FKeys
          if (field === fkeyVar && searchFieldValues[field] === 0) {
            return true;
          }
          isMatch = false;
          break;
        }
        // precise search when searching by ID
        if (field.includes("ID"))
          return datum[field] === searchFieldValues[field];
        else if (
          // return false when a field doesn't include the entered value
          !datum[field].toString().includes(searchFieldValues[field].toString())
        ) {
          isMatch = false;
          break;
        }
      }
      return isMatch;
    });
    if (newData.length !== 0) {
      // modify displayed data if there are matches
      setOldData(data);
      setData(newData);
      onClose();
    } else {
      // open dialgo box if there are no matches
      setDialogOpen(true);
    }
  };

  // resets the table
  const resetList = () => {
    setFkey(0);
    setFilteredData(null);
  };
  // conditional render of dialog box
  if (dialogOpen) {
    return (
      <NotFoundAlert
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        removeSearch={onClose}
      />
    );
  } else {
    // normal render for non-intersect tables
    if (!tableName.includes("_")) {
      return (
        <>
          <div className="BoxWrapper">
            {/*container for the close icon 
              so that we can align it to the right*/}
            <Grid
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1%",
              }}
            >
              <CloseIcon
                fontSize="large"
                sx={{ cursor: "pointer" }}
                onClick={onClose}
              />
            </Grid>
            {/*form container*/}
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  p: 1,
                  textAlign: "center",
                  color: "aliceblue",
                },
              }}
              noValidate
              autoComplete="off"
            >
              {/*text box for each text field, ID fields 
               won't show here due to splicing during initial
               useEffect query*/}
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
                    key={index ** 7.25}
                    id={field}
                    placeholder={field}
                    label={field}
                    variant="standard"
                    value={searchFieldValues[field]}
                    onChange={handleSearchFieldChange(field)}
                  />
                </>
              ))}
              {/*display ID field as a drop down*/}
              <p>{Object.keys(data[0])[0]}:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchFieldValues[Object.keys(data[0])[0]]}
                label="ID"
                onChange={handleSearchFieldChange(Object.keys(data[0])[0])}
              >
                {filteredData === null &&
                  data.map((datum, index) => (
                    <MenuItem key={index ** 0.573} value={datum[idVar]}>
                      {`${datum[idVar]}: ${datum[nameVar]}`}
                    </MenuItem>
                  ))}
                {/*render filtered data only if data has been filtered*/}
                {filteredData !== null &&
                  filteredData.map((datum, index) => (
                    <MenuItem key={index * 1.973} value={datum[idVar]}>
                      {`${datum[idVar]}: ${datum[nameVar]}`}
                    </MenuItem>
                  ))}
              </Select>
              {/*render fkeys when present*/}
              {fkeys !== null && (
                <>
                  <p>{Object.keys(fkeys[0])[0]}:</p>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Developer"
                    onChange={handleFKChange}
                    value={searchFieldValues[fkeyVar]}
                  >
                    {/*one select menu option per foreign key option*/}
                    {fkeys.map((fkey, index) => (
                      <MenuItem
                        key={index * 1.005}
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
              <br />
              <Button
                sx={{ width: "80%", borderRadius: "10px" }}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                SEARCH
              </Button>

              {filteredData !== null && (
                <Button
                  sx={{ width: "80%", borderRadius: "10px" }}
                  variant="contained"
                  type="submit"
                  onClick={resetList}
                >
                  RESET FOREIGN KEY
                </Button>
              )}
            </Box>
          </div>
        </>
      );
      // special render case for intersect tables
    } else if (intersectData !== null) {
      /*get the name of the non-composer id variable
      all of our intersect tables include composers,
      intersectData will hold the non-composer ids and names*/
      const field = Object.keys(intersectData[0])[0];
      return (
        <>
          <div className="BoxWrapper">
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  m: 1,
                  p: 1,
                  textAlign: "center",
                  color: "aliceblue",
                },
              }}
              noValidate
              autoComplete="off"
            >
              <>
                {/*render the non-composer field name and id:name select options*/}
                <p>{Object.keys(intersectData[0])[0]}:</p>
                <Select
                  sx={{ minWidth: "170px" }}
                  labelId={`select-${field}-label`}
                  id={`select-${field}`}
                  value={searchFieldValues[field]}
                  onChange={handleSearchFieldChange(field)}
                >
                  {intersectData.map((datum, index) => {
                    return (
                      <MenuItem key={index ** 3.87} value={datum[field]}>
                        {`${datum[field]}: ${
                          datum[Object.keys(intersectData[0])[1]]
                        }`}{" "}
                      </MenuItem>
                    );
                  })}
                </Select>
                {fkeys !== null && (
                  <>
                    {/*render the composer field name id:name select options*/}
                    <p>{Object.keys(fkeys[0])[0]}:</p>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleFKChange}
                      value={fkey}
                      sx={{ minWidth: "170px" }}
                    >
                      {fkeys.map((fkey, index) => (
                        <MenuItem
                          key={index ** 1.347}
                          value={fkey[Object.keys(fkey)[0]]}
                        >
                          {`${fkey[Object.keys(fkey)[0]]}: ${
                            fkey[Object.keys(fkey)[1]]
                          } ${fkey[Object.keys(fkey)[2]]}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                )}
              </>
              <Button
                sx={{ width: "80%", borderRadius: "10px" }}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                SEARCH
              </Button>
            </Box>
          </div>
        </>
      );
    }
  }
}
