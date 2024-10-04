import React from "react";
import styles from "./Avatar.module.scss";
import AvatarFallback from "../AvatarFallback/AvatarFallback";
import { serverName } from "../../../http/server";

const Avatar = ({ size = "76rem", src, alt = "" }) => {
  if (!src) {
    return (
      <div
        className={styles.avatarWrapper}
        style={{
          width: size,
          height: size,
        }}
      >
        <AvatarFallback size={size} />
      </div>
    );
  }

  const isGoogleAvatar = src.includes("https://");
  const googleSrc = src;
  const notGoogleSrc = `${serverName}/${src}`;
  const avatarSrc = isGoogleAvatar ? googleSrc : notGoogleSrc;

  return (
    <div
      className={styles.avatarWrapper}
      style={{
        width: size,
        height: size,
      }}
    >
      <img src={avatarSrc} alt={alt} />
    </div>
  );
};

export default Avatar;
