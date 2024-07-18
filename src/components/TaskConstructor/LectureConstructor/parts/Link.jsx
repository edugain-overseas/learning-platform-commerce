import React from "react";
import { ReactComponent as TrashIcon } from "../../../../images/icons/trashRounded.svg";
import { ReactComponent as LinkIcon } from "../../../../images/icons/link.svg";
import { ReactComponent as PlusIcon } from "../../../../images/icons/plusRounded.svg";
import TitleInput from "./shared/TitleInput";
import TextInput from "./shared/TextInput";
import styles from "../LectureConstructor.module.scss";
import Textarea from "../../../shared/Textarea/Textarea";

const Link = ({ partData, setters }) => {
  return (
    <>
      <TitleInput value={partData.a_title} setValue={setters.title} />
      <div className={styles.linksSectionWrapper}>
        {partData.links.length !== 0 && (
          <div className={styles.linksWrapper}>
            {partData.links.map((link, index) => (
              <div className={styles.link} key={index}>
                <LinkIcon className={styles.linkIcon} />
                <Textarea
                  placeholder="Put your link here..."
                  className={styles.linkInput}
                  value={link.link}
                  onChange={(value) =>
                    setters.onChangeLink(index, "link", value)
                  }
                  maxRows={1}
                />
                <Textarea
                  placeholder="Write link description here..."
                  className={styles.linkInput}
                  value={link.anchor}
                  onChange={(value) =>
                    setters.onChangeLink(index, "anchor", value)
                  }
                  maxRows={1}
                />
                <button
                  className={styles.deleteLinkBtn}
                  onClick={() => setters.deleteLink(index)}
                >
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}
        <button className={styles.addNewLinkBtn} onClick={setters.addLink}>
          <PlusIcon />
          <span>Add link</span>
        </button>
      </div>
      <TextInput value={partData.a_text} setValue={setters.text} />
    </>
  );
};

export default Link;
