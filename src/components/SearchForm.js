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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [searchFieldValues, setSearchFieldValues] = useState(() => {
    const initialValues = {};
    Object.keys(data[0]).forEach(
      (field) => (initialValues[field] = data[0][field])
    );
    return initialValues;
  });
  const [fkey, setFkey] = useState(0);
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
    if (e.target.value === 0) {
      setFkey(0);
      setFilteredData(null);
    } else {
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
      setFkey(e.target.value);
      const newData = data.filter((datum) => datum[fkeyVar] === e.target.value);
      setFilteredData(newData);
    }
  };
  const handleSubmit = () => {
    const newData = data.filter((datum) => {
      let isMatch = true;
      for (const field in searchFieldValues) {
        if (searchFieldValues[field] === "") continue;
        if (!datum[field]) {
          isMatch = false;
          break;
        }
        if (
          !datum[field].toString().includes(searchFieldValues[field].toString())
        ) {
          isMatch = false;
          break;
        }
      }
      return isMatch;
    });
    if (newData.length !== 0) {
      setOldData(data);
      setData(newData);
      onClose();
    } else {
      setDialogOpen(true);
    }
  };
  const resetList = () => {
    setFkey(0);
    setFilteredData(null);
  };

  if (dialogOpen) {
    return (
      <NotFoundAlert
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        removeSearch={onClose}
      />
    );
  } else {
    if (!tableName.includes("_")) {
      return (
        <>
          <div className="BoxWrapper">
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
                    key={index ** 0.5}
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
                {filteredData !== null &&
                  filteredData.map((datum, index) => (
                    <MenuItem key={index * 0.973} value={datum[idVar]}>
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
                    value={searchFieldValues[fkeyVar]}
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
              <br />
              <Button
                sx={{ width: "80%", borderRadius: "10px" }}
                variant="contained"
                type="submit"
                onClick={handleSubmit}
              >
                SEARCH
              </Button>
              {fkey !== 0 && (
                <Button
                  sx={{ width: "80%", borderRadius: "10px" }}
                  variant="contained"
                  type="submit"
                  onClick={resetList}
                >
                  RESET FK CHOICE
                </Button>
              )}
            </Box>
          </div>
        </>
      );
    } else if (intersectData !== null) {
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
                      <MenuItem key={index} value={datum[field]}>
                        {`${datum[field]}: ${
                          datum[Object.keys(intersectData[0])[1]]
                        }`}{" "}
                      </MenuItem>
                    );
                  })}
                </Select>
                {fkeys !== null && (
                  <>
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
                          key={index ** 0.347}
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
