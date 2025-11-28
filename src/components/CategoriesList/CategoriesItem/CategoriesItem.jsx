import React, { useState, useRef, useEffect } from "react";
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
import InsetBtn from "../../shared/InsetBtn/InsetBtn";
import CategoryBuyAllBtn from "./CategoryBuyAllBtn";
import CategoryCertificateBtn from "./CategoryCertificateBtn";
import styles from "./CategoriesItem.module.scss";
import { useFilteredCoursesData } from "../../../hooks/useFiltredCoursesData";

const CategoriesItem = ({ category }) => {
  const dropdownRef = useRef();
  const [dropDownOpen, setDropDownOpen] = useState(true);
  const [isEditCategoryModalOpen, setIsEditCatgoryModalOpen] = useState(false);

  const openEditCategoryModal = () => setIsEditCatgoryModalOpen(true);

  const allCourses = useSelector(getAllCourses);
  const { courses } = useFilteredCoursesData();

  const userCourses = useSelector(getUserCourses);
  const isModer = useSelector(getUserType) === "moder";

  const { selectedListModeIndex } = useListMode();

  const categoryCourses = allCourses.filter(
    (course) => course.category_id === category.id
  );

  const coursesToDisplay = courses.filter(
    (course) => course.category_id === category.id
  );

  const userCoursesInCategory = categoryCourses.filter(({ id }) =>
    userCourses?.find(({ course_id }) => course_id === id)
  );

  const progress =
    userCoursesInCategory.reduce((sum, { progress }) => sum + progress, 0) /
    categoryCourses.length;

  const studentBuyAllCourses = categoryCourses.every((course) => course.bought);

  const studentBtn = studentBuyAllCourses ? (
    <CategoryCertificateBtn categoryId={category.id} />
  ) : (
    <CategoryBuyAllBtn categoryId={category.id} disabled={!dropDownOpen} />
  );

  const handleToggleDropDown = (e) => {
    const dropdown = dropdownRef.current;

    if (dropdown) {
      dropdown.style.maxHeight = dropDownOpen
        ? 0 + "px"
        : dropdown.scrollHeight + "px";
    }
    setDropDownOpen((prev) => !prev);
  };

  useEffect(() => {
    const dropdown = dropdownRef.current;

    if (dropdown) {
      dropdown.style.maxHeight = dropDownOpen
        ? dropdown.scrollHeight + "px"
        : 0 + "px";
    }
    // eslint-disable-next-line
  }, [selectedListModeIndex]);

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
        ref={dropdownRef}
      >
        <div
          className={styles.dropDownContent}
          style={{ paddingTop: selectedListModeIndex ? "16rem" : "8rem" }}
        >
          <CoursesList courses={coursesToDisplay} />
        </div>
      </div>
    </li>
  );
};

export default CategoriesItem;
