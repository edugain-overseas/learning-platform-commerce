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
      <p>
        Phone namber:<span>{phone}</span>
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
              Password:<span>********</span>
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
