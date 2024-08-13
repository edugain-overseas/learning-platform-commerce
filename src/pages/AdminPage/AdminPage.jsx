import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserType } from "../../redux/user/selectors";
import AdminChats from "../../components/AdminChats/AdminChatsComponent";
import styles from "./AdminPage.module.scss";

const AdminPage = () => {
  const userType = useSelector(getUserType);
  console.log(userType);

  useEffect(() => {});

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
