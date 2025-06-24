import React, { useState } from "react";
import { Link } from "react-router-dom";
import { serverName } from "../../http/server";
import { ReactComponent as PreviewIcon } from "../../images/icons/search.svg";
import { ReactComponent as DownloadIcon } from "../../images/icons/download-file.svg";
import PdfPreview from "../PdfPreview/PdfPreview";
import styles from "./UserCertificatesList.module.scss";
import CertificateItemTagList from "./CertificateItemTagList";

const UserCertificatesItem = ({ certificate, type }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const certificateLink = certificate[`${type}_certificate_link`];

  const title = certificate[`${type}_name`];


  return (
    <div className={styles.certificateItem}>
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
        <div className={styles.btnsWrapper}>
          <button onClick={() => setPreviewVisible(true)}>
            <span>Preview</span>
            <PreviewIcon />
          </button>
          <a
            download={`${title} certificate`}
            href={`${serverName}/${certificateLink}`}
            target="_blank"
            rel="noreferrer"
          >
            <span>Certificate</span>
            <DownloadIcon />
          </a>
        </div>
      )}
      <PdfPreview
        pdfUrl={`${serverName}/${certificateLink}`}
        previewVisible={previewVisible}
        setPreviewVisible={setPreviewVisible}
      />
    </div>
  );
};

export default UserCertificatesItem;
