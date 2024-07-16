import React from "react";
import TitleInput from "./shared/TitleInput";
import TextInput from "./shared/TextInput";

const Text = ({ partData, setters }) => {
  return (
    <>
      <TitleInput value={partData.a_title} setValue={setters.title} />
      <TextInput value={partData.a_text} setValue={setters.text} />
    </>
  );
};

export default Text;
