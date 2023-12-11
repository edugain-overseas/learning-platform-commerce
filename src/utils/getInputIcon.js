import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

export const getInputIcon = (name, styles) => {
  switch (name) {
    case "username":
    case "first name":
    case "last name":
      return <UserOutlined className={styles.inputIcon} />;
    case "email":
      return <MailOutlined className={styles.inputIcon} />;
    case "password":
      return <LockOutlined className={styles.inputIcon} />;
    default:
      break;
  }
};
