import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Tables({ data }) {
  // if id in fields, get list of ids to values

  if (data) {
    const columns = Object.keys(data[0]);
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
            {data.map((row, index) => (
              <TableRow key={index}>
                {Object.values(row).map((field, index) => (
                  <TableCell
                    key={index}
                    component="th"
                    scope="row"
                    sx={{ color: "aliceblue" }}
                  >
                    {field}
                  </TableCell>
                ))}
                <TableCell sx={{ color: "white" }}>
                  <Button color="error" variant="contained" size="small">
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
    return <h1>Loading....</h1>;
  }
}
