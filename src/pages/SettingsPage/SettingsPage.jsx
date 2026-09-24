import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../http/instance";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { logoutThunk } from "../../redux/user/operations";
import { getUserInfo } from "../../redux/user/selectors";
import CommonButton from "../../components/shared/CommonButton/CommonButton";
import Modal from "../../components/shared/Modal/Modal";
import UserInfo from "../../components/SIdeBar/UserInfo/UserInfo";
import styles from "./SettingsPage.module.scss";
import moment from "moment";

const SettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [messageApi, contextHolder] = useNotificationMessage();
  const user = useSelector(getUserInfo);
  const isUser = user.accessToken;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!isUser) {
      messageApi.error({
        duration: 3,
        content: "Please sign in to your account first.",
      });
      return;
    }
    try {
      setIsDeleteLoading(true);
      const response = await instance.delete("/user/delete-account");
      dispatch(logoutThunk()).then(() => {
        instance.defaults.headers.Authorization = null;
      });
      messageApi.success({ duration: 3, content: response.data.message });
      navigate("/login");
    } catch (error) {
      messageApi.error({
        duration: 3,
        content: "An error occurred while deleting your account.",
      });
      console.log(error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {contextHolder}

      <div className={styles.userCard}>
        <UserInfo />
        <p>Email: {user.email}</p>
        {user.name && <p>First Name: {user.name}</p>}
        {user.surname && <p>Last Name: {user.surname}</p>}
        {user.phone && <p>Phone number: {user.phone}</p>}
        {user.country && <p>Country: {user.country}</p>}
        {user.registeredAt && (
          <p>
            Created:{" "}
            {moment
              .utc(user.registeredAt)
              .local()
              .format("DD.MM.YYYY [at] HH:mm")}
          </p>
        )}
      </div>

      <CommonButton
        text="Delete Account"
        variant="red"
        hoverVariant="darkBlue"
        wrapperStyles={{ width: "200rem", marginInline: "auto" }}
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <h3 style={{ fontSize: "20rem", marginBottom: "20rem" }}>
          Delete Account
        </h3>
        <p style={{ fontSize: "16rem", marginBottom: "24rem" }}>
          Are you sure you want to permanently delete your account? This action
          cannot be undone.
        </p>
        <div style={{ display: "flex", gap: "10rem" }}>
          <CommonButton
            text="Cancel"
            variant="lightGrey"
            hoverVariant="darkBlue"
            onClick={() => setIsOpen(false)}
          />
          <CommonButton
            text="Delete Account"
            variant="red"
            hoverVariant="darkBlue"
            onClick={handleDelete}
            disabled={isDeleteLoading}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
