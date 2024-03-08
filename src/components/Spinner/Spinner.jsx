import React from "react";
import { SyncLoader } from "react-spinners";
import { remToPx } from "../../utils/remToPx";

const Spinner = ({ contrastColor = false, size = 10 }) => {
  return (
    <SyncLoader
      color={contrastColor ? "#fff" : "#d00000"}
      size={remToPx(size)}
      speedMultiplier={0.7}
    />
  );
};

export default Spinner;
