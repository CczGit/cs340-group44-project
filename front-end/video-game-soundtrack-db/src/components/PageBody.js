import React, { useEffect, useState } from "react";
import Tables from "./Tables";

export default function PageBody(props) {
  return <Tables tableName={props.tableName} />;
  // TODO: add form here
}
