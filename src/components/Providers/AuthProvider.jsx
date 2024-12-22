import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../services/auth";
import UserContext from "../../context/UserContext";

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  onAuthStateChanged(auth.authInstance, async (user) => {
    if (user) {
      await user.reload();
      const docRef = doc(auth.database, "users", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists) setCurrentUser({ ...user, userInfo: docSnap.data() });
      else setCurrentUser({ ...user });
    } else setCurrentUser(null);
  });

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
