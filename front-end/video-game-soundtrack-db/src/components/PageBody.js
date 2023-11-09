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
  const [intersectData, setIntersectData] = useState(null);

  const loadData = useCallback(async () => {
    setData(null);
    setFkeys(null);
    setIntersectData(null);
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
            [
              { "Developer ID": 0, "Developer Name": "Select Developer" },
            ].concat(
              data.map((datum) => ({
                "Developer ID": datum["Developer ID"],
                "Developer Name": datum["Developer Name"],
              }))
            )
          )
        );
      } else if (tableName === "Songs") {
        setFields(Object.keys(data[0]).slice(1, 2));
        setFkeys(
          [{ "Game ID": 0, "Game Name": "Select Game" }].concat(
            removeFKeyDuplicates(
              data.map((datum) => ({
                "Game ID": datum["Game ID"],
                "Game Name": datum["Game Name"],
              }))
            )
          )
        );
      }
    } else {
      setFields(Object.keys(data[0]));
      setIntersectData(Object.keys(data[0]).slice(0, 4));
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
          intersectData={intersectData}
        />
      </>
    );
  } else {
    <h1>Loading...</h1>;
  }
  // TODO: add form here
}
