/*
  Main Table Component
  All material UI components are implemented using code based heavily on
  the material UI documentation. Taken throughout different dates between November and December of 2023
  Link: https://mui.com/material-ui/getting-started/
*/

import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Tables({ data, setData, tableName, loadData }) {
  // conditional render of table, only show if there is data
  if (data) {
    // fields are columns
    const columns = Object.keys(data[0]);
    // this has to be inside here to avoid errors
    const onDelete = async (e) => {
      /* data holds all values, 
      e.target.value will be the index of the deleted value,
      columns array holds the field names ie: "Developer ID"
      three values required for delete query:
      column 0 will be the primary key
      column 2 will be any foreign key if present
      "DELETE" the operation to be completed*/
      const request = [
        data[e.target.value][columns[0]],
        data[e.target.value][columns[2]],
        "DELETE",
      ];
      const result = await fetch(`./${tableName}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(request),
      });
      // only delete if the query went through
      if (result.status !== 400) {
        /*if there is only one value, set data to null 
        to avoid errors due to attempting to render an
        empty array */
        loadData();
      }
    };
    return (
      <TableContainer
        className="tableContainer"
        component={Paper}
        sx={{
          borderRadius: "5px",
          backgroundColor: "#0000001d",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          color: "aliceblue",
        }}
      >
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {/* one column per field */}
              {columns.map((column) => (
                <TableCell
                  sx={{ color: "aliceblue", fontSize: "large" }}
                  key={column}
                >
                  {column}
                </TableCell>
              ))}
              <TableCell sx={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* one row per entry */}
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((field, index) => (
                  <TableCell
                    key={index ** 0.68}
                    component="th"
                    scope="row"
                    sx={{ color: "aliceblue" }}
                  >
                    {field}
                  </TableCell>
                ))}
                <TableCell sx={{ color: "white" }}>
                  <Button
                    value={index}
                    onClick={onDelete}
                    color="error"
                    variant="contained"
                    size="small"
                  >
                    {" "}
                    DELETE{" "}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  } else {
    return <CircularProgress color="inherit" />;
  }
}
