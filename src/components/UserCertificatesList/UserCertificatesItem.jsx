import React, { useState } from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import { serverName } from "../../http/server";
import { ReactComponent as PreviewIcon } from "../../images/icons/search.svg";
import { ReactComponent as DownloadIcon } from "../../images/icons/download-file.svg";
import styles from "./UserCertificatesList.module.scss";

const UserCertificatesItem = ({ title, certificate }) => {
  const [previewVisible, setPreviewVisible] = useState(false);

  const certificateLink = `${serverName}/${certificate.link}`;

  return (
    <li className={styles.certificateItem}>
      <div className={styles.linkWrapper}>
        <Link
          to={`/course/${certificate.course_id}/intro`}
          className={styles.certificateLink}
        >
          <h4>{title}</h4>
        </Link>
      </div>
      <div className={styles.btnsWrapper}>
        <button onClick={() => setPreviewVisible(true)}>
          <span>Preview</span>
          <PreviewIcon />
        </button>
        <a
          download={`${title} certificate`}
          href={certificateLink}
          target="_blank"
          rel="noreferrer"
        >
          <span>Certificate</span>
          <DownloadIcon />
        </a>
      </div>
      <Image
        width={0}
        style={{
          display: "none",
        }}
        wrapperStyle={{
          position: "absolute",
        }}
        src={certificateLink}
        preview={{
          visible: previewVisible,
          src: certificateLink,
          onVisibleChange: (value) => {
            setPreviewVisible(value);
          },
        }}
      />
    </li>
  );
};

export default UserCertificatesItem;
