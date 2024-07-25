import React from "react";
import Textarea from "../../../../shared/Textarea/Textarea";
import styles from "../../LectureConstructor.module.scss";

const TitleInput = ({ value, setValue }) => (
  <Textarea
    className={styles.titleInput}
    value={value}
    onChange={setValue}
    minRows={1}
    maxRows={4}
    placeholder="Block title"
    fontSize={16}
  />
);

export default TitleInput;
