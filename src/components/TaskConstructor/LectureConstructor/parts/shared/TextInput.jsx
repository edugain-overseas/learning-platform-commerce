import React from "react";
import RichTextEditor from "../../../../shared/RichTextEditor/RichTextEditor";
import styles from '../../LectureConstructor.module.scss'

const TextInput = ({ value, setValue }) => {
  return (
    <RichTextEditor
      placeholder="Block text"
      value={value}
      setValue={setValue}
      className={styles.textEditor}
    />
  );
};

export default TextInput;
