import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import UserCertificatesItem from "./UserCertificatesItem";
import Accordion from "../shared/Accordion/Accordion";
import styles from "./UserCertificatesList.module.scss";

const UserCertificatesList = () => {
  const certificates = useSelector(getUserInfo)?.certificates;

  const sortedCertificates = useMemo(() => {
    const formattedData = certificates.map((category) => ({
      ...category,
      course_certificate_data: category.course_certificate_data
        ? [...category.course_certificate_data]
        : [],
    }));

    formattedData.forEach((category) => {
      category.course_certificate_data.sort((a, b) => {
        const getStatusWeight = (status) => {
          if (status === "in_progress") return 1;
          if (status === "completed") return 2;
          return 3;
        };

        return (
          getStatusWeight(a.course_status) - getStatusWeight(b.course_status)
        );
      });
    });

    formattedData.sort((a, b) => {
      const hasInProgressA = a.course_certificate_data.some(
        (c) => c.course_status === "in_progress",
      );
      const hasInProgressB = b.course_certificate_data.some(
        (c) => c.course_status === "in_progress",
      );

      return (hasInProgressB ? 1 : 0) - (hasInProgressA ? 1 : 0);
    });

    return formattedData;
  }, [certificates]);

  return (
    <ul className={styles.certificatesList}>
      {sortedCertificates.map(
        ({
          course_certificate_data: coursesCertificates,
          ...categoryCertificate
        }) => {
          return (
            <li key={categoryCertificate.category_id}>
              <Accordion
                header={
                  <UserCertificatesItem
                    certificate={categoryCertificate}
                    type="category"
                  />
                }
                content={
                  <ul className={`${styles.certificatesList}`}>
                    {coursesCertificates.map((courseCertificate) => (
                      <li key={courseCertificate.course_id}>
                        <UserCertificatesItem
                          certificate={courseCertificate}
                          type="course"
                        />
                      </li>
                    ))}
                  </ul>
                }
                containerClassName={styles.itemContainer}
                contentClassName={styles.itemContent}
                headerClassName={styles.itemHeader}
              />
            </li>
          );
        },
      )}
    </ul>
  );
};

export default UserCertificatesList;
