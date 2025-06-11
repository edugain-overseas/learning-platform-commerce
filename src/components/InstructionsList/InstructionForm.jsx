import React from "react";
import { useForm } from "react-hook-form";
import RichTextEditor from "../shared/RichTextEditor/RichTextEditor";
import FileUploader from "../shared/Uploaders/FileUploader/FileUploader";
import styles from "./InstructionsList.module.scss";

const InstructionForm = ({ edit = false }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.instructionForm}>
      <input type="text" {...register("title")} />
      <RichTextEditor />
      <ul className={styles.uploadedFiles}></ul>
      <FileUploader type="doc" accept="*/*" className={styles.uploaderWrapper}/>
      <button type="submit">Submit</button>
    </form>
  );
};

export default InstructionForm;
