/*
  Update Form Component
  Includes code from the Material UI documentation for the Material UI components used.
*/

import React, { useState } from "react";
import {
  TextField,
  Box,
  Button,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
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
  // whether or not to reload the tableData on dialog box close
  const [reload, setReload] = useState(false);

  // dialog box controller
  const [dialogOpen, setDialogOpen] = useState(false);

  // text to show in dialog box
  const [dialogTitle, setdialogTitle] = useState("");
  const [message, setMessage] = useState("Error");

  // currently selected value to update, initialized to first value on table
  const [currValue, setCurrValue] = useState(data[0][idVar]);

  // fields to be passed into the query, initialized to first value on table
  const [updateFieldValues, setUpdateFieldValues] = useState(() => {
    const initialFieldValues = {};
    if (!tableName.includes("_")) {
      fields.forEach((field) => {
        initialFieldValues[field] = data[0][field] || "";
      });
    } else {
      Object.keys(intersectData[0]).forEach((field) => {
        initialFieldValues[field] = data[0][field] || "";
      });
    }
    return initialFieldValues;
  });

  //
  const handleUpdateFieldChange = (field) => (event) => {
    setUpdateFieldValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  // update selected fields when the dropdown is used to select a different id
  const handleSelectChange = (e) => {
    // update CurrValue to be passed to query for WHERE id=CurrValue later
    const selectedId = e.target.value;
    setCurrValue(selectedId);
    // update selected item for display in the form's fields
    const selectedItem = data.find((datum) => datum[idVar] === selectedId);
    setUpdateFieldValues(selectedItem);
    // update foreign key if this table has foreign keys
    if (fkeys) {
      const fkeyIndex = Object.keys(fkeys[0])[0];
      setFkey(selectedItem[fkeyIndex]);
    }
  };

  const handleSubmit = async () => {
    /*nameVar is always a required value in case of non-intersect tables,
    when this happens show dialog box with error message*/
    if (updateFieldValues[nameVar] === "" && !tableName.includes("_")) {
      setMessage(`Invalid request. ${nameVar} is required`);
      setDialogOpen(true);
    } else {
      /*four values required for a successful UPDATE query
      updateFieldValues: the values in the text fields below
      fkey: the value selected for foreign key if one applies
      "UPDATE": the type of operation
      currValue: the ID (primary key) of the entry to be updated*/
      const request = [updateFieldValues, fkey, "UPDATE", currValue];
      const result = await fetch(`./${tableName}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });
      if (result.status === 400) {
        // show dialog box with error in case of failed query
        const data = await result.json();
        setMessage(
          <>
            Bad request.
            <br />
            Error message: ${data.Error.sqlMessage}
            <br />
            Query: ${data.Error.sql}
            <br />
          </>
        );
        setDialogOpen(true);
      } else {
        // show dialogbox with success and passed values in case of succesful query
        setdialogTitle("Success!!");
        setMessage(
          <>
            Succesfully updated {tableName} table with values:
            <br />
            {Object.keys(updateFieldValues).map((field) => (
              <div key={field + "updatedialog"}>
                <br />
                {field}:{updateFieldValues[field]}
              </div>
            ))}
            {/*conditional fkeys render to avoid errors*/}
            {fkeys && (
              <>
                <br />
                {Object.keys(fkeys[0])[0]}:
              </>
            )}
            {fkey && fkey}
          </>
        );
        // always reload on successful update
        setReload(true);
        setDialogOpen(true);
      }
    }
  };
  // start off fkeys with first fkey var (will set to undefined/null if no fkey)
  const [fkey, setFkey] = useState(data[0][fkeyVar]);
  const handleFKChange = (e) => {
    setFkey(e.target.value);
  };
  // conditional render of dialog box
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
    // normal render for non-intersect tables
  } else if (!tableName.includes("_")) {
    return (
      <div className="BoxWrapper">
        {/*container for the close icon 
        so that we can align it to the right*/}
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", padding: "1%" }}
          key={"gridClose"}
        >
          <CloseIcon
            fontSize="large"
            sx={{ cursor: "pointer" }}
            onClick={onClose}
            key={"closeupdate"}
          />
        </Box>
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
          key={"boxClose"}
          noValidate
          autoComplete="off"
        >
          {/*text box for each text field, ID fields 
          won't show here due to splicing during initial
          useEffect query*/}
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
                key={index + "UPDATE"}
                id={field}
                label={field}
                variant="standard"
                value={updateFieldValues[field] || ""}
                onChange={handleUpdateFieldChange(field)}
              />
            </div>
          ))}
          {/*display ID field for choosing which item to update*/}
          <p>{Object.keys(data[0])[0]}:</p>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={currValue}
            label="ID"
            onChange={handleSelectChange}
          >
            {data.map((datum, index) => (
              <MenuItem key={index ** 2.35} value={datum[idVar]}>
                {`${datum[idVar]}: ${datum[nameVar]}`}
              </MenuItem>
            ))}
          </Select>
          {/*render fkeys when present*/}
          {fkeys !== null && (
            <>
              {/*key field's name*/}
              <p>{Object.keys(fkeys[0])[0]}:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Developer"
                onChange={handleFKChange}
                value={fkey}
              >
                {/*one select menu option per foreign key option*/}
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
    // special render case for intersect tables
    if (intersectData !== null) {
      /*get the name of the non-composer id variable
      all of our intersect tables include composers,
      intersectData will hold the non-composer ids and names*/
      const field = Object.keys(intersectData[0])[0];
      return (
        <div className="BoxWrapper">
          {/*container for the close icon 
        so that we can align it to the right*/}
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", padding: "1%" }}
            key={"gridClose"}
          >
            <CloseIcon
              fontSize="large"
              sx={{ cursor: "pointer" }}
              onClick={onClose}
              key={"closeupdate"}
            />
          </Box>
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
            <>
              {/*display ID field for choosing which item to update*/}
              <p>{Object.keys(data[0])[0]}:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currValue}
                label="ID"
                onChange={handleSelectChange}
              >
                {data.map((datum, index) => (
                  <MenuItem key={index ** 9.35} value={datum[idVar]}>
                    {`${datum[idVar]}: ${datum[fields[2]]} : ${
                      datum[fields[4]]
                    }`}
                  </MenuItem>
                ))}
              </Select>
              {/*render the non-composer field name and id:name select options*/}
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
                    <MenuItem key={index ** 3.57} value={datum[field]}>
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
                        key={index ** 7.347}
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
      return <CircularProgress color="inherit" />;
    }
  }
}
