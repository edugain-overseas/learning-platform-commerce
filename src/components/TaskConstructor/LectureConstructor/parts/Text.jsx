import React from "react";
import TitleInput from "./shared/TitleInput";
import SubTitleInput from "./shared/SubTitleInput";
import TextInput from "./shared/TextInput";
import styles from "../LectureConstructor.module.scss";

const Text = ({ partData, setters }) => {
  const isSubtitle =
    partData.subtitle !== null && partData.subtitle !== undefined;

  return (
    <>
      <div className={styles.titleWrapper}>
        <TitleInput value={partData.a_title} setValue={setters.title} />
        {isSubtitle ? (
          <div className={styles.subTitleWrapper}>
            <SubTitleInput
              value={partData.subtitle}
              setValue={setters.subTitle}
            />
            <button
              className={styles.removeSubtitle}
              onClick={() => setters.removeSubTitle()}
            >
              —
            </button>
          </div>
        ) : (
          <button
            className={styles.addSubtitle}
            onClick={() => setters.addSubTitle()}
          >
            +
          </button>
        )}
      </div>
      <TextInput value={partData.a_text} setValue={setters.text} />
    </>
  );
};

export default Text;
