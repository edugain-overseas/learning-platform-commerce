import React, { useState } from "react";
import { instance } from "../../../../http/instance";
import Dropzone from "../DropZone/Dropzone";
import UploadedImage from "../FileUploader/UploadedImage";
import ProgressBar from "../../ProgressBar/ProgressBar";
import styles from "./ImageUploader.module.scss";
import { serverName } from "../../../../http/sever";

const defaultRequestConfig = {
  url: "/upload/course/image",
  formDataKey: "file",
};

const ImageUploader = ({
  uploadedImage,
  setUploadedImage,
  requestConfig = defaultRequestConfig,
}) => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFile(file);
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append(requestConfig.formDataKey, file);
    setProgress(0);
    try {
      const { data } = await instance.post(requestConfig.url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentComplete = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setProgress(percentComplete);
        },
      });

      setUploadedImage(data.image_path);
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const handleDelete = () => {
    setUploadedImage(null);
    setProgress(0);
    setFile(null);
  };

  return (
    <div className={styles.imageUploader}>
      {uploadedImage ? (
        <UploadedImage
          src={`${serverName}/${uploadedImage}`}
          onDelete={handleDelete}
        />
      ) : (
        <>
          <Dropzone
            onDrop={handleDrop}
            accept="image/*"
            className={styles.dropzone}
          />
          {file && (
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

export default ImageUploader;
