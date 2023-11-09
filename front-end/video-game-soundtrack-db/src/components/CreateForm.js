import React, { useState } from "react";
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
  data,
  loadData,
  nameVar,
}) {
  let firstKey = "";
  if (fkeys) {
    firstKey = Object.values(fkeys[0])[0];
  }
  const [dialogOpen, setDialogOpen] = useState(false);
  const [message, setMessage] = useState("Error");
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
  const handleSubmit = async (e) => {
    if (createFieldValues[nameVar] === "") {
      setMessage(`Invalid request. ${nameVar} is required`);
      setDialogOpen(true);
    } else {
      onClose();
      const request = [createFieldValues, fkey, "CREATE"];
      const result = await fetch(`./${tableName}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });
      if (result.status === 400) {
        const data = await result.json();
        console.log(data);
      } else {
        console.log("added successfully");
        loadData();
      }
    }
  };
  const [fkey, setFkey] = useState(firstKey);
  const handleFKChange = (e) => {
    setFkey(e.target.value);
  };
  if (dialogOpen) {
    return (
      <InvalidAlert
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        message={message}
      />
    );
  } else if (!tableName.includes("_")) {
    return (
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
                required={[
                  "Song Name",
                  "Composer Name",
                  "Game Name",
                  "Developer Name",
                ].includes(field)}
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
