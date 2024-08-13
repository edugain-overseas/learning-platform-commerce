import React from "react";
import { AdminChatProvider } from "./adminChatContext";
import Layout from "./Layout";
import ChatsList from "./ChatsList";
import ChatsSegment from "./ChatsSegment";
import Chat from "./Chat";

const AdminChatsComponent = ({ children }) => {
  return <AdminChatProvider>{children}</AdminChatProvider>;
};

const AdminChats = Object.assign(AdminChatsComponent, {
  Layout: Layout,
  ChatsList: ChatsList,
  ChatsSegment: ChatsSegment,
  Chat: Chat,
});

export default AdminChats;
