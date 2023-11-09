import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, CircularProgress } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Tables({ data, setData, tableName }) {
  // if id in fields, get list of ids to values

  if (data) {
    const columns = Object.keys(data[0]);
    const onDelete = async (e) => {
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
      if (result.status != 400) {
        if (data.length > 1) {
          setData(data.filter((_, index) => index !== +e.target.value));
        } else {
          setData(null);
        }
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
