import React from "react";
import styles from "./UserInfoCard.module.scss";
import Accordion from "../shared/Accordion/Accordion";

const UserInfoData = ({ userInfo }) => {
  const phone = userInfo.phone || "-";
  const name = userInfo.name || "-";
  const surname = userInfo.surname || "-";
  const country = userInfo.country || "-";

  return (
    <div className={styles.infoDataContainer}>
      <p>
        Email:<span>{userInfo.email}</span>
      </p>
      <Accordion
        header={<span>Details</span>}
        content={
          <>
            <p>
              First Name:<span>{name}</span>
            </p>
            <p>
              Last Name:<span>{surname}</span>
            </p>
            <p>
              Your country:<span>{country}</span>
            </p>
            <p>
              Phone number:<span>{phone}</span>
            </p>
          </>
        }
        contentClassName={styles.detailsContainer}
        headerClassName={styles.detailsHeader}
      />
    </div>
  );
};

export default UserInfoData;
