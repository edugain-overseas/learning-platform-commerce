import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const useGoogleAuthentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleCredentialResponse = ({ credential }) => {
      
      const user = jwtDecode(credential);
      setUser(user);
      console.log(user.picture);
    };
    const IdConfiguration = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    };

    /* global google */
    google.accounts.id.initialize(IdConfiguration);
    google.accounts.id.renderButton(document.getElementById("googleAuthBtn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return user;
};

export default useGoogleAuthentication;
