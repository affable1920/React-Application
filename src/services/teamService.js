import { doc, setDoc } from "firebase/firestore";
import auth from "./auth";

export async function teamCreate({ name, users: members }) {
  setDoc(doc(auth.database, "teams", name), {
    name,
    members,
  });
}

export default {
  teamCreate,
};
