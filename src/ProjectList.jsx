import { useEffect, useState } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

export default function ProjectList({ user }) {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [inviteUsername, setInviteUsername] = useState("");

  const fetchProjects = async () => {
    const q = query(collection(db, "projects"), where("collaborators", "array-contains", user.displayName));
    const snap = await getDocs(q);
    setProjects(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    await addDoc(collection(db, "projects"), {
      title,
      owner: user.displayName,
      collaborators: [user.displayName],
    });
    setTitle("");
    fetchProjects();
  };

  const invite = async (projectId) => {
    const userRef = doc(db, "users", inviteUsername);
    const userSnap = await getDocs(query(collection(db, "users"), where("username", "==", inviteUsername)));
    if (!userSnap.empty) {
      const projRef = doc(db, "projects", projectId);
      const project = (await getDocs(query(collection(db, "projects"), where("__name__", "==", projectId)))).docs[0];
      const collabs = project.data().collaborators;
      await updateDoc(projRef, { collaborators: [...new Set([...collabs, inviteUsername])] });
      setInviteUsername("");
      fetchProjects();
    } else {
      alert("No such user");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <h2 className="text-lg font-semibold mb-4">Your Projects</h2>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="New project title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={createProject} className="bg-green-500 text-white px-4 rounded">Create</button>
      </div>

      {projects.map((p) => (
        <div key={p.id} className="border p-3 mb-2 rounded">
          <h3 className="font-semibold">{p.title}</h3>
          <p className="text-sm text-gray-600">Collaborators: {p.collaborators.join(", ")}</p>
          <div className="mt-2 flex gap-2">
            <input
              className="border p-1 flex-1"
              placeholder="Invite by username"
              value={inviteUsername}
              onChange={(e) => setInviteUsername(e.target.value)}
            />
            <button onClick={() => invite(p.id)} className="bg-blue-500 text-white px-3 rounded">Invite</button>
          </div>
        </div>
      ))}
    </div>
  );
}
