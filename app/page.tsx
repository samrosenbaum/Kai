"use client";  // ✅ "use client" must be the first line

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChat = async () => {
    if (!message) return;
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.reply);
    } catch (error) {
      setResponse("Error: Unable to connect to AI.");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Hi, I'm Kai</h1>
      <p>Your AI companion for managing anxiety.</p>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ padding: "10px", width: "80%", margin: "10px 0" }}
      />
      
      <button 
        onClick={handleChat} 
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
        disabled={loading}
      >
        {loading ? "Thinking..." : "Talk to Kai"}
      </button>

      {response && <p style={{ marginTop: "20px", fontSize: "18px" }}>{response}</p>}
    </div>
  );
}
