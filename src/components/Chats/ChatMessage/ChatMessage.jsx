import React from "react";
import { motion } from "framer-motion";
import { ReactComponent as IncomingTail } from "../../../images/icons/message-left-tail.svg";
import { ReactComponent as OutcomingTail } from "../../../images/icons/message-right-tail.svg";
import Avatar from "../../shared/Avatar/Avatar";
import DocumentLink from "../../shared/DocumentLink/DocumentLink";
import styles from "./ChatMessage.module.scss";
import { serverName } from "../../../http/server";

const ChatMessage = ({
  message,
  orientation = "in",
  senderName,
  files = [],
  time = null,
  avatar,
  animationDelayIndex,
}) => {
  console.log(files);
  return (
    <motion.div
      // positionTransition
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.1 * animationDelayIndex }}
      className={`${styles.messageWrapper} ${styles[orientation]}`}
    >
      <Avatar
        size="44rem"
        editable={false}
        src={avatar ? `${serverName}/${avatar}` : null}
      />
      <div className={styles.messageContent}>
        <span
          className={`${styles.messageTail} ${
            orientation === "in" ? styles.left : styles.right
          }`}
        >
          {orientation === "in" ? <IncomingTail /> : <OutcomingTail />}
        </span>
        <div className={styles.nameWrapper}>
          <span title={senderName}>{senderName}</span>
          {time && (
            <div className={styles.time}>
              <span>{time}</span>
            </div>
          )}
        </div>
        {message && (
          <div className={styles.messageText}>
            {message.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        )}
        {files.length !== 0 && (
          <div className={styles.messageFiles}>
            <div className={styles.divider}>
              <div className={styles.dividerText}>
                <span>Docs</span>
              </div>
            </div>
            {files.map((file) => (
              <DocumentLink key={file.file_path} file={file} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;
