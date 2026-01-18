import React from "react";
import MainLayout from "./MainLayout/MainLayout";
import { ChatProvider } from "../context/chatContext";
import { CartProvider } from "../context/cartContext";
import { ActiveTimeProvider } from "../context/activeTimeContext";

const Root = () => {
  return (
    <ChatProvider>
      <CartProvider>
        <ActiveTimeProvider>
          <MainLayout />
        </ActiveTimeProvider>
      </CartProvider>
    </ChatProvider>
  );
};

export default Root;
