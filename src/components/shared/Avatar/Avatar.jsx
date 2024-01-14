import React, { useRef } from "react";
import foto from "../../../images/login-bg.png";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import styles from "./Avatar.module.scss";

const Avatar = ({ size, handleUpload = () => {} }) => {
  const inputRef = useRef(null);

  const onChange = (e) => {
    const file = e.target.files[0];
    handleUpload(file);
  };

  return (
    <div
      className={styles.avatarWrapper}
      style={size && { width: size, height: size }}
    >
      <img src={foto} alt="user full name" />
      <button
        className={styles.editBtn}
        onClick={() => inputRef.current.click()}
      >
        <EditIcon />
        <span>Edit</span>
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </button>
    </div>
  );
};

export default Avatar;
