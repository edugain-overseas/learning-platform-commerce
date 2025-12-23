import React from "react";
import { Link } from "react-router-dom";
import { serverName } from "../../../http/server";
import { useGoogleAvatar } from "../../../hooks/useGoogleAvatar";
import AvatarFallback from "../AvatarFallback/AvatarFallback";
import styles from "./Avatar.module.scss";

const Avatar = ({ size = "76rem", src, alt = "" }) => {
  const isGoogleAvatar = src?.includes("https://");
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
      <Link to="/me" style={{ width: "100%", height: "100%" }}>
        <img src={avatarSrc} alt={alt} />
      </Link>
    </div>
  );
};

export default Avatar;
