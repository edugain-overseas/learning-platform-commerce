import React from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../../redux/user/selectors";
// import {
//   getUserName,
//   getUserInfo,
//   getUserType,
// } from "../../../redux/user/userSelectors";
// import { ReactComponent as SettingsIcon } from "../../../images/icons/settings.svg";
// import { serverName } from "../../../constants/server";
// import image from "../../../images/logo192.png";
// import { getIsEdit, getIsSubmit } from "../../../redux/config/configSelectors";
// import {
//   setDefault,
//   setEdit,
//   setSumbit,
// } from "../../../redux/config/configSlice";
// import { getIsLoading } from "../../../redux/subject/subjectSelectors";
// import { useLocation } from "react-router-dom";
import NotificationButton from "./NotificationButton/NotificationButton";
import Avatar from "../../shared/Avatar/Avatar";
import styles from "./UserPanel.module.scss";

const UserPanel = () => {
  // const dispatch = useDispatch();
  // const username = useSelector(getUserName);
  const userInfo = useSelector(getUserInfo);
  // const userType = useSelector(getUserType);
  // const isEdit = useSelector(getIsEdit);
  // const isSubmit = useSelector(getIsSubmit);
  // const isLoading = useSelector(getIsLoading);
  // const { pathname } = useLocation();

  // const handleSubmit = () => {
  //   if (isLoading) {
  //     return;
  //   }
  //   dispatch(setSumbit());
  //   // if (
  //   //   pathname === "/" ||
  //   //   pathname === "/schedule" ||
  //   //   pathname.includes("/participants")
  //   //   // pathname.includes("/tasks")
  //   // ) {
  //   //   dispatch(setDefault());
  //   //   return;
  //   // }
  // };

  // useEffect(() => {
  //   if (isSubmit) {
  //     dispatch(setDefault());
  //   }
  // }, [isSubmit, dispatch]);

  return (
    <div className={styles.wrapper}>
      <NotificationButton />
      <div className={styles.userWrapper}>
        <div className={styles.userAvatarWrapper}>
          <Avatar
            src={userInfo.avatarURL}
            editable={false}
            alt={userInfo.username}
            size="36rem"
          />
        </div>
        <span className={styles.userName}>{userInfo.username}</span>
      </div>
    </div>
  );
};

export default UserPanel;
