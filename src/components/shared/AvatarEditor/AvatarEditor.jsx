import React, { useRef, useState } from "react";
import * as Editor from "react-avatar-editor";
import { ReactComponent as MinusIcon } from "../../../images/icons/minus.svg";
import { ReactComponent as PlusIcon } from "../../../images/icons/plus.svg";
import { ReactComponent as UploadIcon } from "../../../images/icons/upload.svg";
import { ReactComponent as SaveIcon } from "../../../images/icons/save.svg";
import { remToPx } from "../../../utils/remToPx";
import noAvatar from "../../../images/noAvatar.png";
import InsetBtn from "../InsetBtn/InsetBtn";
import Avatar from "../Avatar/Avatar";
import styles from "./AvatarEditor.module.scss";

const AvatarEditor = () => {
  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [userAvatars, setUserAvatars] = useState([]);

  console.log(scale);

  const inputUploadRef = useRef(null);
  const editorRef = useRef(null);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleScale = (e) => {
    setScale(+e.target.value);
  };

  const handleIncreaseScale = () => {
    console.log("click");
    if (scale <= 2.8) {
      setScale((prev) => prev + 0.2);
    } else {
      setScale(3);
    }
  };

  const handleDecreaseScale = () => {
    console.log("click");
    if (scale >= 1.2) {
      setScale((prev) => prev - 0.2);
    } else {
      setScale(1);
    }
  };

  const handleSaveNewAvatar = () => {
    if (editorRef.current && image) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      canvas.toBlob((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        console.log(imageUrl);
        setUserAvatars((prev) => [...prev, imageUrl]);
        // URL.revokeObjectURL(imageUrl);
      }, "image/png");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Select your profile photo</h3>
      <div className={styles.divider}></div>
      <div className={styles.avatarEditorWrapper}>
        {image ? (
          <Editor
            className={styles.editor}
            ref={editorRef}
            image={image}
            width={remToPx(200)}
            height={remToPx(200)}
            border={[remToPx(73), remToPx(30)]}
            borderRadius={remToPx(100)}
            scale={scale}
            // disableHiDPIScaling={true}
            // disableBoundaryChecks={true}
          />
        ) : (
          <img src={noAvatar} className={styles.noAvatar} alt="user avatar" />
        )}
        <div className={styles.scaleSlider}>
          <InsetBtn
            icon={<MinusIcon />}
            onClick={handleDecreaseScale}
            disabled={!image}
          />
          <input
            className={styles.sliderInput}
            type="range"
            onChange={handleScale}
            min={1}
            max={3}
            step={0.1}
            value={`${scale}`}
            disabled={!image}
          />
          <InsetBtn
            icon={<PlusIcon />}
            onClick={handleIncreaseScale}
            disabled={!image}
          />
        </div>
      </div>
      <div className={styles.divider}></div>
      <ul className={styles.userAvatars}>
        {userAvatars.length ? (
          userAvatars.map((avatarUrl, index) => (
            <li className={styles.userAvatarItem} key={index}>
              <Avatar size="72rem" editable={false} src={avatarUrl} />
            </li>
          ))
        ) : (
          <li className={styles.userAvatarItem}>
            <Avatar size="72rem" editable={false} />
          </li>
        )}
      </ul>
      <div className={styles.divider}></div>
      <div className={styles.btnsWrapper}>
        <button onClick={() => inputUploadRef.current?.click()}>
          <span>Upload</span>
          <UploadIcon />
        </button>
        <button onClick={handleSaveNewAvatar}>
          <span>Save</span>
          <SaveIcon />
        </button>
        <input
          className={styles.fileInput}
          ref={inputUploadRef}
          type="file"
          accept="image/*"
          onChange={handleUploadImage}
        />
      </div>
    </div>
  );
};

export default AvatarEditor;
