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
    //handle multiple formats
    if (typeof(accept) === 'object') {
      const fileTypes = Object.values(accept).join().replaceAll('.', ' ')
      
      return `Click or drag ${fileTypes} to upload`
    }
    //handle single format
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
      </div>
    </div>
  );
};

export default DropZone;
