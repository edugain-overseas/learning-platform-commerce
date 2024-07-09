import React from "react";
import { useParams } from "react-router-dom";

// import { serverName } from "../../http/sever";
import { ReactComponent as LaptopIcon } from "../../images/icons/laptop.svg";
import { ReactComponent as ClockIcon } from "../../images/icons/clock.svg";
// import { ReactComponent as CartIcon } from "../../images/icons/cart.svg";
// import { ReactComponent as ArrowLeftIcon } from "../../images/icons/arrow-left.svg";
// import { ReactComponent as SchoolOnlineIcon } from "../../images/icons/courseIcons/school-online.svg";
// import { ReactComponent as ClockDarkIcon } from "../../images/icons/courseIcons/clock-dark.svg";
// import { ReactComponent as CertificateIcon } from "../../images/icons/courseIcons/certificate.svg";
// import devices from "../../images/devices.png";
import styles from "./AdminCourseConstructorPage.module.scss";
import Textarea from "../../components/shared/Textarea/Textarea";

const AdminCourseConstructorPage = () => {
  const { courseId } = useParams();
  console.log(courseId);
  return (
    <div className={styles}>
      <section className={styles.mainInfoWrapper}>
        <div className={styles.textContentWrapper}>
          <div className={styles.courseName}>
            <Textarea
              placeholder="Course title"
              fontSize={24}
              maxRows={2}
              setMinRowsonBlur={true}
              minRows={1}
            />
          </div>

          <div className={styles.courseAbout}>
            <Textarea
              placeholder="Course main information"
              minRows={4}
              maxRows={8}
            />
          </div>
          <div className={styles.listWrapper}>
            <h4 className={styles.listTitle}>Skills you will learn:</h4>
            <ul className={styles.listItems}>
              <li className={styles.listItem}>
                Understanding essential economic principles and concepts;
              </li>
              <li className={styles.listItem}>
                Analyzing the production and consumption of goods and services;
              </li>
              <li className={styles.listItem}>
                Evaluation of international business strategies.
              </li>
            </ul>
          </div>
          <p className={styles.programInfo}>
            This course is part of the <u>Mini-MBA</u> and{" "}
            <u>Global Governance</u> programs.
          </p>
        </div>
        <div className={styles.visualContentWrapper}>
          <div className={styles.posterWrapper}>
            {/* <img
              src={
                coursePoster
                  ? `${serverName}/${coursePoster}`
                  : "https://online.maryville.edu/wp-content/uploads/sites/97/2023/09/business-management-team.jpg"
              }
              alt={course.courseName}
            /> */}
          </div>
          <div className={styles.courseItemsWrapper}>
            <ul className={styles.courseItems}>
              <li>
                <span className={styles.property}>
                  <LaptopIcon />
                  Type:
                </span>
                {/* <span className={styles.value}>{courseType}</span> */}
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Duration:
                </span>
                {/* <span className={styles.value}>{courseDuration}</span> */}
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Award:
                </span>
                {/* <span className={styles.value}>{courseAward}</span> */}
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Language:
                </span>
                {/* <span className={styles.value}>{courseLanguage}</span> */}
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Level:
                </span>
                {/* <span className={styles.value}>{courseLevel}</span> */}
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Access:
                </span>
                {/* <span className={styles.value}>{courseAccess}</span> */}
              </li>
            </ul>

            <div className={styles.itemsTools}>
              {/* <button className={styles.butBtn}>
                <span>Buy</span>
                <CartIcon />
              </button>
              <CardPrice
                orientation="horizontal"
                price={price}
                oldPrice={oldPrice}
                size="s"
              /> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminCourseConstructorPage;
