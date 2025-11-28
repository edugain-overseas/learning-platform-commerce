import React, { useState } from "react";
import { Link } from "react-router-dom";
import { serverName } from "../../http/server";
import { ReactComponent as PreviewIcon } from "../../images/icons/eye-fullscreen.svg";
import { ReactComponent as DownloadIcon } from "../../images/icons/document-download.svg";
import { ReactComponent as CartIcon } from "../../images/icons/cart.svg";
import PdfPreview from "../PdfPreview/PdfPreview";
import CertificateItemTagList from "./CertificateItemTagList";
import styles from "./UserCertificatesList.module.scss";
import BuyCourseBtn from "../shared/BuyCourseBtn/BuyCourseBtn";

const UserCertificatesItem = ({ certificate, type }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const certificateLink = certificate[`${type}_certificate_link`];

  const title = certificate[`${type}_name`];

  const isNotPurchasedCourse =
    type === "course" && certificate.course_status === null;

  return (
    <div
      className={`${styles.certificateItem} ${styles[type]} ${
        isNotPurchasedCourse ? styles.notPurchasedCourse : ""
      }`}
    >
      <div className={styles.linkWrapper}>
        <Link
          to={certificate.course_id && `/course/${certificate.course_id}/intro`}
          className={styles.certificateLink}
        >
          <h4>{title}</h4>
        </Link>
        <CertificateItemTagList certificate={certificate} type={type} />
      </div>
      {certificateLink && (
        <>
          <div className={styles.btnsWrapper}>
            <button onClick={() => setPreviewVisible(true)} title="Preview">
              <PreviewIcon />
            </button>
            <a
              download={`${title} certificate`}
              href={`${serverName}/${certificateLink}`}
              target="_blank"
              rel="noreferrer"
              title="Download"
            >
              <DownloadIcon />
            </a>
          </div>
          <PdfPreview
            pdfUrl={certificateLink}
            previewVisible={previewVisible}
            setPreviewVisible={setPreviewVisible}
          />
        </>
      )}
      {isNotPurchasedCourse && (
        <>
          <CartIcon className={styles.buyIcon} />
          <BuyCourseBtn courseId={certificate.course_id} className={styles.hidden}/>
        </>
      )}
    </div>
  );
};

export default UserCertificatesItem;
