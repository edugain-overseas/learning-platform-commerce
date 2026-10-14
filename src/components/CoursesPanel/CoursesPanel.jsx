import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useListMode } from "../../context/ListModeContext";
import { useSelector } from "react-redux";
import { getAccessToken, getUserType } from "../../redux/user/selectors";
import {
  adminCourseLinks,
  courseLinks,
  courseLinksPublic,
  coursesLinks,
  educationLinks,
} from "../../costants/nav";
import { ReactComponent as GridIcon } from "../../images/icons/grid.svg";
import { ReactComponent as ListIcon } from "../../images/icons/list.svg";
import NavLinksPanel from "../shared/NavLinksPanel/NavLinksPanel";
import Switcher from "../shared/Switcher/Switcher";
import SearchBar from "../shared/SearchBar/SearchBar";
import styles from "./CoursesPanel.module.scss";

const switchItems = [<GridIcon />, <ListIcon />];

const CoursesPanel = () => {
  const [searchValue, setSerchValue] = useState("");
  const { pathname } = useLocation();
  const { courseId } = useParams();
  const { setSelecteListModeIndex, selectedListModeIndex } = useListMode();
  const token = useSelector(getAccessToken);
  const isModer = useSelector(getUserType) === "moder";
  const showSwitcher = !pathname.includes("/intro");

  const coursesBasedLinks = pathname.includes("courses")
    ? coursesLinks
    : educationLinks;

  const studentCourseLinks = token ? courseLinks : courseLinksPublic;
  const studentRenderLinks = courseId ? studentCourseLinks : coursesBasedLinks;

  const renderLinks = isModer ? adminCourseLinks : studentRenderLinks;

  return (
    <div className={styles.wrapper}>
      <NavLinksPanel renderLinks={renderLinks} />
      <div className={styles.tools}>
        {showSwitcher && (
          <Switcher
            onChange={(index) => setSelecteListModeIndex(index)}
            value={selectedListModeIndex}
            items={switchItems}
          />
        )}
        <SearchBar
          width="226rem"
          value={searchValue}
          onChange={setSerchValue}
          clearBtn={false}
        />
      </div>
    </div>
  );
};

export default CoursesPanel;
