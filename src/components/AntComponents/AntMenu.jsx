import { ConfigProvider, Menu } from "antd";
import React from "react";

const AntMenu = ({ designTokens, ...props }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            ...designTokens,
          },
        },
      }}
    >
      <Menu {...props} />
    </ConfigProvider>
  );
};

export default AntMenu;
