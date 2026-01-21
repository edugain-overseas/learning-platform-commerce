import React from "react";
import { ReactComponent as CertificateIcon } from "../../../images/icons/diploma.svg";
import { message } from "antd";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/user/selectors";
import { downloadCertificate } from "../../../utils/downloadCertificate";
import styles from "./CategoriesItem.module.scss";

const CategoryCertificateBtn = ({ categoryId }) => {
  const userCertificates = useSelector(getUserInfo).certificates;

  const handleClick = () => {
    if (!categoryId) {
      return;
    }

    const certificate = userCertificates?.find(
      (categoryCertificate) => categoryCertificate.category_id === categoryId
    );

    const certificateLink = certificate?.category_certificate_link;

    if (!certificateLink) {
      message.info({
        content:
          "You should complete all courses to reach the program certificate!",
        duration: 3,
      });
      return;
    }

    downloadCertificate(certificateLink, certificate.category_name);
  };
  return (
    <button
      className={`${styles.studentBtn} ${styles.certificate}`}
      onClick={handleClick}
    >
      <span>Certificate</span>
      <CertificateIcon />
    </button>
  );
};

export default CategoryCertificateBtn;
