import React, { useState } from "react";
import { coursesLinks } from "../../costants/nav";
import { useCoursesListMode } from "../../context/CoursesListModeContext";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ReactComponent as ListIcon } from "../../images/icons/list.svg";
import { ReactComponent as FiltersIcon } from "../../images/icons/filters.svg";
import NavLinksPanel from "../shared/NavLinksPanel/NavLinksPanel";
import Switcher from "../shared/Switcher/Switcher";
import DropDownFilter from "../auth/shared/DropDownFilter/DropDownFilter";
import styles from "./CoursesPanel.module.scss";
import SearchBar from "../auth/shared/SearchBar/SearchBar";

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
  const { setSelecteListModeIndex, selectedListModeIndex } =
    useCoursesListMode();

  return (
    <div className={styles.wrapper}>
      <NavLinksPanel renderLinks={coursesLinks} />
      <div className={styles.tools}>
        <Switcher
          onChange={(index) => setSelecteListModeIndex(index)}
          value={selectedListModeIndex}
          items={switchItems}
          style={{ marginBottom: "16rem" }}
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
