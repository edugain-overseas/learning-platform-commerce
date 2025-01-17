import React from "react";
import Spinner from "./Spinner/Spinner";

const SuspenseFallback = () => {
  return (
    <div
      style={{
        minHeight: '400px',
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  );
};

export default SuspenseFallback;
