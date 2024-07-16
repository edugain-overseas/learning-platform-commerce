import React from "react";
import Textarea from "../../../../shared/Textarea/Textarea";
import styles from "../../LectureConstructor.module.scss";

const TextInput = ({ value, setValue }) => {
  return (
    <Textarea
      className={styles.textInput}
      value={value}
      onChange={setValue}
      minRows={4}
      maxRows={20}
      placeholder="Block text"
    />
  );
};

export default TextInput;
