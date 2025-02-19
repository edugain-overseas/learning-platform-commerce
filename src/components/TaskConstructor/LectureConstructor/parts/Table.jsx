import React from "react";
import TitleInput from "./shared/TitleInput";
import TextInput from "./shared/TextInput";
import TableConstructor from "../../../Table/TableConstructor";

const Table = ({ partData, setters }) => {
  console.log(partData);

  return (
    <>
      <TitleInput value={partData.a_title} setValue={setters.title} />
      {partData.table_data && (
        <TableConstructor
          state={partData.table_data}
          setState={setters.tableData}
        />
      )}
      <TextInput value={partData.a_text} setValue={setters.text} />
    </>
  );
};

export default Table;
