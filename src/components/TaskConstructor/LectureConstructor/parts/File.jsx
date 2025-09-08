import React from "react";
import TitleInput from "./shared/TitleInput";
import TextInput from "./shared/TextInput";
import DocumentLink from "../../../shared/DocumentLink/DocumentLink";
import styles from "../LectureConstructor.module.scss";
import FileUploader from "../../../shared/Uploaders/FileUploader/FileUploader";

const File = ({ partData, setters }) => {
  return (
    <>
      <TitleInput value={partData.a_title} setValue={setters.title} />
      {partData.files.length !== 0 && (
        <div className={styles.uploadedDocsWrapper}>
          {partData.files.map((file) => (
            <DocumentLink key={file.filename} file={file} />
          ))}
        </div>
      )}
      <FileUploader
        className={styles.uploaderWrapper}
        type="doc"
        accept="*/*"
        setUploadedFile={setters.addFile}
        requestConfig={{ url: "lesson/upload/file", formDataKey: "file" }}
        iconSize="m"
      />
      <TextInput value={partData.a_text} setValue={setters.text} />
    </>
  );
};

export default File;
