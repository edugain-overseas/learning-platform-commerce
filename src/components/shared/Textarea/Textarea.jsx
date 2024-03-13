import React, { useEffect, useRef } from "react";
import styles from "./Textarea.module.scss";
import { pxToRem } from "../../../utils/remToPx";

const Textarea = ({
  width = "100%",
  minRows = 1,
  maxRows = null,
  fontSize = 14,
  disabled = false,
  placeholder = "Please write text here...",
  className = "",
  value = null,
  onChange = () => null,
  prefixStr = "",
  setMinRowsonBlur = false,
  onFocus = () => {},
  onBlur = () => {},
}) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (setMinRowsonBlur) {
      const originalHeight = fontSize * minRows * 1.2 + 8;
      const maxHeight = maxRows ? fontSize * maxRows * 1.2 + 8 : null;
      console.log(originalHeight, maxHeight);

      textareaRef.current.style.height = originalHeight + "rem";
      textareaRef.current.style.height =
        value === ""
          ? originalHeight + "rem"
          : Math.max(
              originalHeight,
              maxHeight
                ? Math.min(pxToRem(textareaRef.current.scrollHeight), maxHeight)
                : pxToRem(textareaRef.current.scrollHeight)
            ) + "rem";
    }
  }, [minRows, setMinRowsonBlur, fontSize, value, maxRows]);

  const handleChange = (e) => {
    const value = e.target.value;

    const originalHeight = fontSize * minRows * 1.2 + 8;
    const maxHeight = maxRows ? fontSize * maxRows * 1.2 + 8 : null;
    textareaRef.current.style.height = originalHeight + "rem";
    textareaRef.current.style.height =
      value === ""
        ? originalHeight + "rem"
        : Math.max(
            originalHeight,
            maxHeight
              ? Math.min(pxToRem(textareaRef.current.scrollHeight), maxHeight)
              : pxToRem(textareaRef.current.scrollHeight)
          ) + "rem";
    if (
      prefixStr !== "" &&
      value === prefixStr.slice(0, prefixStr.length - 1)
    ) {
      return;
    }

    onChange(value);
  };

  return (
    <textarea
      ref={textareaRef}
      disabled={disabled}
      className={`${styles.textarea} ${className}`}
      style={{
        width,
        fontSize: fontSize + "rem",
      }}
      rows={minRows}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};

export default Textarea;
