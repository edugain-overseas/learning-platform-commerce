import React from "react";
import styles from "./Avatar.module.scss";
import AvatarFallback from "../AvatarFallback/AvatarFallback";
import { serverName } from "../../../http/server";
import { useGoogleAvatar } from "../../../hooks/useGoogleAvatar";

const Avatar = ({ size = "76rem", src, alt = "" }) => {
  const isGoogleAvatar = src?.includes("https://");
  // const googleSrc = src;
  const googleSrc = useGoogleAvatar(src);
  const notGoogleSrc = `${serverName}/${src}`;
  const avatarSrc = isGoogleAvatar ? googleSrc : notGoogleSrc;

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
