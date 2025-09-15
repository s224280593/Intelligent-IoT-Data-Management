import { useEffect, useState } from "react";

export default function Dashboard() {
  const [items, setItems] = useState([]);

  async function load() {
    const token = localStorage.getItem("auth_token");
    const res = await fetch("/api/data/items", {
      headers: { Authorization: `Bearer ${token}` },
    }).catch(() => null);
    if (res && res.ok) {
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    }
  }

  useEffect(() => { load(); }, []);

  const email = JSON.parse(localStorage.getItem("auth_user") || "{}")?.email;

  return (
    <div style={{ padding: 24 }}>
      <h1>Dashboard</h1>
      <p>Welcome {email || "user"}!</p>
      <button onClick={load}>Reload items</button>
      <ul>
        {items.map(x => <li key={x.id}>{x.name}</li>)}
      </ul>
    </div>
  );
}
