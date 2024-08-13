import { ConfigProvider, Segmented } from "antd";
import React from "react";

const AntSegment = ({ designTokens, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Segmented: designTokens,
        },
      }}
    >
      <Segmented {...props} />
    </ConfigProvider>
  );
};

export default AntSegment;
