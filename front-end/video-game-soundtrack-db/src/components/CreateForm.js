/*
  Create Form Component
  Includes code from the Material UI documentation for the Material UI components used.
 */

import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InvalidAlert from "./InvalidAlert";

export default function CreateForm({
  fields,
  fkeys,
  onClose,
  tableName,
  intersectData,
  loadData,
  nameVar,
}) {
  // this is here to avoid errors when fkeys is null
  let firstKey = "";
  // assigns the first foreign key's ID value to firstKey
  if (fkeys) {
    firstKey = Object.values(fkeys[0])[0];
  }

  // dialog box controller
  const [dialogOpen, setDialogOpen] = useState(false);

  // whether or not to reload the tableData on dialog box close
  const [reload, setReload] = useState(false);

  // text to show in dialog box
  const [dialogTitle, setdialogTitle] = useState("");
  const [message, setMessage] = useState("Error");

  // fields to be passed into the query, initialized to empty field
  const [createFieldValues, setCreateFieldValues] = useState(() => {
    const initialFieldValues = {};
    fields.forEach((field) => {
      initialFieldValues[field] = "";
    });
    return initialFieldValues;
  });

  /* handles when something is put into the form, 
  maintains previous state, only updates changed value
  to avoid losing data to state refresh */
  const handleCreateFieldChange = (field) => (event) => {
    setCreateFieldValues((prevValues) => ({
      ...prevValues,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    /*nameVar is always a required value in case of non-intersect tables,
    when this happens show dialog box with error message*/
    if (createFieldValues[nameVar] === "" && !tableName.includes("_")) {
      setMessage(`Invalid request. ${nameVar} is required`);
      setDialogOpen(true);
    } else {
      /*three values required for a successful CREATE query
      createFieldValues: the values in the text fields below
      fkey: the value selected for foreign key if one applies
      "CREATE": the type of operation*/
      const request = [createFieldValues, fkey, "CREATE"];
      const result = await fetch(`./${tableName}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });
      // show dialog box with error in case of failed query
      if (result.status === 400) {
        const data = await result.json();
        setdialogTitle("Invalid Request");
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
            Succesfully inserted into {tableName} table with values:
            <br />
            {Object.keys(createFieldValues).map((field, index) => (
              <Fragment key={index}>
                <br />
                {field}:{createFieldValues[field]}
              </Fragment>
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
        // always reload on successful create
        setReload(true);
        setDialogOpen(true);
      }
    }
  };
  // start fkey off with first fkey value (or '' in case of no fkeys)
  const [fkey, setFkey] = useState(firstKey);
  const handleFKChange = (e) => {
    // may need to add an update to createfield values here
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
                /*mark name fields as required*/
                required={[
                  "Song Name",
                  "Composer Name",
                  "Game Name",
                  "Developer Name",
                ].includes(field)}
                key={index}
                id={field}
                label={field}
                variant="standard"
                /*tie field values to creaFieldValues*/
                value={createFieldValues[field]}
                onChange={handleCreateFieldChange(field)}
              />
            </>
          ))}

          {/*render foreign keys when present*/}
          {fkeys !== null && (
            <>
              {/*key field's name*/}
              <p>{Object.keys(fkeys[0])[0]}:</p>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleFKChange}
                value={fkey}
                sx={{ minWidth: "170px" }}
              >
                {/*one select menu option per foreign key option*/}
                {fkeys.map((fkey, index) => (
                  <MenuItem key={index} value={fkey[Object.keys(fkey)[0]]}>
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
              {/*render the non-composer field name and id:name select options*/}
              <p>{Object.keys(intersectData[0])[0]}:</p>
              <Select
                sx={{ minWidth: "170px" }}
                labelId={`select-${field}-label`}
                id={`select-${field}`}
                value={createFieldValues[field]}
                onChange={handleCreateFieldChange(field)}
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
              {/*render the composer field name id:name select options*/}
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
                      <MenuItem key={index} value={fkey[Object.keys(fkey)[0]]}>
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
