import React from "react";
import { Link } from "react-router-dom";
import { serverName } from "../../../http/sever";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as CartIcon } from "../../../images/icons/cart.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as SchoolOnlineIcon } from "../../../images/icons/courseIcons/school-online.svg";
import { ReactComponent as ClockDarkIcon } from "../../../images/icons/courseIcons/clock-dark.svg";
import { ReactComponent as CertificateIcon } from "../../../images/icons/courseIcons/certificate.svg";
import devices from "../../../images/devices.png";
import CardPrice from "../../../components/shared/CardPrice/CardPrice";
import CoursesList from "../../../components/CoursesList/CoursesList";
import styles from "./CourseIntroPage.module.scss";
import { useSelector } from "react-redux";
import { getUserCourses } from "../../../redux/user/selectors";

const IntroContent = ({ course = {}, courses = [] }) => {
  const userCourses = useSelector(getUserCourses);
  const {
    title: courseName,
    image_path: coursePoster,
    c_type: courseType,
    c_access: courseAccess,
    c_award: courseAward,
    c_duration: courseDuration,
    c_language: courseLanguage,
    c_level: courseLevel,
    old_price: oldPrice,
    price,
    id,
  } = course;

  const isUserCourse = userCourses.find(({ course_id }) => course_id === id);

  const otherCoursesThisCategory = courses.filter(
    ({ categoryId, id }) =>
      course.categoryId === categoryId &&
      !userCourses.find(({ course_id }) => course_id === id) &&
      course.id !== id
  );

  const otherCoursesDifferentCategory = courses.filter(
    ({ categoryId, id }) =>
      course.categoryId !== categoryId &&
      !userCourses.find(({ course_id }) => course_id === id)
  );
  const studentsAlsoBuyCourses = [
    ...otherCoursesThisCategory,
    ...otherCoursesDifferentCategory,
  ].slice(0, 4);

  return (
    <>
      <section className={styles.mainInfoWrapper}>
        <div className={styles.textContentWrapper}>
          <h2 className={styles.courseName}>{courseName}</h2>
          <p className={styles.courseAbout}>
            In this course, you will learn the skills to understand today’s
            economy and to succeed in today’s interconnected business world. In
            this course, you will learn the skills to understand today’s economy
            and to succeed in today’s interconnected business world.
          </p>
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
            <img
              src={
                coursePoster
                  ? `${serverName}/${coursePoster}`
                  : "https://online.maryville.edu/wp-content/uploads/sites/97/2023/09/business-management-team.jpg"
              }
              alt={course.courseName}
            />
          </div>
          <div className={styles.courseItemsWrapper}>
            <ul className={styles.courseItems}>
              <li>
                <span className={styles.property}>
                  <LaptopIcon />
                  Type:
                </span>
                <span className={styles.value}>{courseType}</span>
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Duration:
                </span>
                <span className={styles.value}>{courseDuration}</span>
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Award:
                </span>
                <span className={styles.value}>{courseAward}</span>
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Language:
                </span>
                <span className={styles.value}>{courseLanguage}</span>
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Level:
                </span>
                <span className={styles.value}>{courseLevel}</span>
              </li>
              <li>
                <span className={styles.property}>
                  <ClockIcon />
                  Access:
                </span>
                <span className={styles.value}>{courseAccess}</span>
              </li>
            </ul>
            {!isUserCourse && (
              <div className={styles.itemsTools}>
                <button className={styles.butBtn}>
                  <span>Buy</span>
                  <CartIcon />
                </button>
                <CardPrice
                  orientation="horizontal"
                  price={price}
                  oldPrice={oldPrice}
                  size="s"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.mainInfoWrapper}>
        <div className={styles.textContentWrapper}>
          <h2 className={styles.courseName}>About this course</h2>
          <div className={styles.textInfo}>
            <p className={styles.courseAbout}>
              This course introduces basic economic concepts that are
              fundamental to understand many of the issues faced by business
              firms. Learn the processes that govern the production and
              consumption of goods and services in a global economy:
              Microeconomics and Macroeconomics.
            </p>
            <p className={styles.courseAbout}>
              Understand important principles like price elasticity and the law
              of supply and demand. This course also includes the different
              economic systems around the globe, the essential business cycle
              phases, the country analysis tool, and international business
              strategies.
            </p>
            <p className={styles.courseAbout}>
              You will also receive a short case study of the European Union
              (EU) and the World Trade Organization (WTO) that summarizes the
              key takeaways of this course.
            </p>
          </div>
          <ul className={styles.advantagesList}>
            <li>
              <SchoolOnlineIcon />
              <h4>100% Online</h4>
              <p>Click through engaging and award winning course content.</p>
            </li>
            <li>
              <ClockDarkIcon />
              <h4>100% self-paced</h4>
              <p>Immediate start: study when, where, and how fast you want.</p>
            </li>
            <li>
              <CertificateIcon />
              <h4>Get your certificate</h4>
              <p>
                Download your personal certificate upon completion of this
                course.
              </p>
            </li>
          </ul>
        </div>
        <div className={`${styles.visualContentWrapper} ${styles.devices}`}>
          <img src={devices} alt="devices" />
        </div>
      </section>

      <div className={styles.navPanel}>
        <Link to="/courses/my" className={styles.allCoursesLink}>
          <ArrowLeftIcon />
          <span>View all courses</span>
        </Link>
        <CardPrice
          orientation="horizontal"
          price={price}
          oldPrice={oldPrice}
          size="m"
        />
        <button className={styles.buyAllCoursesBtn}>
          <span>Buy all courses</span>
          <CartIcon />
        </button>
      </div>

      {studentsAlsoBuyCourses.length !== 0 && (
        <div className={styles.otherCourses}>
          <h2>Students also bought</h2>
          <CoursesList courses={studentsAlsoBuyCourses} />
        </div>
      )}
    </>
  );
};

export default IntroContent;
