import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
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
import {
  updateUserInfoThunk,
  updateUsernameThunk,
} from "../../redux/user/operations";
import { validatePassword } from "../../utils/inputsValidateHandler";
import { serverName } from "../../http/sever";

const UserInfoCard = ({ userInfo }) => {
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

  const dispatch = useDispatch();

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleSave = () => {
    if (username !== userInfo.username) dispatch(updateUsernameThunk(username));
    const data = {};
    if (email !== userInfo.email) data.email = email;
    if (password !== "" && validatePassword(password)) data.password = password;
    if (firstname !== userInfo.name) data.name = firstname;
    if (lastname !== userInfo.surname) data.surname = lastname;
    if (phone !== userInfo.phone) data.phone = phone;
    if (country !== userInfo.country) data.country = country;

    console.log(data);

    if (Object.keys(data).length !== 0) {
      dispatch(updateUserInfoThunk(data)).then(() => setIsEdit(false));
    } else {
      setIsEdit(false);
    }
  };

  const handleToggleShowPassword = (e) => {
    e.preventDefault();
    setIsPasswrodSwown((prev) => !prev);
  };

  const handleCancelEdit = () => {
    setIsEdit(false);
  };

  const handlePhoneChange = (value, countryValue, _, formattedValue) => {
    console.log("value:", value);
    console.log("country:", countryValue);
    console.log("formattedValue:", formattedValue);
    setPhone(value);
    setCountry(countryValue.name);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <Avatar
          size="117rem"
          editable={false}
          src={
            userInfo.avatarURL !== ""
              ? `${serverName}/${userInfo.avatarURL}`
              : null
          }
        />
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
              <AvatarEditor
                previousAvatars={userInfo.previousAvatars}
                userId={userInfo.userId}
                userAvatar={userInfo.avatarURL}
              />
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
          <Tooltip
            orientation="bottom"
            infoContent="You can chage your first name just once!"
            trigger={userInfo.changedSurname ? "none" : "focus"}
            popupMaxWidth="100%"
          >
            <input
              type="text"
              value={firstname}
              disabled={!isEdit || userInfo.changedName}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Tooltip>
        </label>
        <label>
          <span>Last Name:</span>
          <Tooltip
            orientation="bottom"
            infoContent="You can chage your last name just once!"
            trigger={userInfo.changedSurname ? "none" : "focus"}
            popupMaxWidth="100%"
          >
            <input
              type="text"
              value={lastname}
              disabled={!isEdit || userInfo.changedSurname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Tooltip>
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
          <PhoneInput
            containerClass={styles.phoneContainer}
            inputClass={styles.phoneInput}
            buttonClass={styles.phoneBtn}
            dropdownClass={styles.phoneDropDown}
            country={"us"}
            value={phone}
            onChange={handlePhoneChange}
            disabled={!isEdit}
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
