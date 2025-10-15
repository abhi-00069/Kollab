import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export default function Login({ toggle }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid login");
    }
  };

  return (
    <div className="bg-white p-8 shadow rounded w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button onClick={handleLogin} className="bg-blue-500 text-white w-full p-2 rounded mt-2">Login</button>
      <p className="text-sm mt-2 text-center">
        Don’t have an account?{" "}
        <span onClick={toggle} className="text-blue-500 cursor-pointer">Sign Up</span>
      </p>
    </div>
  );
}
