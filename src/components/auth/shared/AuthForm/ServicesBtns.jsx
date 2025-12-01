import React from "react";
import { useDispatch } from "react-redux";
import { appleAuthHelpers, useScript } from "react-apple-signin-auth";
import { ReactComponent as GoogleIcon } from "../../../../images/icons/google.svg";
import { ReactComponent as AppleIcon } from "../../../../images/icons/social/app-store.svg";
import { loginWithAppleThunk } from "../../../../redux/user/operations";
import { useNotificationMessage } from "../../../../hooks/useNotificationMessage";
import { domain } from "../../../../http/server";
import styles from "./AuthForm.module.scss";

const ServicesBtns = () => {
  const [messageApi, contextHolder] = useNotificationMessage();
  const dispatch = useDispatch();
  useScript(appleAuthHelpers.APPLE_SCRIPT_SRC);

  const handleCustomGoogleButtonClick = () => {
    try {
      /* global google */
      if (!google?.accounts?.id) {
        console.error("Google accounts API not initialized");
        return;
      }

      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          console.warn("Google One Tap prompt skipped or not displayed.");

          // Optionally handle cookie or localStorage clean-up
          document.cookie =
            "g_state=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

          // Try to reinitialize or log this as a skipped session
          google.accounts.id.prompt(); // Caution: Avoid infinite loops
        } else {
          console.log("Google One Tap displayed successfully.");
        }
      });
    } catch (error) {
      console.error("Error invoking Google One Tap:", error);
    }
  };

  const handleAppleResponse = async (response) => {
    const { code } = response.authorization;
    const name = response?.user?.name;

    const data = {
      platform: "web",
      code,
      name: name?.firstName || null,
      surname: name?.lastName || null,
    };

    try {
      const userResponse = await dispatch(loginWithAppleThunk(data)).unwrap();
      if (userResponse.username) {
        messageApi.success({
          content: `Hello ${userResponse.username}!`,
          duration: 3,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCustomAppleButtonClick = async () => {
    const authOptions = {
      clientId: "com.ieu.ieucourses",
      /** Requested scopes, seperated by spaces - eg: 'email name' */
      scope: "email name",
      /** Apple's redirectURI - must be one of the URIs you added to the serviceID - the undocumented trick in apple docs is that you should call auth from a page that is listed as a redirectURI, localhost fails */
      redirectURI: `https://${domain}`,
      //   redirectURI: "https://bfe4-176-38-25-248.ngrok-free.app",
      /** State string that is returned with the apple response */
      state: "12345",
      /** Nonce */
      nonce: "nonce",
      /** Uses popup auth instead of redirection */
      usePopup: true,
    };

    console.log(authOptions);

    await appleAuthHelpers.signIn({
      authOptions,
      onSuccess: handleAppleResponse,
      onError: (error) => {
        console.log(error);

        messageApi.error({
          content: "Apple service is unavailable",
          duration: 3,
        });
      },
    });
  };

  return (
    <>
      {contextHolder}
      <span className={styles.divider}>or continue with</span>
      <div className={styles.servicesBtnsWrapper}>
        <button
          type="button"
          className={styles.serviceBtn}
          onClick={handleCustomGoogleButtonClick}
        >
          <GoogleIcon />
          <span>Using Google</span>
        </button>
        <button
          type="button"
          className={styles.serviceBtn}
          onClick={handleCustomAppleButtonClick}
        >
          <AppleIcon />
          <span>Using Apple</span>
        </button>
      </div>
    </>
  );
};

export default ServicesBtns;
