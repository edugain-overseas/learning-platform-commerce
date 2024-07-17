import React from "react";
import PDFReader from "../../../PDFReader/PDFReader";
import DeleteBtn from "./DeleteBtn";
import styles from "./FileUploader.module.scss";

const UploadedPDF = ({ src, onDelete }) => {
  return (
    <div className={styles.uploadedFileWrapper}>
      <PDFReader pdf={src} />
      <DeleteBtn onDelete={onDelete} />
    </div>
  );
};

export default UploadedPDF;
