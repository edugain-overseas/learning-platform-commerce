import React, { useRef } from "react";
import { ReactComponent as EditIcon } from "../../../images/icons/edit.svg";
import styles from "./Avatar.module.scss";
import AvatarFallback from "../AvatarFallback/AvatarFallback";

const Avatar = ({
  size = "76rem",
  src,
  handleUpload = () => {},
  editable = true,
}) => {
  const inputRef = useRef(null);

  const onChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    handleUpload(file);
  };

  return (
    <div
      className={styles.avatarWrapper}
      style={{
        width: size,
        height: size,
        pointerEvents: editable ? "auto" : "none",
      }}
    >
      {src ? (
        <img src={src} alt="user full name" />
      ) : (
        <AvatarFallback size={size} />
      )}
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
