import React from "react";
import AdminChats from "../../components/AdminChats/AdminChatsComponent";
import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <AdminChats>
        <AdminChats.Layout>
          <>
            <AdminChats.ChatsList>
              <AdminChats.ChatsSegment />
            </AdminChats.ChatsList>
            <AdminChats.Chat />
          </>
        </AdminChats.Layout>
      </AdminChats>
    </div>
  );
};

export default AdminPage;
