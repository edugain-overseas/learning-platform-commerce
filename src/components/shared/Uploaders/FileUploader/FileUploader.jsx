import React, { useState } from "react";
import { serverName } from "../../../../http/server";
import UploadedPDF from "./UploadedPDF";
import UploadedImage from "./UploadedImage";
import DropZone from "../DropZone/Dropzone";
import ProgressBar from "../../ProgressBar/ProgressBar";
import styles from "./FileUploader.module.scss";
import UploadedVideo from "./UploadedVideo";
import UploadedAudio from "./UploadedAudio";
import { privateRoutesHandler } from "../../../../http/privateRoutesHandler";

const defaultRequestConfig = {
  url: "/course/upload/course/image",
  formDataKey: "file",
};

const FileUploader = ({
  className = "",
  type,
  accept = "image/*",
  uploadedFilePath,
  setUploadedFilePath,
  setUploadedFile,
  requestConfig = defaultRequestConfig,
  renderDropZoneLabel,
  renderProgressBar = true,
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  if (!type) return null;

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    uploadFile(file);
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append(requestConfig.formDataKey, file);
    setProgress(0);
    try {
      const data = await privateRoutesHandler(
        "post",
        requestConfig.url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentComplete = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setProgress(percentComplete);
          },
        }
      );

      if (data.image_path) {
        setUploadedFilePath && setUploadedFilePath(data.image_path);
      } else {
        setUploadedFilePath && setUploadedFilePath(data.file_path);
      }

      setUploadedFile && setUploadedFile(data);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleDelete = () => {
    setUploadedFilePath(null);
    setProgress(0);
    setFile(null);
  };

  const renderComponentByType = () => {
    switch (type) {
      case "image":
        return (
          <UploadedImage
            src={`${serverName}/${uploadedFilePath}`}
            onDelete={handleDelete}
          />
        );
      case "pdf":
        return (
          <UploadedPDF
            src={`${serverName}/${uploadedFilePath}`}
            onDelete={handleDelete}
          />
        );
      case "video":
        return (
          <UploadedVideo
            src={`${serverName}/${uploadedFilePath}`}
            onDelete={handleDelete}
          />
        );
      case "audio":
        return (
          <UploadedAudio
            src={`${serverName}/${uploadedFilePath}`}
            onDelete={handleDelete}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className={`${styles.fileUploader} ${className}`}>
      {uploadedFilePath ? (
        renderComponentByType()
      ) : (
        <>
          <DropZone
            onDrop={handleDrop}
            accept={accept}
            className={styles.dropzone}
            renderLabel={renderDropZoneLabel}
          />
          {file && renderProgressBar && (
            <ProgressBar
              value={progress}
              width={200}
              height={32}
              className={styles.progressBar}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FileUploader;
