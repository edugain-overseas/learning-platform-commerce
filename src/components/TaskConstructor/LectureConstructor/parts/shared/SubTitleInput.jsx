import React from "react";
import Textarea from "../../../../shared/Textarea/Textarea";
import styles from "../../LectureConstructor.module.scss";

const SubTitleInput = ({ value, setValue }) => (
  <Textarea
    className={styles.titleInput}
    value={value}
    onChange={setValue}
    minRows={1}
    maxRows={4}
    placeholder="Block subtitle"
    fontSize={14}
  />
);

export default SubTitleInput;
