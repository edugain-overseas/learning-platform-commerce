import React from "react";
import { SyncLoader } from "react-spinners";
import { remToPx } from "../../utils/remToPx";

const Spinner = ({ contrastColor = false, size = 8, height = 20, color }) => {
  return (
    <SyncLoader
      color={color ? color : contrastColor ? "#fcfcfc" : "#d00000"}
      size={remToPx(size)}
      speedMultiplier={0.7}
      style={{ overflow: "visible", height: `${height}rem` }}
    />
  );
};

export default Spinner;
