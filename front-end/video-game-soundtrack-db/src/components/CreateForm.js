import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Select, MenuItem, CircularProgress } from "@mui/material";

export default function CreateForm({
  fields,
  fkeys,
  onClose,
  tableName,
  intersectData,
  data,
  setData,
}) {
  console.log(fields);
  let firstKey = "";
  if (fkeys) {
    firstKey = Object.values(fkeys[0])[0];
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
  const handleSubmit = (e) => {
    onClose();
    console.log(createFieldValues, fkey);
  };
  const [fkey, setFkey] = useState(firstKey);
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
                sx={{ minWidth: "170px" }}
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
          <br />
          <Button
            sx={{ width: "80%", borderRadius: "10px" }}
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            CREATE
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
                      sx={{ minWidth: "170px" }}
                      key={fieldIndex}
                      labelId={`select-${field}-label`}
                      id={`select-${field}`}
                      value={createFieldValues[field]}
                      onChange={handleCreateFieldChange(field)}
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
              value={createFieldValues}
              onClick={handleSubmit}
            >
              CREATE
            </Button>
          </Box>
        </div>
      );
    } else {
      return <CircularProgress color="inherit" />;
    }
  }
}
