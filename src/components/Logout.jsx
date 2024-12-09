import { useEffect } from "react";
import auth from "../services/auth";

const Logout = () => {
  useEffect(() => {
    try {
      auth.logout();
      window.location = "/login";
    } catch (err) {
      alert(err);
    }
  }, []);
};

export default Logout;
