import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { instance } from "../../http/instance";
import { useNotificationMessage } from "../../hooks/useNotificationMessage";
import { logoutThunk } from "../../redux/user/operations";
import CommonButton from "../../components/shared/CommonButton/CommonButton";
import Modal from "../../components/shared/Modal/Modal";

const SettingsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [messageApi, contextHolder] = useNotificationMessage();

  const isUser = useSelector((state) => state.user.accessToken);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "100%",
        padding: "100rem 70rem",
      }}
    >
      {contextHolder}

      <CommonButton
        text="Delete Account"
        variant="red"
        hoverVariant="darkBlue"
        wrapperStyles={{ width: "200rem" }}
        onClick={() => setIsOpen(true)}
      />
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)}>
        <h3 style={{ fontSize: "24rem", marginBottom: "10rem" }}>
          Delete Account
        </h3>
        <p style={{ fontSize: "16rem", marginBottom: "20rem" }}>
          Are you sure to delete your account?
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
            isLoading={isDeleteLoading}
          />
        </div>
      </Modal>
    </div>
  );
};

export default SettingsPage;
