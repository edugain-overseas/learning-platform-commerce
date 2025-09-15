import React, { useRef } from "react";
import { useDropzone } from "react-dropzone";
import { ReactComponent as UploadIcon } from "../../../../images/icons/uploadBig.svg";
import { message } from "antd";
import styles from "./DropZone.module.scss";

const popularFormatsByAccept = (type) => {
  switch (type) {
    case "image":
      return ["jpg", "png", "svg", "webp"];

    case "video":
      return ["mp4", "mov", "avi", "mkv"];

    case "audio":
      return ["mp3", "wav", "aac", "ogg"];

    case "pdf":
      return ["pdf", "ppt", "pptx", "pps"];

    case "table":
      return ["xls", "xlsx", "csv"];

    case "file":
      return ["doc", "docx", "otd", "rtf"];

    default:
      return null;
  }
};

const DropZone = ({
  onDrop: handleDrop,
  accept,
  className = "",
  renderLabel = true,
  iconSize = "l",
  type,
}) => {
  const acceptDropzoneProp = { [accept]: [] };
  const inputRef = useRef();

  const onDrop = (acceptedFiles, fileRejections) => {
    if (fileRejections.length > 0) {
      fileRejections.forEach((rej) => {
        rej.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            message.error("File is too large! Maximum size is 32 MB.", 3);
          } else {
            message.error(err.message, 3);
          }
        });
      });
      return;
    }
    handleDrop(acceptedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: typeof accept === "string" ? acceptDropzoneProp : accept,
    multiple: false,
    maxSize: 32 * 1024 * 1024,
    noClick: true,
    onDrop,
  });

  const getLabelbyType = () => {
    //handle multiple formats
    if (typeof accept === "object") {
      const fileTypes = Object.values(accept).join().replaceAll(".", " ");

      return `Click or drag ${fileTypes} to upload`;
    }
    //handle single format
    const fileType =
      accept.split("/")[0] === "*" ? "file" : accept.split("/")[0];
    const fileExtension = accept.split("/")[1];

    return `Click or drag ${
      fileType === "application" ? fileExtension : fileType
    } to this area to upload`;
  };

  const getSublableByType = () => {
    const sizeStr = "Maximum size 32 mb";
    const formatsToDisplay = popularFormatsByAccept(type);
    if (formatsToDisplay) {
      return `Available formats: ${formatsToDisplay.join(
        ", "
      )}, etc. / ${sizeStr}`;
    } else {
      return sizeStr;
    }
  };

  return (
    <div
      {...getRootProps({ className })}
      onClick={() => inputRef.current.click()}
    >
      <input {...getInputProps({ ref: inputRef })} />
      <div className={styles.labelWrapper}>
        <UploadIcon
          className={`${styles.uploadIcon} ${styles[`size-${iconSize}`]}`}
        />
        {renderLabel && (
          <>
            <p>{getLabelbyType()}</p>
            <p>{getSublableByType()}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default DropZone;
