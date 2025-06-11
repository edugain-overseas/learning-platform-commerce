import React, { useRef } from "react";
import NavBar from "./NavBar/NavBar";
import LogoutButton from "./LogoutButton/LogoutButton";
import { ReactComponent as FixIcon } from "../../images/icons/fix.svg";
import SupportBtn from "./SupportBtn/SupportBtn";
import styles from "./SideBar.module.scss";
import UserInfo from "./UserInfo/UserInfo";
import { useSelector } from "react-redux";
import { getAccessToken, getUserType } from "../../redux/user/selectors";
import { adminSidebarNav, sidebarNav } from "../../costants/nav";
import useLocalStorage from "../../hooks/useLocalStorage";

const SideBar = () => {
  const accessToken = useSelector(getAccessToken);
  const isModer = useSelector(getUserType) === "moder";

  const navItems = isModer ? adminSidebarNav : sidebarNav;

  // const [isExpandedFixed, setIsExpandedFixed] = useState(false);
  const [isExpandedFixed, setIsExpandedFixed] = useLocalStorage(
    "isExpandedFixed",
    false
  );
  // const [isNarrowedFixed, setIsNarrowedFixed] = useState(false);
  const [isNarrowedFixed, setIsNarrowedFixed] = useLocalStorage(
    "isNarrowedFixed",
    false
  );
  const wrapperRef = useRef(null);

  const handleNarrowedFix = () => {
    setIsNarrowedFixed((prev) => {
      if (isExpandedFixed) {
        setIsExpandedFixed(false);
      }
      return !prev;
    });
  };

  const handleExpandedFixed = () => {
    setIsExpandedFixed((prev) => {
      if (isNarrowedFixed) {
        setIsNarrowedFixed(false);
      }
      wrapperRef.current.dataset.expandedFixed = !prev;
      return !prev;
    });
  };

  return (
    <div
      className={`${styles.wrapper} 
      ${isExpandedFixed ? styles.expandedFixed : ""} 
      ${isNarrowedFixed ? styles.narrowedFixed : ""}`}
      data-expanded-fixed={isExpandedFixed}
      ref={wrapperRef}
    >
      <div className={styles.narrowed}>
        <button className={styles.fixBtn} onClick={handleNarrowedFix}>
          <FixIcon />
        </button>
        <p className={styles.officialLabel}>Official Platform</p>
        <div className={styles.itemsWrapper}>
          <NavBar navItems={navItems} />
          <div className={styles.bottomItemsWrapper}>
            {accessToken && !isModer && <SupportBtn />}
            <LogoutButton />
          </div>
        </div>
      </div>
      <div className={styles.expanded}>
        <button className={styles.fixBtn} onClick={handleExpandedFixed}>
          <FixIcon />
        </button>
        <UserInfo />
      </div>
    </div>
  );
};

export default SideBar;
