import React, { useState } from "react";
import { ReactComponent as EditIcon } from "../../images/icons/edit.svg";
import { ReactComponent as SaveIcon } from "../../images/icons/check.svg";
import { ReactComponent as EyeIcon } from "../../images/icons/eye.svg";
import { ReactComponent as EyeInvisibleIcon } from "../../images/icons/eye-invisible.svg";
import Avatar from "../shared/Avatar/Avatar";
import styles from "./UserInfoCard.module.scss";
// import Select from "../shared/Select/Select";


const UserInfoCard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState("Sam James");
  const [firstname, setFirstname] = useState("Sam");
  const [lastname, setLastname] = useState("Sam James");
  const [email, setEmail] = useState("samj_ames20@gmail.com");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("+380669209415");
  const [country, setCountry] = useState("Ukraine");
  const [code, setCode] = useState("");
  const [isPasswordShown, setIsPasswrodSwown] = useState(false);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    setIsEdit(false);
  };

  const handleToggleShowPassword = (e) => {
    e.preventDefault();
    console.log("toggle");
    setIsPasswrodSwown((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <Avatar size="117rem" />
        {isEdit ? (
          <button className={styles.saveBtn} onClick={handleSave}>
            <SaveIcon />
            <span>Save changes</span>
          </button>
        ) : (
          <button className={styles.editBtn} onClick={handleEdit}>
            <EditIcon />
            <span>Edit data</span>
          </button>
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
          <label className={styles.verificationCode}>
            <span>Verification code:</span>
            <div className={styles.verificationInputWrapper}>
              <input
                type="text"
                value={code}
                disabled={!isEdit}
                onChange={(e) => setCode(e.target.value)}
              />
              <button>
                <span>Verification</span>
              </button>
            </div>
          </label>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
