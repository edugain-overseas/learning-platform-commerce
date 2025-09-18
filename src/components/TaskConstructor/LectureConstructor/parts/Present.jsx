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
      accept={{
        "application/pdf": [".pdf"],
        "application/vnd.ms-powerpoint": [".ppt", ".pps"],
        "application/vnd.openxmlformats-officedocument.presentationml.presentation":
          [".pptx"],
        "application/vnd.openxmlformats-officedocument.presentationml.slideshow":
          [".ppsx"],
      }}
      className={styles.uploaderWrapper}
      uploadedFilePath={partData.file_path}
      setUploadedFilePath={setters.filePath}
      requestConfig={{ url: "lesson/upload/file", formDataKey: "file" }}
      iconSize="s"
    />
    <TextInput value={partData.a_text} setValue={setters.text} />
  </>
);

export default Present;
