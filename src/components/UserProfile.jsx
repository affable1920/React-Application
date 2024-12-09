import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const UserProfile = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div className="profile-dashboard mx-3 mt-3">
      <section className="user-details"></section>
    </div>
  );
};

export default UserProfile;
