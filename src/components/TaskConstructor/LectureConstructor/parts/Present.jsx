import React from "react";
import TitleInput from "./shared/TitleInput";
import FileUploader from "../../../shared/Uploaders/FileUploader/FileUploader";
import TextInput from "./shared/TextInput";
import styles from "../LectureConstructor.module.scss";

const Present = ({ partData, setters }) => (
  <>
    <TitleInput value={partData.a_title} setValue={setters.title} />
    <FileUploader
      type="pdf"
      accept="application/pdf"
      className={styles.uploaderWrapper}
      uploadedFilePath={partData.file_path}
      setUploadedFilePath={setters.filePath}
      requestConfig={{ url: "lesson/upload/file", formDataKey: "file" }}
    />
    <TextInput value={partData.a_text} setValue={setters.text} />
  </>
);

export default Present;
