import React, { useEffect, useState, useCallback } from "react";
import Tables from "./Tables";
import InputForm from "./InputForm";
import CreateForm from "./CreateForm";
import { CircularProgress } from "@mui/material";

const removeFKeyDuplicates = (fkeyArray) => {
  let newFKeyArray = [];
  let names = [];
  const keys = Object.keys(fkeyArray[0]);
  fkeyArray.forEach((key) => {
    if (!names.includes(key[keys[0]])) {
      names.push(key[keys[0]]);
      newFKeyArray.push(key);
    }
  });
  return newFKeyArray;
};

export default function PageBody({ tableName }) {
  // add search and add buttons
  const [data, setData] = useState(null);
  const [fields, setFields] = useState(null);
  const [fkeys, setFkeys] = useState(null);
  const [intersectData, setIntersectData] = useState(null);

  const loadData = useCallback(async () => {
    setData(null);
    setFkeys(null);
    setIntersectData(null);
    const response = await fetch(`./${tableName}`, {
      method: "Get",
    });
    const data = await response.json();
    setData(data);

    if (!tableName.includes("_")) {
      setFields(Object.keys(data[0]).slice(1));

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
      setFields(Object.keys(data[0]));
      setIntersectData(Object.keys(data[0]).slice(0, 5));
    }
  }, [tableName]);
  useEffect(() => {
    loadData();
  }, [tableName, loadData]);
  if (data && fields) {
    console.log(data);
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
    } else {
      return <CircularProgress color="inherit" />;
    }
  }
}
