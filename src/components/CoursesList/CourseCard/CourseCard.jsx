import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserType } from "../../../redux/user/selectors";
import { serverName } from "../../../http/server";
import { ReactComponent as ArrowRightIcon } from "../../../images/icons/arrow-left.svg";
import { ReactComponent as ClockIcon } from "../../../images/icons/clock.svg";
import { ReactComponent as LaptopIcon } from "../../../images/icons/laptop.svg";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import CardGrade from "../../shared/CardGrade/CardGrade";
import CardPrice from "../../shared/CardPrice/CardPrice";
import ImageWithSkeleton from "../../shared/Skeletons/ImageWithSkeleton";
import WrapperWithDynamicBgImage from "../../shared/Skeletons/WrapperWithDynamicBgImage";
import BuyCourseBtn from "../../shared/BuyCourseBtn/BuyCourseBtn";
import styles from "./CourseCard.module.scss";

const Progress = ({ progress }) => {
  return (
    <div className={styles.progressWrapper}>
      <span>Progress:</span>
      <ProgressBar value={progress} width={104} height={14} />
    </div>
  );
};

const CourseCard = ({
  course,
  disabled,
  containerClassname = "",
  renderBuyBtn = true,
}) => {
  const isModer = useSelector(getUserType) === "moder";

  const {
    image_path: coursePoster,
    title: courseName,
    c_duration: courseDuration,
    c_type: courseType,
    c_award: courseAward,
    old_price: oldPrice,
    price,
    id,
    progress,
    is_published: isPublished,
    grade,
    bought,
  } = course;

  const courseLink = `/course/${id}/` + (bought ? "tasks" : "intro");

  return (
    <div
      className={`${styles.courseCard} ${containerClassname} ${
        disabled ? styles.disabled : ""
      } ${!isPublished ? styles.disabled : ""}`}
    >
      <Link className={styles.courseLink} to={courseLink}>
        <WrapperWithDynamicBgImage
          className={styles.posterWrapper}
          url={encodeURI(`${serverName}/${coursePoster}`)}
        >
          <ImageWithSkeleton
            src={`${serverName}/${coursePoster}`}
            alt={courseName}
            wrapperClassname={styles.imageWrapper}
            imageClassname={styles.coursePoster}
          />
        </WrapperWithDynamicBgImage>
        <div className={styles.textWrapper}>
          <div className={styles.titleWrapper}>
            <span className={styles.courseName}>
              {courseName}
              <span className={styles.openBtn}>
                <ArrowRightIcon />
              </span>
            </span>
          </div>
          <div className={styles.courseInfo}>
            {isModer ?? (
              <div>
                <span>{isPublished ? "Published" : "Not published"}</span>
              </div>
            )}
            <div className={styles.details}>
              <ClockIcon />
              <span>{courseDuration} hours (self-paced)</span>
            </div>
            <div className={styles.details}>
              <LaptopIcon />
              <span>
                {courseType} | {courseAward}
              </span>
            </div>
            <div className={styles.gradePriceContainer}>
              {bought ? (
                <>
                  <Progress progress={progress} />
                  <CardGrade grade={grade} />
                </>
              ) : (
                <>
                  <CardPrice
                    price={price}
                    oldPrice={oldPrice}
                    orientation="horizontal"
                  />
                  {!isModer && renderBuyBtn && (
                    <BuyCourseBtn
                      courseId={course.id}
                      className={styles.cardBtn}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
