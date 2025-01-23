import React from "react";

const CircleProgressBar = ({
  width = 100,
  backgroundColor = "#fff",
  strokeColor = "#000",
  progress = 1,
  strokeWidth = 12,
}) => {
  const raduis = width / 2 - strokeWidth / 2;
  const strokeDasharray = 2 * Math.PI * raduis;
  const strokeDashoffset = strokeDasharray * ((100 - progress) / 100);
  return (
    <svg
      width={`${width}rem`}
      height={`${width}rem`}
      viewBox={`0 0 ${width} ${width}`}
      style={{ transform: "rotate(-90deg)" }}
    >
      <circle
        r={raduis}
        cx={width / 2}
        cy={width / 2}
        fill="transparent"
        stroke={backgroundColor}
        strokeWidth={`${strokeWidth}rem`}
      ></circle>
      <circle
        r={raduis}
        cx={width / 2}
        cy={width / 2}
        fill="transparent"
        stroke={strokeColor}
        strokeLinecap="round"
        strokeWidth={`${strokeWidth}rem`}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
      ></circle>
    </svg>
  );
};

export default CircleProgressBar;
