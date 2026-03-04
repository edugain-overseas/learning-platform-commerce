import React from "react";
import { AdminChatProvider } from "../context/adminChatContext";
import MainLayout from "./MainLayout/MainLayout";

const AdminRoot = () => {
  return (
    <AdminChatProvider>
      <MainLayout />
    </AdminChatProvider>
  );
};

export default AdminRoot;
