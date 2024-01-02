import React, { useState } from "react";
import Select from "../shared/Select/Select";
import CircleProgressBar from "../shared/CircleProgressBar/CircleProgressBar";

const options = [
  { label: "red", value: "1", disabled: false },
  { label: "white", value: "2", disabled: false },
  { label: "green", value: "3", disabled: false },
  { label: "blue", value: "4", disabled: false },
  { label: "dark", value: "5", disabled: false },
  { label: "grey", value: "6", disabled: true },
  {
    label:
      "yellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellow yellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellow yellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellow yellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellow yellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellowyellow",
    value: "7",
    disabled: false,
  },
  { label: "orange", value: "8", disabled: false },
  { label: "purple", value: "9", disabled: false },
];

const CreateLessonModal = () => {
  const [selectValue, setSelectValue] = useState("");
  const onChange = (value) => {
    setSelectValue(value);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Select
        options={options}
        value={selectValue}
        onChange={onChange}
        borderless={true}
        placeholder="Please select color"
        wrapperStyles={{ width: "160rem", fontSize: "14rem" }}
      />
      <CircleProgressBar/>
    </div>
  );
};

export default CreateLessonModal;
