import React, { useState } from "react";
import { ReactComponent as ArrowIcon } from "../../images/icons/arrowDown.svg";
import CommonButton from "../shared/CommonButton/CommonButton";
import styles from "./DocumentToTaskContructor.module.scss";

const DocumentParsedCahce = ({
  type = "lecture",
  setDoc,
  setActiveTab,
  cacheInterface,
  cachedItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.docHistoryWrapper}>
      <CommonButton
        text="History"
        icon={
          <ArrowIcon
            className={styles.dropdownIcon}
            style={{ rotate: isOpen ? "180deg" : "0deg" }}
          />
        }
        onClick={() => setIsOpen(!isOpen)}
        variant="transparentTextLight"
        hoverVariant="transparentTextDark"
        className={styles.toggleButton}
      />
      {isOpen && (
        <div className={styles.docHistoryDropdown}>
          <ul className={styles.cacheList}>
            {cachedItems.map((item) => (
              <li key={`${item.type}_${item.url}`} className={styles.cacheItem}>
                <div
                  className={styles.cacheInfo}
                  onClick={() => {
                    setDoc(item.response);
                    setActiveTab(null);
                  }}
                  title="Click to quickly load this document from cache"
                >
                  <span className={styles.cacheTypeBadge}>{item.type}</span>
                  <span className={styles.cacheTitle}>{item.title}</span>
                  <span className={styles.cacheUrl}>{item.url}</span>
                </div>
                <button
                  className={styles.deleteCacheBtn}
                  onClick={() =>
                    cacheInterface.removeFromCache(item.url, item.type)
                  }
                  title="Delete from cache"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            className={styles.clearAllBtn}
            onClick={cacheInterface.clearAllCache}
          >
            Clear History Cache
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentParsedCahce;
