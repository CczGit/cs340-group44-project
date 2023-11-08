import React, { useEffect, useState, useCallback } from "react";
import Tables from "./Tables";
import InputForm from "./InputForm";

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

  const loadData = useCallback(async () => {
    setData(null);
    const response = await fetch(`http://localhost:9100/${tableName}`, {
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
        setFkeys(
          removeFKeyDuplicates(
            data.map((datum) => ({
              "Developer ID": datum["Developer ID"],
              "Developer Name": datum["Developer Name"],
            }))
          )
        );
      } else if (tableName === "Songs") {
        setFields(Object.keys(data[0]).slice(1, 2));
        setFkeys(
          removeFKeyDuplicates(
            data.map((datum) => ({
              "Game ID": datum["Game ID"],
              "Game Name": datum["Game Name"],
            }))
          )
        );
      }
    } else {
      setFields(Object.keys(data[0]));
    }
  }, [tableName]);
  useEffect(() => {
    loadData();
  }, [tableName, loadData]);
  if (data && fields) {
    return (
      <>
        <h1>{tableName}</h1>

        <Tables data={data} />
        <InputForm
          fields={fields}
          tableName={tableName}
          data={data}
          fkeys={fkeys}
        />
      </>
    );
  } else {
    <h1>Loading...</h1>;
  }
  // TODO: add form here
}
