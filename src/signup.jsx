import { useState } from "react";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup({ toggle }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCred.user, { displayName: username });
      await setDoc(doc(db, "users", username), {
        uid: userCred.user.uid,
        email,
        username,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-8 shadow rounded w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">Sign Up</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleSignup} className="bg-blue-500 text-white w-full p-2 rounded mt-2">Create Account</button>
      <p className="text-sm mt-2 text-center">
        Already have an account?{" "}
        <span onClick={toggle} className="text-blue-500 cursor-pointer">Login</span>
      </p>
    </div>
  );
}
