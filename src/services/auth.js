import app from "../fireBaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

const auth = getAuth(app);
const database = getFirestore(app);

export async function register(newUser) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      newUser.email,
      newUser.password
    );
    await updateProfile(user, {
      displayName: newUser.username,
    });
    await user.reload();
    await setDoc(doc(database, "users", user.uid), {
      uid: user.uid,
      username: newUser.username,
      email: user.email,
      phoneNumber: user.phoneNumber || "Not Set",
      role: newUser.role,
      registrationTimestamp: user.metadata.creationTime,
    });
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function login(user) {
  try {
    await signInWithEmailAndPassword(auth, user.email, user.password);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  register,
  login,
  logout,
  authInstance: auth,
  database,
};
