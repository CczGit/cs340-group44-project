/*
  Main Forms Component
  All material UI components are implemented using code based heavily on
  the material UI documentation. Taken throughout different dates between November and December of 2023
  Link: https://mui.com/material-ui/getting-started/
*/

import React, { useState } from "react";
import CreateForm from "./CreateForm";
import UpdateForm from "./UpdateForm";
import SearchForm from "./SearchForm";
import { Button, ButtonGroup } from "@mui/material";

export default function InputForm({
  data,
  tableName,
  fields,
  fkeys,
  intersectData,
  setData,
  loadData,
}) {
  // if id in fields -> get list of ids to values
  // use drop downs for ids
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
  const [search, setSearch] = useState(false);
  const [oldData, setOldData] = useState(null);
  const idVar = Object.keys(data[0])[0];
  const nameVar = Object.keys(data[0])[1];
  const fkeyVar = Object.keys(data[0])[2];
  const createHandler = () => {
    console.log();
    setCreate(!create);
  };
  const updateHandler = () => {
    setUpdate(!update);
  };
  const searchHandler = () => {
    setSearch(!search);
  };
  const resetHandler = () => {
    setData(oldData);
    setOldData(null);
  };
  if (data !== null) {
    return (
      <>
        {(create || update || search) && (
          <div className="formContainer">
            {create && (
              <>
                <CreateForm
                  fkeys={fkeys}
                  idVar={idVar}
                  fkeyVar={fkeyVar}
                  nameVar={nameVar}
                  fields={fields}
                  intersectData={intersectData}
                  tableName={tableName}
                  onClose={createHandler}
                  data={data}
                  loadData={loadData}
                />
              </>
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
                tableName={tableName}
                intersectData={intersectData}
                loadData={loadData}
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
                intersectData={intersectData}
                tableName={tableName}
                setData={setData}
                setOldData={setOldData}
              />
            )}
          </div>
        )}
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          sx={{ margin: "2%" }}
        >
          {!create && <Button onClick={createHandler}>CREATE</Button>}
          {!update && <Button onClick={updateHandler}>UPDATE</Button>}
          {!search && !oldData && (
            <Button onClick={searchHandler}>SEARCH</Button>
          )}
          {oldData && <Button onClick={resetHandler}>RESET TABLE</Button>}
        </ButtonGroup>
      </>
    );
  }
}
