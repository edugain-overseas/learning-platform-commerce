import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Tooltip.module.scss";

const Tooltip = ({
  children,
  orientation = "left",
  infoContent = "Hello world",
  popupMaxWidth = "204rem",
  trigger = "hover",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const childrenWrapperRef = useRef(null);
  const popupRef = useRef(null);

  const updatePosition = () => {
    if (!childrenWrapperRef.current) return;

    const rect = childrenWrapperRef.current.getBoundingClientRect();

    setCoords({
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width,
      height: rect.height,
    });
  };

  const handleOpen = () => {
    updatePosition();
    setIsOpen(true);
  };

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const childrenWrapper = childrenWrapperRef.current;
    if (!childrenWrapper) return;
    const childrenElement = childrenWrapper.firstChild;
    if (!childrenElement) return;

    if (trigger === "focus") {
      childrenElement.addEventListener("focus", handleOpen);
      childrenElement.addEventListener("blur", handleClose);
    }

    if (isOpen) {
      window.addEventListener("resize", updatePosition);
      window.addEventListener("scroll", updatePosition);
    }

    return () => {
      if (trigger === "focus") {
        childrenElement.removeEventListener("focus", handleOpen);
        childrenElement.removeEventListener("blur", handleClose);
      }
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
    // eslint-disable-next-line
  }, [trigger, isOpen]);

  const getPopupStyles = () => {
    if (!isOpen) return { opacity: 0, pointerEvents: "none" };

    const offset = 10;
    let top = coords.top;
    let left = coords.left;

    if (orientation === "left") {
      top = coords.top + coords.height / 2;
      left = coords.left - offset;
    } else if (orientation === "top") {
      top = coords.top - offset;
      left = coords.left + coords.width / 2;
    } else if (orientation === "bottom") {
      top = coords.top + coords.height + offset;
      left = coords.left + coords.width / 2;
    }

    return {
      position: "absolute",
      top: `${top}px`,
      left: `${left}px`,
      maxWidth: popupMaxWidth,
      opacity: 1,
      pointerEvents: "none",
    };
  };

  return (
    <div
      className={styles.wrapper}
      onMouseLeave={trigger === "hover" ? handleClose : undefined}
    >
      <div
        ref={childrenWrapperRef}
        onMouseEnter={trigger === "hover" ? handleOpen : undefined}
      >
        {children}
      </div>

      {isOpen &&
        createPortal(
          <div
            ref={popupRef}
            className={`${styles.portalPopup} ${styles[orientation]}`}
            style={getPopupStyles()}
          >
            {infoContent}
          </div>,
          document.body,
        )}
    </div>
  );
};

export default Tooltip;
