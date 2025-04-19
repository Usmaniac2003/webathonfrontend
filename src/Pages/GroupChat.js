import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";

// connect to same server on port 8000
const socket = io("http://localhost:8000");

const GroupChat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off("receive-message");
  }, []);

  useEffect(() => {
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-message", message);
    setMessages((prev) => [
      ...prev,
      { self: true, text: message }
    ]);
    setMessage("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>Group Chat</div>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: msg.self ? "flex-end" : "flex-start",
              backgroundColor: msg.self ? "#06bbcc" : "#ffffff",
              color: msg.self ? "#ffffff" : "#333"
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={chatBoxRef} />
      </div>
      <div style={styles.inputBox}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          style={styles.button}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "600px",
    margin: "50px auto",
    display: "flex",
    flexDirection: "column",
    border: "2px solid #06bbcc",
    borderRadius: "10px",
    overflow: "hidden",
    fontFamily: "Segoe UI, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
  },
  header: {
    backgroundColor: "#06bbcc",
    color: "white",
    padding: "15px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "20px"
  },
  chatBox: {
    flex: 1,
    minHeight: "400px",
    maxHeight: "400px",
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#e6f9fb"
  },
  message: {
    maxWidth: "70%",
    padding: "10px 15px",
    margin: "5px 0",
    borderRadius: "20px",
    fontSize: "15px",
    wordBreak: "break-word",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
  },
  inputBox: {
    display: "flex",
    padding: "10px",
    backgroundColor: "#f7f7f7",
    borderTop: "1px solid #ddd"
  },
  input: {
    flex: 1,
    padding: "12px 15px",
    border: "1px solid #ccc",
    borderRadius: "20px",
    outline: "none",
    fontSize: "16px"
  },
  button: {
    marginLeft: "10px",
    padding: "12px 20px",
    fontSize: "16px",
    backgroundColor: "#06bbcc",
    color: "#fff",
    border: "none",
    borderRadius: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  }
};

export default GroupChat;
