import React, { useState } from "react";
import { motion } from "framer-motion";
import { ReactComponent as ArrowDownIcon } from "../../../images/icons/arrowDown.svg";
import InsetBtn from "../InsetBtn/InsetBtn";
import styles from "./Accordion.module.scss";

const Accordion = ({
  header = null,
  content = null,
  toggleNode = null,
  containerClassName,
  headerClassName,
  contentClassName,
  toggleClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleEl = toggleNode ? (
    toggleNode
  ) : (
    <InsetBtn
      icon={<ArrowDownIcon className={styles.arrowIcon} />}
      width="24rem"
      height="24rem"
    />
  );

  return (
    <div className={containerClassName ? containerClassName : ""}>
      <div
        className={`${styles.header} ${headerClassName ? headerClassName : ""}`}
      >
        {header}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`${styles.toggle} ${
            toggleClassName ? toggleClassName : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {toggleEl}
        </motion.div>
      </div>
      <motion.div
        key="content"
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{
          overflow: "hidden",
        }}
      >
        <div className={contentClassName ? contentClassName : ""}>
          {content}
        </div>
      </motion.div>
    </div>
  );
};

export default Accordion;
