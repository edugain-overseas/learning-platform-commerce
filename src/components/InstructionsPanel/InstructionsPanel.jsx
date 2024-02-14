import React, { useState } from "react";
import styles from "./InstructionsPanel.module.scss";
import { instructionsLinks } from "../../costants/nav";
import SearchBar from "../shared/SearchBar/SearchBar";
import NavLinksPanel from "../shared/NavLinksPanel/NavLinksPanel";

const InstructionsPanel = () => {
  const [searchValue, setSerchValue] = useState("");
  return (
    <div className={styles.wrapper}>
      <NavLinksPanel renderLinks={instructionsLinks} />
      <div className={styles.tools}>
        <SearchBar
          width="226rem"
          value={searchValue}
          onChange={setSerchValue}
          clearBtn={true}
        />
      </div>
    </div>
  );
};

export default InstructionsPanel;
