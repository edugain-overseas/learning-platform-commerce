import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as EditIcon } from "../../images/icons/edit-avatar.svg";
import { ReactComponent as SettingsIcon } from "../../images/icons/settings.svg";
import Avatar from "../shared/Avatar/Avatar";
import Tooltip from "../shared/Tooltip/Tooltip";
import InsetBtn from "../shared/InsetBtn/InsetBtn";
import Modal from "../shared/Modal/Modal";
import AvatarEditor from "../shared/AvatarEditor/AvatarEditor";
import {
  updateUserInfoThunk,
  updateUsernameThunk,
} from "../../redux/user/operations";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import UserInfoForm from "./UserInfoForm";
import UserInfoData from "./UserInfoData";
import UserProfileStatCard from "../UserProfileStatCard/UserProfileStatCard";
import InfoBtn from "../shared/InfoBtn/InfoBtn";
import styles from "./UserInfoCard.module.scss";

const UserInfoCard = ({ userInfo }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [messageApi, contextHolder] = useNotificationMessage();

  const accessToken = userInfo.accessToken;

  const userCoursesNumber = userInfo.courses.length;
  const userCertificatesNumber = userInfo.courses.filter(
    (course) => course.status === "completed"
  ).length;

  const userStudingStatsStr = `${userCoursesNumber} course${
    userCoursesNumber > 1 ? "s" : ""
  } | ${userCertificatesNumber} certificate${
    userCertificatesNumber > 1 ? "s" : ""
  }`;

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleSave = (data) => {
    const { username, ...userData } = data;

    if (data.username !== userInfo.username) {
      dispatch(updateUsernameThunk(data.username));
    }

    dispatch(updateUserInfoThunk(userData))
      .unwrap()
      .then(() => {
        messageApi.success({
          content: "Your profile was successfully updated",
          duration: 3,
        });
      });
    setIsEdit(false);
  };

  const formDefaultValues = {
    name: userInfo.name,
    email: userInfo.email,
    surname: userInfo.surname,
    username: userInfo.username,
    phone: userInfo.phone,
    country: userInfo.country,
  };

  return (
    <div className={styles.wrapper}>
      {contextHolder}
      <div className={styles.avatarWrapper}>
        <Avatar size="110rem" editable={false} src={userInfo.avatarURL} />
        {isEdit && (
          <>
            <button className={styles.editAvatarBtn} onClick={handleOpenModal}>
              <EditIcon />
            </button>
            <Modal
              isOpen={isOpenModal}
              width="610rem"
              closeModal={() => setIsOpenModal(false)}
            >
              <AvatarEditor
                previousAvatars={userInfo.previousAvatars}
                userId={userInfo.userId}
                userAvatar={userInfo.avatarURL}
              />
            </Modal>
          </>
        )}
      </div>
      <AnimatePresence mode="wait">
        {!isEdit && (
          <motion.div
            key="username"
            initial={{ opacity: 0, y: "-40%", height: "auto" }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: "-40%", height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={styles.usernameContainer}
          >
            <p className={styles.username}>{userInfo.username}</p>
            <p>{userStudingStatsStr}</p>
          </motion.div>
        )}
      </AnimatePresence>
      <div className={styles.userDataContainer}>
        <h4 className={styles.profileTitle}>Profile data</h4>

        <AnimatePresence mode="wait">
          {isEdit ? (
            <motion.div
              key="editForm"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.1 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <UserInfoForm
                userInfo={formDefaultValues}
                closeEdit={() => setIsEdit(false)}
                onSubmit={handleSave}
              />
            </motion.div>
          ) : (
            <UserInfoData userInfo={userInfo} />
          )}
        </AnimatePresence>
      </div>
      <div className={styles.userGraphStatContainer}>
        <h4 className={styles.profileTitle}>Your progress</h4>
        <div className={styles.graphContainer}>
          <UserProfileStatCard
            type="grade"
            renderTitle={(value) => (
              <div className={styles.progressTitle}>
                <span className={styles.name}>Average</span>
                <span className={styles.value}>{value + "(*)"}</span>
              </div>
            )}
          />
          <UserProfileStatCard
            type="progress"
            renderTitle={(value) => (
              <div className={styles.progressTitle}>
                <span className={styles.name}>Complited</span>
                <span className={styles.value}>
                  {value}
                  <span>%</span>
                </span>
              </div>
            )}
          />
        </div>
        <div className={styles.infoBtnWrapper}>
          <InfoBtn
            infoContent="The average score is calculated based on all courses you have completed"
            popupMaxWidth="240rem"
          />
        </div>
      </div>
      {!isEdit && accessToken && (
        <div className={styles.editBtnWrapper}>
          <Tooltip infoContent="Edit profile">
            <InsetBtn onClick={handleEdit} icon={<SettingsIcon />} />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default UserInfoCard;
