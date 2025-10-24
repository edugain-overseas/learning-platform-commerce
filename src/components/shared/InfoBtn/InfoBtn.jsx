import React from "react";
import { ReactComponent as InfoIcon } from "../../../images/icons/info.svg";
import Tooltip from "../Tooltip/Tooltip";
import InsetBtn from "../InsetBtn/InsetBtn";

const InfoBtn = ({
  infoContent = "Hello world",
  orientation = "left",
  popupMaxWidth = "400rem",
}) => {
  return (
    <Tooltip
      infoContent={infoContent}
      popupMaxWidth={popupMaxWidth}
      orientation={orientation}
    >
      <InsetBtn icon={<InfoIcon />} />
    </Tooltip>
  );
};

export default InfoBtn;
