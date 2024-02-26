import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getUserInfo } from "../../redux/user/selectors";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import { ReactComponent as SaveIcon } from "../../images/icons/save.svg";
import { ReactComponent as ReloadIcon } from "../../images/icons/reload.svg";
import { ReactComponent as EyeIcon } from "../../images/icons/eye.svg";
import { ReactComponent as EyeInvisibleIcon } from "../../images/icons/eye-invisible.svg";
import { ReactComponent as SettingsIcon } from "../../images/icons/settings.svg";
import Avatar from "../shared/Avatar/Avatar";
import Tooltip from "../shared/Tooltip/Tooltip";
import InsetBtn from "../shared/InsetBtn/InsetBtn";
import Modal from "../shared/Modal/Modal";
import AvatarEditor from "../shared/AvatarEditor/AvatarEditor";
import styles from "./UserInfoCard.module.scss";
// import Select from "../shared/Select/Select";

const UserInfoCard = () => {
  const userInfo = useSelector(getUserInfo);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [username, setUsername] = useState(userInfo.username);
  const [firstname, setFirstname] = useState(userInfo.name);
  const [lastname, setLastname] = useState(userInfo.surname);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(userInfo.phone);
  const [country, setCountry] = useState(userInfo.country);
  const [isPasswordShown, setIsPasswrodSwown] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleSave = () => {
    setIsEdit(false);
  };

  const handleToggleShowPassword = (e) => {
    e.preventDefault();
    console.log("toggle");
    setIsPasswrodSwown((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <Avatar size="117rem" editable={false} />
        {isEdit && (
          <>
            <button className={styles.editBtn} onClick={handleOpenModal}>
              <EditIcon />
              <span>Change avatar</span>
            </button>
            <Modal
              isOpen={isOpenModal}
              width="610rem"
              closeModal={() => setIsOpenModal(false)}
            >
              <AvatarEditor />
            </Modal>
          </>
        )}
      </div>
      <div className={styles.divider}></div>
      <div className={styles.dataWrapper}>
        <label>
          <span>Username:</span>
          <input
            type="text"
            value={username}
            disabled={!isEdit}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          <span>First Name:</span>
          <input
            type="text"
            value={firstname}
            disabled={!isEdit}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </label>
        <label>
          <span>Last Name:</span>
          <input
            type="text"
            value={lastname}
            disabled={!isEdit}
            onChange={(e) => setLastname(e.target.value)}
          />
        </label>
        <label className={styles.emailWrapper}>
          <span>Email:</span>
          <input
            type="email"
            value={email}
            disabled={!isEdit}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className={styles.passswordWrapper}>
          <span>Password:</span>

          <div className={styles.passwordInputWrapper}>
            {isEdit && (
              <button
                className={styles.toggleShowBtn}
                onClick={handleToggleShowPassword}
              >
                {isPasswordShown ? <EyeIcon /> : <EyeInvisibleIcon />}
              </button>
            )}
            <input
              type={isPasswordShown ? "text" : "password"}
              placeholder="********"
              className={styles.password}
              value={password}
              disabled={!isEdit}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </label>
        <label>
          <span>Phone number:</span>
          <input
            type="tel"
            value={phone}
            disabled={!isEdit}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <label>
          <span>Your country:</span>
          <input
            type="text"
            value={country}
            disabled={!isEdit}
            onChange={(e) => setCountry(e.target.value)}
          />
          {/* <Select
            value={country}
            placeholder="Select your country"
            wrapperStyles={{ width: "100%", padding: "4rem 6rem" }}
          /> */}
        </label>
        {isEdit && (
          <div className={styles.btnsWrapper}>
            <button onClick={handleCancelEdit}>
              <span>Cancel</span>
              <ReloadIcon />
            </button>
            <button onClick={handleSave}>
              <span>Save</span>
              <SaveIcon />
            </button>
          </div>
        )}
      </div>
      {!isEdit && (
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
