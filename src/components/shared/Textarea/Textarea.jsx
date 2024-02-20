import React, { useRef } from "react";
import styles from "./Textarea.module.scss";

const Textarea = ({
  width = "100%",
  minRows = 1,
  fontSize = 14,
  disabled = false,
  // maxRows = null,
  placeholder = "Please write text here...",
  className = "",
  value = null,
  onChange = () => null,
  prefixStr = "",
}) => {
  const textareaRef = useRef(null);

  console.log(value);

  const handleChange = (e) => {
    const value = e.target.value;
    const originalHeight = fontSize * minRows * 1.2 + 10;
    textareaRef.current.style.height = originalHeight + "rem";
    textareaRef.current.style.height =
      Math.max(originalHeight, textareaRef.current.scrollHeight) + "rem";
    if (value === prefixStr.slice(0, prefixStr.length - 1)) {
      return
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
    />
  );
};

export default Textarea;
