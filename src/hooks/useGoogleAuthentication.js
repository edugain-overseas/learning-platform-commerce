import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginWithGoogleThunk } from "../redux/user/operations";

const useGoogleAuthentication = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (process.env.REACT_APP_GOOGLE_CLIENT_ID) {
  //     const handleCredentialResponse = ({ credential }) => {
  //       if (credential) {
  //         dispatch(loginWithGoogleThunk(credential));
  //       }
  //     };
  //     const IdConfiguration = {
  //       client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  //       callback: handleCredentialResponse,
  //       use_fedcm_for_prompt: true,
  //       auto_select: false,
  //     };

  //     try {
  //       /* global google */
  //       google.accounts.id.initialize(IdConfiguration);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   }

  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (!window.google || !process.env.REACT_APP_GOOGLE_CLIENT_ID) return;

    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: ({ credential }) => {
        if (credential) {
          dispatch(loginWithGoogleThunk(credential));
        }
      },
      auto_select: false,
      use_fedcm_for_prompt: true,
    });
  }, [dispatch]);
};

export default useGoogleAuthentication;
