/*
  Main Page Component
  Includes code from the Material UI documentation for the Material UI components used.
*/

import React, { useEffect, useState, useCallback } from "react";
import Tables from "./Tables";
import InputForm from "./InputForm";
import CreateForm from "./CreateForm";
import { CircularProgress } from "@mui/material";

export default function PageBody({ tableName }) {
  // holds raw return from table display query
  const [data, setData] = useState(null);

  // holds column names
  const [fields, setFields] = useState(null);

  // holds foreign keys if present
  const [fkeys, setFkeys] = useState(null);

  // special value to hold non-composer values for intersect tables
  const [intersectData, setIntersectData] = useState(null);

  // load data for current table, useCallback to avoid data reset on re-render
  const loadData = useCallback(async () => {
    // reset all values
    setData(null);
    setFkeys(null);
    setIntersectData(null);

    // initial query, table specifics for this and all queries are defined in express
    const response = await fetch(`./${tableName}`, {
      method: "Get",
    });
    const data = await response.json();
    setData(data);

    if (!tableName.includes("_")) {
      // slice out IDs from the form text fields
      setFields(Object.keys(data[0]).slice(1));

      /* slice out foreign keys from the games and songs tables, 
         store foreign keys in separate table, remaining tables
         do not have foreign keys*/
      if (tableName === "Games") {
        setFields(
          Object.keys(data[0]).slice(1, 2).concat(Object.keys(data[0]).slice(4))
        );
        const fKeysResponse = await fetch(`./fkeys/${tableName}`, {
          method: "Get",
        });
        const fkeyData = await fKeysResponse.json();
        setFkeys(
          [
            {
              "Developer ID": 0,
              "Developer Name": "NULL",
            },
          ].concat(fkeyData)
        );
      } else if (tableName === "Songs") {
        setFields(
          Object.keys(data[0]).slice(1, 2).concat(Object.keys(data[0]).slice(4))
        );
        const fKeysResponse = await fetch(`./fkeys/${tableName}`, {
          method: "Get",
        });
        const fkeyData = await fKeysResponse.json();
        setFkeys(
          [
            {
              "Game ID": 0,
              "Game Name": "NULL",
            },
          ].concat(fkeyData)
        );
      }
    } else {
      // get the composers and other key for the intersect tables
      setFields(Object.keys(data[0]));
      const fKeysResponse = await fetch(`./fkeys/${tableName}`, {
        method: "Get",
      });
      const fkeyData = await fKeysResponse.json();
      setFkeys(fkeyData);
      const intersectResponse = await fetch(`./intersectkeys/${tableName}`, {
        method: "Get",
      });
      const intersectDecoded = await intersectResponse.json();
      setIntersectData(intersectDecoded);
    }
  }, [tableName]);
  /* call loadData function on initial load and on 
     changes in tableName or the function */
  useEffect(() => {
    loadData();
  }, [tableName, loadData]);

  // conditional render of table and forms
  if (data && fields) {
    return (
      <>
        <h1>{tableName}</h1>

        {data !== null && (
          <Tables
            data={data}
            setData={setData}
            loadData={loadData}
            tableName={tableName}
          />
        )}
        <InputForm
          fields={fields}
          tableName={tableName}
          data={data}
          fkeys={fkeys}
          intersectData={intersectData}
          setData={setData}
          loadData={loadData}
        />
      </>
    );
    // display create form for empty tables
  } else if (fields && tableName) {
    if (tableName.includes(fields[0].substring(0, 3))) {
      return (
        <>
          <h1>{tableName}</h1>
          <p>
            This table seems to be empty. Please add values using the form
            below.
          </p>
          <br />
          <CreateForm
            fields={fields}
            tableName={tableName}
            data={data}
            fkeys={fkeys}
            intersectData={intersectData}
            loadData={loadData}
          />
        </>
      );
      // loading inbetween renders
    } else {
      return <CircularProgress color="inherit" />;
    }
  }
}
