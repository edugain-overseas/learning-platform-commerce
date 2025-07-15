import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import { getUserCourses, getUserType } from "../../../redux/user/selectors";
import { useListMode } from "../../../context/ListModeContext";
import { ReactComponent as BMIcon } from "../../../images/icons/bm.svg";
import { ReactComponent as ChevronIcon } from "../../../images/icons/arrowDown.svg";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import CoursesList from "../../CoursesList/CoursesList";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import InfoBtn from "../../shared/InfoBtn/InfoBtn";
import CategoryModal from "../../CategoryModal/CategoryModal";
import styles from "./CategoriesItem.module.scss";
import InsetBtn from "../../shared/InsetBtn/InsetBtn";
import CategoryBuyAllBtn from "./CategoryBuyAllBtn";
import CategoryCertificateBtn from "./CategoryCertificateBtn";

const CategoriesItem = ({ category }) => {
  const [dropDownOpen, setDropDownOpen] = useState(true);
  const [isEditCategoryModalOpen, setIsEditCatgoryModalOpen] = useState(false);

  const openEditCategoryModal = () => setIsEditCatgoryModalOpen(true);

  const courses = useSelector(getAllCourses);
  const userCourses = useSelector(getUserCourses);
  const isModer = useSelector(getUserType) === "moder";

  const { listModeIndex } = useListMode();

  const categoryCourses = courses.filter(
    (course) => course.category_id === category.id
  );

  const userCoursesInCategory = categoryCourses.filter(({ id }) =>
    userCourses?.find(({ course_id }) => course_id === id)
  );

  const progress =
    userCoursesInCategory.reduce((sum, { progress }) => sum + progress, 0) /
    categoryCourses.length;

  const handleToggleDropDown = (e) => {
    const dropdown = [...e.target.closest("#wrapper")?.children]?.find(
      ({ id }) => id === "dropdown"
    );
    if (dropdown) {
      if (!dropDownOpen) {
        dropdown.style.maxHeight = dropdown.scrollHeight + "px";
      } else {
        dropdown.style.maxHeight = 0 + "px";
      }
    }
    setDropDownOpen((prev) => !prev);
  };

  const studentBuyAllCourses = categoryCourses.every((course) => course.bought);

  const studentBtn = studentBuyAllCourses ? (
    <CategoryCertificateBtn categoryId={category.id} />
  ) : (
    <CategoryBuyAllBtn categoryId={category.id} disabled={!dropDownOpen} />
  );

  return (
    <li className={styles.itemWrapper} id="wrapper">
      <div
        className={styles.categoryPanel}
        id={`category-panel-${category.id}`}
      >
        <Link to={null} className={styles.titleWrapper}>
          <BMIcon />
          <div className={styles.nameWrapper}>
            <h3>{category.title}</h3>
            <p
              dangerouslySetInnerHTML={{ __html: category.certificate_info }}
            ></p>
          </div>
        </Link>
        <div className={styles.tools}>
          {!isModer ? (
            <>
              <p>
                <span>Purchased: </span>
                {`${userCoursesInCategory.length} / ${categoryCourses.length}`}
              </p>
              <div className={styles.progressWrapper}>
                <span>Progress:</span>
                <ProgressBar
                  value={Math.round(progress)}
                  disabled={userCoursesInCategory.length === 0}
                />
              </div>
            </>
          ) : (
            <>
              <InsetBtn icon={<EditIcon />} onClick={openEditCategoryModal} />
              <CategoryModal
                isOpenModal={isEditCategoryModalOpen}
                setIsOpenModal={setIsEditCatgoryModalOpen}
                categoryDefaultData={category}
              />
            </>
          )}
          <div className={styles.infoWrapper}>
            <span>Info the courses</span>
            <InfoBtn infoContent={category.description} orientation="bottom" />
          </div>
          <button
            className={`${styles.dropdownBtn} ${
              dropDownOpen ? styles.open : ""
            }`}
            onClick={handleToggleDropDown}
          >
            <span>
              <ChevronIcon />
            </span>
          </button>
          {!isModer && studentBtn}
        </div>
      </div>
      <div
        className={`${styles.dropdown} ${dropDownOpen ? styles.open : ""}`}
        id="dropdown"
      >
        <div
          className={styles.dropDownContent}
          style={{ paddingTop: listModeIndex ? "16rem" : "8rem" }}
        >
          <CoursesList courses={categoryCourses} />
        </div>
      </div>
    </li>
  );
};

export default CategoriesItem;
