import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginWithGoogleThunk } from "../redux/user/operations";

const useGoogleAuthentication = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleCredentialResponse = ({ credential }) => {
      if (credential) {
        dispatch(loginWithGoogleThunk(credential));
      }
    };
    const IdConfiguration = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    };

    try {
      /* global google */
      google.accounts.id.initialize(IdConfiguration);
      // google.accounts.id.renderButton(
      //   document.getElementById("googleAuthBtn"),
      //   {
      //     theme: "outline",
      //     size: "large",
      //   }
      // );
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line
  }, []);
};

export default useGoogleAuthentication;
