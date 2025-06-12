import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as DropDownArrowIcon } from "../../../images/icons/dropdownArrow.svg";
import { ReactComponent as CrossIcon } from "../../../images/icons/cross.svg";
import styles from "./Select.module.scss";

const Select = ({
  options = [],
  value = "",
  onChange = () => {},
  borderless = false,
  placeholder = "Please select option",
  wrapperStyles = {},
  dropDownWrapperStyles = {},
  allowClear = true,
}) => {
  const [isOpen, setIsOpen] = useState();
  const [highlightedIndex, setHightlightedIndex] = useState(0);
  const selectRef = useRef(null);
  const highlightedOptionRef = useRef(null);

  const selectedOption = options.find(
    ({ value: optionValue }) => optionValue === value
  );

  const handleOptionClick = (e, value) => {
    e.stopPropagation();
    onChange(value);
    setIsOpen(false);
  };

  const handleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
  };

  useEffect(() => {
    const select = document.getElementById("select");
    const handleWindowClick = (e) => {
      if (e.target !== select) {
        setIsOpen(false);
      }
    };
    window.addEventListener("click", handleWindowClick);

    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  }, []);

  useEffect(() => {
    const ref = selectRef.current;
    const handleKeydown = (e) => {
      e.preventDefault();
      if (e.target !== ref) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setIsOpen((prev) => !prev);
          if (isOpen && !options[highlightedIndex].disabled)
            onChange(options[highlightedIndex].value);
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!isOpen) {
            setIsOpen(true);
            break;
          }
          const newValue = highlightedIndex + (e.code === "ArrowDown" ? 1 : -1);
          if (newValue >= 0 && newValue < options.length) {
            setHightlightedIndex(newValue);
            const highlightedOptionElement = highlightedOptionRef?.current;
            if (highlightedOptionElement) {
              highlightedOptionElement.scrollIntoView({
                behavior: "smooth",
              });
            }
          }
          break;
        case "Escape":
          setIsOpen(false);
          break;
        default:
          break;
      }
    };
    ref?.addEventListener("keydown", handleKeydown);

    return () => {
      ref?.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen, highlightedIndex, options, onChange]);

  return (
    <div
      id="select"
      tabIndex={0}
      ref={selectRef}
      className={`${styles.wrapper} ${borderless && styles.borderless} ${
        isOpen && styles.open
      }`}
      style={wrapperStyles}
      onClick={(e) => handleOpen(e)}
    >
      {selectedOption ? (
        <span className={styles.value} title={selectedOption.label}>
          {selectedOption.label}
        </span>
      ) : (
        <span
          className={styles.placeholder}
          title={typeof placeholder === "string" ? placeholder : ""}
        >
          {placeholder}
        </span>
      )}

      {value !== "" && allowClear ? (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={(e) => handleClear(e)}
        >
          <CrossIcon />
        </button>
      ) : (
        <button
          type="button"
          className={styles.openBtn}
          onClick={(e) => handleOpen(e)}
        >
          <DropDownArrowIcon />
        </button>
      )}

      <div className={styles.dropDownWrapper} style={dropDownWrapperStyles}>
        <ul className={styles.dropDownList}>
          {options.map((option, index) => (
            <li
              key={option.label || index}
              ref={
                highlightedIndex === index + 1
                  ? highlightedOptionRef
                  : undefined
              }
              className={`${styles.option} ${
                selectedOption && selectedOption.value === option.value
                  ? styles.selected
                  : ""
              } ${option.disabled ? styles.disabled : ""} ${
                highlightedIndex === index && styles.highlighted
              }`}
              onClick={
                option.disabled
                  ? (e) => e.stopPropagation()
                  : (e) => handleOptionClick(e, option.value)
              }
              onMouseOver={() => setHightlightedIndex(index)}
              title={
                option.disabled ? `${option.label} -  disabled` : option.label
              }
            >
              <span className={styles.label}>{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select;
