import { ConfigProvider, Tabs as AntdTabs } from "antd";
import React from "react";

const Tabs = ({ items }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            itemSelectedColor: "var(--content-main)",
            inkBarColor: "var(--content-main)",
            itemActiveColor: "var(--content-main)",
            itemHoverColor: "var(--content-main)",
          },
        },
        token: {
          colorText: "var(--content-datail-secondary)",
          fontSize: "16rem",
          fontWeightStrong: "700",
          colorBorder: "transparent",
        },
      }}
    >
      <AntdTabs
        defaultActiveKey="1"
        tabPlacement="start"
        styles={{
          item: {
            justifyContent: "flex-end",
            fontWeight: 500,
          },
        }}
        style={{ height: "100%", overflow: "auto", paddingRight: "16rem" }}
        tabBarStyle={{
          position: "sticky",
          top: 0,
          // borderRight: "1px solid var(--content-datail-secondary)",
        }}
        items={items}
      />
    </ConfigProvider>
  );
};

export default Tabs;
