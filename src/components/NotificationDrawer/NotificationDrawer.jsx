import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications } from "../../context/NotificationsContext";
import { ReactComponent as BackIcon } from "../../images/icons/arrow-left.svg";
import { ReactComponent as TrashIcon } from "../../images/icons/trash-cart.svg";
import { ReactComponent as BellIcon } from "../../images/icons/bell-with-waves.svg";
import styles from "./NotificationDrawer.module.scss";

const backdropVariants = {
  hidden: {
    pointerEvents: "none",
  },
  visible: {
    pointerEvents: "auto",
  },
};

const drawerVariants = {
  hidden: {
    x: "100%",
  },
  visible: {
    x: 0,
  },
};

const NotificationDrawer = () => {
  const { notifications, close, isOpen } = useNotifications();

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            className={styles.drawer}
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <button onClick={close}>
                <BackIcon />
              </button>

              <h5>Notifications</h5>

              <button>
                <TrashIcon />
              </button>
            </div>

            <div className={styles.body}>
              {notifications.length !== 0 ? (
                <></>
              ) : (
                <div className={styles.noContent}>
                  <BellIcon />
                  <p>No Notifications</p>
                  <p>
                    We'll let you know when there
                    <br />
                    will be something to update you.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default NotificationDrawer;
