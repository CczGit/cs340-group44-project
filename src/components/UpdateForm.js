import React, { useState } from "react";
import { TextField, Box, Button, Select, MenuItem, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvalidAlert from "./InvalidAlert";

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
  loadData,
}) {
  const [reload, setReload] = useState(false);
  const [dialogTitle, setdialogTitle] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("Error");
  const [currValue, setCurrValue] = useState(data[0][idVar]);
  const [updateFieldValues, setUpdateFieldValues] = useState(() => {
    const initialFieldValues = {};
    fields.forEach((field) => {
      initialFieldValues[field] = data[0][field] || "";
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

  const handleSubmit = async () => {
    if (updateFieldValues[nameVar] === "" && !tableName.includes("_")) {
      setMessage(`Invalid request. ${nameVar} is required`);
      setDialogOpen(true);
    } else {
      const request = [updateFieldValues, fkey, "UPDATE", currValue];
      const result = await fetch(`./${tableName}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });
      if (result.status === 400) {
        const data = await result.json();

        setMessage(
          <>
            <p>Bad request.</p>
            <p>Error message: ${data.Error.sqlMessage} </p>
            <p> Query: ${data.Error.sql}</p>
          </>
        );
        setDialogOpen(true);
      } else {
        setdialogTitle("Success!!");
        setMessage(
          <>
            Succesfully updated {tableName} table with values:
		<br/>
            {Object.keys(updateFieldValues).map((field) => (
              <>
                {field}:{updateFieldValues[field]}
		    <br/>
              </>
            ))}
            
          </>
        );
        setReload(true);
        setDialogOpen(true);
      }
    }
  };
  const [fkey, setFkey] = useState(data[0][fkeyVar]);
  const handleFKChange = (e) => {
    setFkey(e.target.value);
  };
  if (dialogOpen) {
    return (
      <InvalidAlert
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        message={message}
        dialogTitle={dialogTitle}
        loadData={loadData}
        reload={reload}
      />
    );
  } else if (!tableName.includes("_")) {
    return (
      <div className="BoxWrapper">
        <Grid
          sx={{ display: "flex", justifyContent: "flex-end", padding: "1%" }}
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
      const field = Object.keys(intersectData[0])[0];
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
            <>
              <p>{Object.keys(intersectData[0])[0]}:</p>
              <Select
                sx={{ minWidth: "170px" }}
                labelId={`select-${field}-label`}
                id={`select-${field}`}
                value={updateFieldValues[field]}
                onChange={handleUpdateFieldChange(field)}
              >
                {intersectData.map((datum, index) => {
                  return (
                    <MenuItem key={index ** .132} value={datum[field]}>
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
                        key={index ** 0.35}
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
