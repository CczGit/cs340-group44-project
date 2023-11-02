import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function PageBody(props) {
  const [data, setData] = useState(null);
  console.log(props);
  const loadData = async () => {
    const response = await fetch(`http://localhost:9124/${props.tableName}`, {
      method: "Get",
    });
    const data = await response.json();
    setData(data);
  };
  useEffect(() => {
    loadData();
  }, [props.tableName]);

  if (data) {
    const columns = Object.keys(data[0]);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column}>{column}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.values(row).map((field, index) => (
                  <TableCell key={index} component="th" scope="row">
                    {field}
                  </TableCell>
                ))}
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
