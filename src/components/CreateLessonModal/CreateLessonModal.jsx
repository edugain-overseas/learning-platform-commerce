import React, { useState } from "react";
import Select from "../shared/Select/Select";
import CircleProgressBar from "../shared/CircleProgressBar/CircleProgressBar";
import Textarea from "../shared/Textarea/Textarea";
import RichTextEditor from "../shared/RichTextEditor/RichTextEditor";
// import TextReader from "../TextReader/TextReader";

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

// const toRead =
//   "This course introduces basic economic, concepts that are fundamental to understand, many of the issues faced by business firms. Learn the processes that govern the production and consumption of goods and services in a global economy: Microeconomics and Macroeconomics.";

const CreateLessonModal = () => {
  const [selectValue, setSelectValue] = useState("");
  const [textareaValue, setTeaxtareaValue] = useState("");

  const onChange = (value) => {
    setSelectValue(value);
  };
  return (
    <div style={{ padding: "100rem" }}>
      <div>
        <Select
          options={options}
          value={selectValue}
          onChange={onChange}
          borderless={true}
          placeholder="Please select color"
          wrapperStyles={{ width: "160rem", fontSize: "14rem" }}
        />
      </div>
      <div>
        <CircleProgressBar strokeColor="#B8EAFF" strokeWidth={8} />
      </div>
      <div style={{marginBottom: 50}}>
        <Textarea
          width="300rem"
          minRows={4}
          value={textareaValue}
          onChange={setTeaxtareaValue}
        />
      </div>
      <RichTextEditor />
    </div>
  );
};

export default CreateLessonModal;
