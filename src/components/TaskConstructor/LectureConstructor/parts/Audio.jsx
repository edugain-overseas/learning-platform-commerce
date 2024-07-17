import React from "react";
import TitleInput from "./shared/TitleInput";
import FileUploader from "../../../shared/Uploaders/FileUploader/FileUploader";
import TextInput from "./shared/TextInput";
import styles from "../LectureConstructor.module.scss";

const Audio = ({ partData, setters }) => {
  return (
    <>
      <TitleInput value={partData.a_title} setValue={setters.title} />
      <FileUploader
        type="audio"
        accept="audio/*"
        className={styles.uploaderWrapper}
        uploadedFilePath={partData.file_path}
        setUploadedFilePath={setters.filePath}
        requestConfig={{ url: "lesson/upload/file", formDataKey: "file" }}
      />
      <TextInput value={partData.a_text} setValue={setters.text} />
    </>
  );
};

export default Audio;
