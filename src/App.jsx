import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Login from "./Login";
import Signup from "./Signup";
import ProjectList from "./ProjectList";

export default function App() {
  const [user, setUser] = useState(null);
  const [signupMode, setSignupMode] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  if (!user)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        {signupMode ? (
          <Signup toggle={() => setSignupMode(false)} />
        ) : (
          <Login toggle={() => setSignupMode(true)} />
        )}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Kollab</h1>
        <button
          onClick={() => signOut(auth)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </header>
      <ProjectList user={user} />
    </div>
  );
}
