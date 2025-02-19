import React from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "../../../../images/icons/uploadBig.svg";
import styles from "./DropZone.module.scss";

const DropZone = ({ onDrop, accept, className = "", renderLabel = true }) => {
  const acceptDropzoneProp = { [accept]: [] };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: typeof accept === "string" ? acceptDropzoneProp : accept,
    multiple: false,
  });

  const getLabelbyType = () => {
    const fileType =
      accept.split("/")[0] === "*" ? "file" : accept.split("/")[0];
    const fileExtension = accept.split("/")[1];

    return `Click or drag ${
      fileType === "application" ? fileExtension : fileType
    } to this area to upload`;
  };

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      <div className={styles.labelWrapper}>
        <UploadIcon className={styles.uploadIcon} />
        {renderLabel && <p>{getLabelbyType()}</p>}
        {/* "Click or drag to this area to upload" */}
      </div>
    </div>
  );
};

export default DropZone;
