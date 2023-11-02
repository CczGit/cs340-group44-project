import React, { useEffect, useState } from "react";
import Tables from "./Tables";
import InputForm from "./InputForm";

export default function PageBody({ tableName }) {
  // add search and add buttons
  const [data, setData] = useState(null);
  const [fields, setFields] = useState(null);
  const loadData = async () => {
    const response = await fetch(`http://localhost:9124/${tableName}`, {
      method: "Get",
    });
    const data = await response.json();
    setData(data);

    if (!tableName.includes("_")) {
      setFields(Object.keys(data[0]).slice(1));
    } else {
      setFields(Object.keys(data[0]));
    }
  };
  useEffect(() => {
    loadData();
  }, [tableName]);
  if (data && fields) {
    return (
      <>
        <h1>{tableName}</h1>

        <Tables data={data} />
        <InputForm fields={fields} tableName={tableName} data={data} />
      </>
    );
  } else {
    <h1>Loading...</h1>;
  }
  // TODO: add form here
}
