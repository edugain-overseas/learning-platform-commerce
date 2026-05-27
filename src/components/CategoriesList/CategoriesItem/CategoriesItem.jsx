import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAllCourses } from "../../../redux/course/selectors";
import { getUserCourses, getUserType } from "../../../redux/user/selectors";
import { useListMode } from "../../../context/ListModeContext";
import { useFilteredCoursesData } from "../../../hooks/useFiltredCoursesData";
import { ReactComponent as BMIcon } from "../../../images/icons/bm.svg";
import { ReactComponent as ChevronIcon } from "../../../images/icons/arrowDown.svg";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import { serverName } from "../../../http/server";
import useLocalStorage from "../../../hooks/useLocalStorage";
import CoursesList from "../../CoursesList/CoursesList";
import ProgressBar from "../../shared/ProgressBar/ProgressBar";
import InfoBtn from "../../shared/InfoBtn/InfoBtn";
import CategoryModal from "../../CategoryModal/CategoryModal";
import InsetBtn from "../../shared/InsetBtn/InsetBtn";
import CategoryBuyAllBtn from "./CategoryBuyAllBtn";
import CategoryCertificateBtn from "./CategoryCertificateBtn";
import AntSegment from "../../AntComponents/AntSegment";
import styles from "./CategoriesItem.module.scss";

const designTokens = {
  itemActiveBg: "rgba(208, 0, 0, 1)",
  itemColor: "#7e8ca8",
  itemHoverBg: "transparent",
  itemHoverColor: "#7e8ca8",
  itemSelectedBg: "rgba(208, 0, 0, 9)",
  itemSelectedColor: "#fff",
};

const coursesFilterOptions = ["all", "short", "long"];

const CategoriesItem = ({
  category,
  defaultDropdownOpen = true,
  lastOpenCategoryId,
  setLastOpenCategoryId,
}) => {
  const dropdownRef = useRef();
  const [dropDownOpen, setDropDownOpen] = useState(defaultDropdownOpen);
  const [isEditCategoryModalOpen, setIsEditCatgoryModalOpen] = useState(false);
  const [coursesFilter, setCoursesFilter] = useLocalStorage(
    `admin-preference__category-courses-filter-${category.id}`,
    coursesFilterOptions[0],
  );
  const { pathname } = useLocation();

  const isProgressHidden = pathname.includes("courses");

  const openEditCategoryModal = () => setIsEditCatgoryModalOpen(true);

  const allCourses = useSelector(getAllCourses);
  const { courses } = useFilteredCoursesData();

  const userCourses = useSelector(getUserCourses);
  const isModer = useSelector(getUserType) === "moder";

  const { selectedListModeIndex } = useListMode();

  const categoryCourses = allCourses.filter(
    (course) => course.category_id === category.id,
  );

  const coursesToDisplay = courses.filter(
    (course) => course.category_id === category.id,
  );

  const filtredCoursesToDisplay = coursesToDisplay.filter((course) => {
    if (coursesFilter === coursesFilterOptions[0]) return true;
    return course.type === coursesFilter;
  });

  const userCoursesInCategory = categoryCourses.filter(({ id }) =>
    userCourses?.find(({ course_id }) => course_id === id),
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


  const handleToggleDropDown = () => {
    const dropdown = dropdownRef.current;
    if (dropdown) {
      dropdown.style.maxHeight = dropDownOpen
        ? "0px"
        : `${dropdown.scrollHeight}px`;
    }

    if (!dropDownOpen) {
      setLastOpenCategoryId?.(category.id);
    } else if (lastOpenCategoryId === category.id) {
      setLastOpenCategoryId?.(null);
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

  const iconPath = category.icons?.find((icon) => icon.is_main)?.path;

  return (
    <li className={styles.itemWrapper} id="wrapper">
      <div
        className={styles.categoryPanel}
        id={`category-panel-${category.id}`}
        onClick={(e) => {
          if (e.currentTarget !== e.target) return;
          handleToggleDropDown();
        }}
      >
        <Link to={null} className={styles.titleWrapper}>
          {iconPath ? (
            <div
              className={styles.icon}
              style={{
                backgroundImage: `url(${serverName}/${iconPath})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            />
          ) : (
            <BMIcon className={styles.icon} />
          )}
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
              {!isProgressHidden && (
                <div className={styles.progressWrapper}>
                  <span>Progress:</span>
                  <ProgressBar
                    value={Math.round(progress)}
                    disabled={userCoursesInCategory.length === 0}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <AntSegment
                options={coursesFilterOptions}
                value={coursesFilter}
                onChange={(value) => setCoursesFilter(value)}
                designTokens={designTokens}
                className={styles.segment}
              />
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
            <InfoBtn infoContent={category.description} orientation="left" />
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
          <CoursesList
            courses={filtredCoursesToDisplay}
            categoryId={category.id}
          />
        </div>
      </div>
    </li>
  );
};

export default CategoriesItem;
