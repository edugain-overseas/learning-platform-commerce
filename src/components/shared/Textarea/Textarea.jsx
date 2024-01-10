import React, { useRef } from "react";
import styles from "./Textarea.module.scss";

const Textarea = ({
  width = "100%",
  minRows = 1,
  fontSize = 14,
  disabled=false,
  maxRows = null,
  placeholder = "Please write text here...",
  className = "",
  value = null,
  onChange = () => null,
}) => {
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);
    const originalHeight = fontSize * minRows * 1.2 + 10;
    textareaRef.current.style.height = originalHeight + "rem";
    textareaRef.current.style.height =
      Math.max(originalHeight, textareaRef.current.scrollHeight) + "rem";
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
