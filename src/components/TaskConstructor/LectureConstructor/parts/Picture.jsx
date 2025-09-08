import React from "react";
import TitleInput from "./shared/TitleInput";
import TextInput from "./shared/TextInput";
import FileUploader from "../../../shared/Uploaders/FileUploader/FileUploader";
import ImageGroup from "../../../shared/ImageGroup/ImageGroup";
import styles from "../LectureConstructor.module.scss";

const Picture = ({ partData, setters }) => {
  return (
    <>
      <TitleInput value={partData.a_title} setValue={setters.title} />
      {partData.files.length !== 0 && (
        <ImageGroup
          styles={styles}
          imagesData={partData.files}
          isDesc={true}
          setDescription={setters.setDescription}
          handleDeleteFile={setters.deleteFile}
          disabled={false}
        />
      )}
      {partData.files.length < 6 && (
        <FileUploader
          className={styles.uploaderWrapper}
          type="image"
          accept="image/*"
          setUploadedFile={setters.addFile}
          requestConfig={{ url: "lesson/upload/file", formDataKey: "file" }}
          iconSize="m"
        />
      )}

      <TextInput value={partData.a_text} setValue={setters.text} />
    </>
  );
};

export default Picture;
