import React, { useState } from "react";
import { ReactComponent as SaveIcon } from "../../../images/icons/saveTemplate.svg";
import Textarea from "../Textarea/Textarea";
import styles from "./Template.module.scss";

const SaveTemplateForm = ({ type, handleSave }) => {
  const [title, setTitle] = useState("");

  return (
    <form
      className={styles.saveTemplateForm}
      onSubmit={(e) => {
        e.preventDefault();
        handleSave(title);
      }}
    >
      <p>
        <span>Template type: </span>
        {type}
      </p>
      <Textarea
        placeholder="Template title"
        value={title}
        onChange={setTitle}
        maxRows={1}
        fontSize={18}
      />
      <button type="sumbit">
        <span>Save template</span>
        <SaveIcon />
      </button>
    </form>
  );
};

export default SaveTemplateForm;
