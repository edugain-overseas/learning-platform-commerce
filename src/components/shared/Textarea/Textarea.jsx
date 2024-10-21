import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./Textarea.module.scss";
import { pxToRem } from "../../../utils/remToPx";

const Textarea = forwardRef(
  (
    {
      width = "100%",
      minRows = 1,
      maxRows = null,
      fontSize = 14,
      disabled = false,
      placeholder = "Please write text here...",
      className = "",
      value,
      onChange,
      prefixStr = "",
      setMinRowsOnBlur = false,
      onFocus = () => {},
      onBlur = () => {},
      ...rest
    },
    ref
  ) => {
    const textareaRef = useRef(null);

    const handleBlur = (e) => {
      onBlur(e)
      if (setMinRowsOnBlur) {
        const originalHeight = fontSize * minRows * 1.2 + 8;
        // const maxHeight = maxRows ? fontSize * maxRows * 1.2 + 8 : null;

        textareaRef.current.style.height = originalHeight + "rem";
        //   textareaRef.current.style.height =
        //     value === ""
        //       ? originalHeight + "rem"
        //       : Math.max(
        //           originalHeight,
        //           maxHeight
        //             ? Math.min(
        //                 pxToRem(textareaRef.current.scrollHeight),
        //                 maxHeight
        //               )
        //             : pxToRem(textareaRef.current.scrollHeight)
        //         ) + "rem";
      }
    };

    useImperativeHandle(ref, () => textareaRef.current);

    useEffect(() => {
      if (setMinRowsOnBlur) {
        const originalHeight = fontSize * minRows * 1.2 + 8;
        const maxHeight = maxRows ? fontSize * maxRows * 1.2 + 8 : null;

        textareaRef.current.style.height = originalHeight + "rem";
        textareaRef.current.style.height =
          value === ""
            ? originalHeight + "rem"
            : Math.max(
                originalHeight,
                maxHeight
                  ? Math.min(
                      pxToRem(textareaRef.current.scrollHeight),
                      maxHeight
                    )
                  : pxToRem(textareaRef.current.scrollHeight)
              ) + "rem";
      }
    }, [minRows, setMinRowsOnBlur, fontSize, value, maxRows]);

    const handleChange = (e) => {
      const newValue = e.target.value;

      const originalHeight = fontSize * minRows * 1.2 + 10;
      const maxHeight = maxRows ? fontSize * maxRows * 1.2 + 10 : null;
      textareaRef.current.style.height = originalHeight + "rem";
      textareaRef.current.style.height =
        newValue === ""
          ? originalHeight + "rem"
          : Math.max(
              originalHeight,
              maxHeight
                ? Math.min(pxToRem(textareaRef.current.scrollHeight), maxHeight)
                : pxToRem(textareaRef.current.scrollHeight)
            ) + "rem";

      if (
        prefixStr !== "" &&
        newValue === prefixStr.slice(0, prefixStr.length - 1)
      ) {
        return;
      }

      if (onChange) {
        value !== undefined ? onChange(newValue) : onChange(e);
      }
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
        onBlur={handleBlur}
        {...rest}
      />
    );
  }
);

export default Textarea;
