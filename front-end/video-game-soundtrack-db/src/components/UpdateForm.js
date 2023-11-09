import React, { useState } from "react";
import { TextField, Box, Button, Select, MenuItem } from "@mui/material";

export default function UpdateForm({
  data,
  fields,
  onClose,
  fkeys,
  idVar,
  nameVar,
  fkeyVar,
  tableName,
  intersectData,
  setData,
}) {
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
    if (fkeys) {
      const fkeyIndex = Object.keys(fkeys[0])[0];
      setFkey(selectedItem[fkeyIndex]);
    }
  };

  const handleSubmit = () => {
    onClose();
  };
  const [fkey, setFkey] = useState(data[0][fkeyVar]);
  const handleFKChange = (e) => {
    setFkey(e.target.value);
  };
  if (!tableName.includes("_")) {
    return (
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
          {fields.map((field, index) => (
            <div>
              <TextField
                sx={{
                  "& > :not(style)": {
                    color: "aliceblue",

                    fontSize: "large",
                  },
                  "& .MuiInputBase-input": { textAlign: "center" },
                }}
                key={index ** 0.0035}
                id={field}
                label={field}
                variant="standard"
                value={updateFieldValues[field] || ""}
                onChange={handleUpdateFieldChange(field)}
              />
            </div>
          ))}

          <p>{Object.keys(data[0])[0]}:</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currValue}
            label="ID"
            onChange={handleSelectChange}
          >
            {data.map((datum, index) => (
              <MenuItem key={index} value={datum[idVar]}>
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
          <br />
          <Button
            sx={{ width: "80%", borderRadius: "10px" }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            UPDATE
          </Button>
        </Box>
      </div>
    );
  } else {
    if (intersectData !== null) {
      return (
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
            {intersectData.map((field, fieldIndex) => {
              if (field.includes("ID")) {
                const uniqueValues = new Set(data.map((datum) => datum[field]));
                return (
                  <>
                    <p>{field}:</p>
                    <Select
                      key={fieldIndex}
                      labelId={`select-${field}-label`}
                      id={`select-${field}`}
                      value={updateFieldValues[field]}
                      onChange={handleUpdateFieldChange(field)}
                    >
                      {[...uniqueValues].map((uniqueValue, index) => {
                        const datum = data.find(
                          (datum) => datum[field] === uniqueValue
                        );
                        return (
                          <MenuItem key={index} value={uniqueValue}>
                            {`${uniqueValue}: ${
                              datum[intersectData[fieldIndex + 1]]
                            }`}{" "}
                            {field === "Composer ID" &&
                              datum[intersectData[fieldIndex + 2]]}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </>
                );
              }
              return null;
            })}
            <br />
            <Button
              sx={{ width: "80%", borderRadius: "10px" }}
              variant="contained"
              type="submit"
              onClick={handleSubmit}
            >
              UPDATE
            </Button>
          </Box>
        </div>
      );
    } else {
      return <p>Loading...</p>;
    }
  }
}
