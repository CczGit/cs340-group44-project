import React, { useState } from "react";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import SearchForm from "./SearchForm";
import { Button, ButtonGroup } from "@mui/material";

export default function InputForm({ data, tableName, fields }) {
  // if id in fields -> get list of ids to values
  // use drop downs for ids
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState(false);

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
              fields={fields}
              tableName={tableName}
              onClose={createHandler}
            />
          )}
          {update && (
            <UpdateForm fields={fields} data={data} onClose={updateHandler} />
          )}
          {search && <SearchForm fields={fields} onClose={searchHandler} />}
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
