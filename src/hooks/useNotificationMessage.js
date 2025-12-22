import useMessage from "antd/es/message/useMessage";
import { ReactComponent as SuccessIcon } from "../images/icons/messageIcons/success.svg";
import { ReactComponent as WarningIcon } from "../images/icons/messageIcons/warning.svg";
import { ReactComponent as ErrorIcon } from "../images/icons/messageIcons/error.svg";
import { ReactComponent as GuardIcon } from "../images/icons/messageIcons/guard.svg";
import { ReactComponent as CloseIcon } from "../images/icons/cross.svg";
import { generateId } from "../utils/generateIdBasedOnTime";

const messageTypes = {
  success: {
    icon: <SuccessIcon />,
    className: "successMessage",
  },
  warning: {
    icon: <WarningIcon />,
    className: "warningMessage",
  },
  error: {
    icon: <ErrorIcon />,
    className: "errorMessage",
  },
  guard: {
    icon: <GuardIcon />,
    className: "guardMessage",
  },
  info: {
    type: "info",
    className: "infoMessage",
  },
};

export const useNotificationMessage = () => {
  const [messageApi, contextHolder] = useMessage({ top: "94rem" });

  const api = {
    open: ({ type, ...config }) => {
      const key = generateId();
      return messageApi.open({
        key,
        ...messageTypes[type],
        ...config,
        content: (
          <div className="message-content">
            <span>{config.content}</span>
            <button
              onClick={() => messageApi.destroy(key)}
              className="messageCloseBtn"
            >
              <CloseIcon />
            </button>
          </div>
        ),
      });
    },
    success: (config) => {
      const key = generateId();
      return messageApi.open({
        key,
        ...config,
        ...messageTypes.success,
        content: (
          <div className="message-content">
            <span>{config.content}</span>
            <button
              onClick={() => messageApi.destroy(key)}
              className="messageCloseBtn"
            >
              <CloseIcon />
            </button>
          </div>
        ),
      });
    },
    warning: (config) => {
      const key = generateId();
      return messageApi.open({
        key,
        ...config,
        ...messageTypes.warning,
        content: (
          <div className="message-content">
            <span>{config.content}</span>
            <button
              onClick={() => messageApi.destroy(key)}
              className="messageCloseBtn"
            >
              <CloseIcon />
            </button>
          </div>
        ),
      });
    },
    error: (config) => {
      const key = generateId();
      return messageApi.open({
        key,
        ...config,
        ...messageTypes.error,
        content: (
          <div className="message-content">
            <span>{config.content}</span>
            <button
              onClick={() => messageApi.destroy(key)}
              className="messageCloseBtn"
            >
              <CloseIcon />
            </button>
          </div>
        ),
      });
    },
    info: (config) => {
      const key = generateId();
      return messageApi.open({
        key,
        ...config,
        ...messageTypes.info,
        content: (
          <div className="message-content">
            <span>{config.content}</span>
            <button
              onClick={() => messageApi.destroy(key)}
              className="messageCloseBtn"
            >
              <CloseIcon />
            </button>
          </div>
        ),
      });
    },
  };

  return [api, contextHolder];
};
