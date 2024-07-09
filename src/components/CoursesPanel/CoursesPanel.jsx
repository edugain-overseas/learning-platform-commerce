import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useListMode } from "../../context/ListModeContext";
import {
  adminCourseLinks,
  courseLinks,
  courseLinksPublic,
  coursesLinks,
  coursesLinksPublic,
} from "../../costants/nav";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ReactComponent as ListIcon } from "../../images/icons/list.svg";
import { ReactComponent as FiltersIcon } from "../../images/icons/filters.svg";
import NavLinksPanel from "../shared/NavLinksPanel/NavLinksPanel";
import Switcher from "../shared/Switcher/Switcher";
import DropDownFilter from "../shared/DropDownFilter/DropDownFilter";
import SearchBar from "../shared/SearchBar/SearchBar";
import styles from "./CoursesPanel.module.scss";
import { useSelector } from "react-redux";
import { getAccessToken, getUserType } from "../../redux/user/selectors";

const switchItems = [<GridIcon />, <ListIcon />];
const filters = [
  <p style={{ marginBottom: "16rem" }}>Filter A</p>,
  <p style={{ marginBottom: "16rem" }}>Filter B</p>,
  <p style={{ marginBottom: "16rem" }}>Filter C</p>,
  <p style={{ marginBottom: "16rem" }}>Filter D</p>,
  <p style={{ marginBottom: "16rem" }}>Filter E</p>,
  <p>Filter F</p>,
];

const CoursesPanel = () => {
  const [searchValue, setSerchValue] = useState("");
  const { setSelecteListModeIndex, selectedListModeIndex } = useListMode();
  const { courseId } = useParams();
  const token = useSelector(getAccessToken);
  const isModer = useSelector(getUserType) === "moder";

  const studentCoursesRenderLinks = token ? coursesLinks : coursesLinksPublic;
  const studentCourseRenderLinks = token ? courseLinks : courseLinksPublic;
  const studentRenderLinks = courseId
    ? studentCourseRenderLinks
    : studentCoursesRenderLinks;

  const renderLinks = isModer ? adminCourseLinks : studentRenderLinks;

  return (
    <div className={styles.wrapper}>
      <NavLinksPanel renderLinks={renderLinks} />
      <div className={styles.tools}>
        <Switcher
          onChange={(index) => setSelecteListModeIndex(index)}
          value={selectedListModeIndex}
          items={switchItems}
        />
        <DropDownFilter icon={<FiltersIcon />} dropwownOptions={filters} />
        <SearchBar
          width="226rem"
          value={searchValue}
          onChange={setSerchValue}
          clearBtn={true}
        />
      </div>
    </div>
  );
};

export default CoursesPanel;
