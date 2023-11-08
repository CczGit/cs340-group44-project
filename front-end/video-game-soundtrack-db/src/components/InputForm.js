import React, { useState } from "react";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import SearchForm from "./SearchForm";
import { Button, ButtonGroup } from "@mui/material";

export default function InputForm({ data, tableName, fields, fkeys }) {
  // if id in fields -> get list of ids to values
  // use drop downs for ids
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState(false);
  const idVar = Object.keys(data[0])[0];
  const nameVar = Object.keys(data[0])[1];
  const fkeyVar = Object.keys(data[0])[2];
  const createHandler = () => {
    setCreate(!create);
  };
  const updateHandler = () => {
    setUpdate(!update);
  };
  const searchHandler = () => {
    setSearch(!search);
  };

  return (
    <>
      {(create || update || search) && (
        <div className="formContainer">
          {create && (
            <CreateForm
              fkeys={fkeys}
              idVar={idVar}
              fkeyVar={fkeyVar}
              nameVar={nameVar}
              fields={fields}
              onClose={createHandler}
            />
          )}
          {update && (
            <UpdateForm
              fields={fields}
              data={data}
              onClose={updateHandler}
              fkeys={fkeys}
              idVar={idVar}
              fkeyVar={fkeyVar}
              nameVar={nameVar}
            />
          )}
          {search && (
            <SearchForm
              fields={fields}
              onClose={searchHandler}
              data={data}
              fkeys={fkeys}
              idVar={idVar}
              nameVar={nameVar}
              fkeyVar={fkeyVar}
            />
          )}
        </div>
      )}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {!create && !tableName.includes("_") && (
          <Button onClick={createHandler}>CREATE</Button>
        )}
        {!update && !tableName.includes("_") && (
          <Button onClick={updateHandler}>UPDATE</Button>
        )}
        {!search && <Button onClick={searchHandler}>SEARCH</Button>}
      </ButtonGroup>
    </>
  );
}
